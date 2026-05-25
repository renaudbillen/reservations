<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreReservationRequest;
use App\Http\Requests\UpdateReservationRequest;
use App\Mail\ReservationCreated;
use App\Mail\ReservationDeleted;
use App\Mail\ReservationDeletedNotification;
use App\Mail\ReservationNotification;
use App\Mail\ReservationUpdated;
use App\Mail\ReservationUpdatedNotification;
use App\Models\Reservation;
use App\Models\Room;
use App\Models\User;
use App\Models\Vacation;
use App\Repository\ReservationRepository;
use App\Enums\RoleEnum;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Mail;
use Inertia\Inertia;

class ReservationController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        $currentDate = now();
        $currentWeek = $currentDate->weekOfYear;
        $currentYear = $currentDate->year;

        // Get requested week and year, default to current
        $requestedWeek = (int)$request->input('week', $currentWeek);
        $requestedYear = (int)$request->input('year', $currentYear);

        // Validate week and year
        $shouldRedirect = false;

        if (!auth()->user()->hasRole('Super Admin')) {
            // Existing validation logic here
            if ($requestedYear < $currentYear ||
                ($requestedYear === $currentYear && $requestedWeek < $currentWeek)) {
                $shouldRedirect = true;
            } elseif ($requestedYear > $currentYear) {
                $weeksInYear = 52;
                $weeksDifference = ($weeksInYear - $currentWeek) + $requestedWeek;
                if ($weeksDifference > 3) {
                    $shouldRedirect = true;
                }
            } elseif ($requestedWeek > ($currentWeek + 3)) {
                $shouldRedirect = true;
            }
        }

        // Redirect if needed
        if ($shouldRedirect) {
            return redirect()->route(
                'admin.reservations.index',
                [
                    'week' => $currentWeek,
                    'year' => $currentYear,
                ]
            );
        }

        // Get start and end of the requested week
        $startOfWeek = Carbon::now()->setISODate($requestedYear, $requestedWeek)->startOfWeek();
        $endOfWeek = (clone $startOfWeek)->endOfWeek(-1);

        // Get all rooms for the selector
        $rooms = Room::all();

        // Get reservations for the week
        $reservations = Reservation::with(['byUser', 'forUser', 'room'])
            ->whereBetween('reservation_date', [$startOfWeek, $endOfWeek])
            ->get()
            ->map(function ($reservation) {
                // Convert date to string format to avoid ISO format issues in frontend
                $reservation->reservation_date = $reservation->reservation_date->format('Y-m-d');
                return $reservation;
            });

        // Get vacations for the week
        $vacations = Vacation::whereDate('start_date', '<=', $endOfWeek)
            ->whereDate('end_date', '>=', $startOfWeek)
            ->get();

        // Prepare time slots (half-hour intervals from 8:00 to 20:00)
        $timeSlots = Reservation::TIME_SLOTS;

        // Prepare days of the week
        $days = collect();
        $currentDay = (clone $startOfWeek);
        while ($currentDay <= $endOfWeek) {
            $days->push((clone $currentDay)->format('Y-m-d'));
            $currentDay->addDay();
        }

        return Inertia::render('admin/reservations/Index', [
            'week' => $requestedWeek,
            'year' => $requestedYear,
            'days' => $days,
            'rooms' => $rooms,
            'reservations' => $reservations,
            'vacations' => $vacations,
            'timeSlots' => $timeSlots,
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        $rooms = Room::all();
        $users = User::select('id', 'name')->get();

        return Inertia::render('admin/reservations/Create', [
            'rooms' => $rooms,
            'users' => $users,
            'timeSlots' => Reservation::TIME_SLOTS
        ]);
    }
    
    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreReservationRequest $request)
    {
        $validated = $request->validated();
        $validated['by_user_id'] = auth()->id();
        $validated['for_user_id'] = $validated['for_user_id'] ?? auth()->id();

        // Check if non-Super Admin is trying to reserve beyond 3 weeks
        if (!auth()->user()->hasRole(RoleEnum::SUPER_ADMIN)) {
            $reservationDate = Carbon::parse($validated['reservation_date']);
            $currentWeekEnd = Carbon::now()->endOfWeek();
            $maxAllowedDate = $currentWeekEnd->copy()->addWeeks(3)->subDay();

            if ($reservationDate->gt($maxAllowedDate)) {
                return redirect()
                    ->back()
                    ->with('error', 'You cannot make reservations more than 3 weeks in advance.');
            }
        }

        // Get the time slots between start_time and end_time
        $startIndex = array_search($validated['start_time'], Reservation::TIME_SLOTS);
        $endIndex = array_search($validated['end_time'], Reservation::TIME_SLOTS);

        if ($startIndex === false || $endIndex === false) {
            return redirect()
                ->back()
                ->withInput()
                ->with('error', 'Invalid time slots selected.');
        }

        $timeSlots = array_slice(Reservation::TIME_SLOTS, $startIndex, $endIndex - $startIndex);

        // Check if all time slots are available
        foreach ($timeSlots as $timeSlot) {
            if (!ReservationRepository::checkIsAvailable(
                $validated['room_id'],
                $validated['reservation_date'],
                $timeSlot
            )) {
                return redirect()
                    ->back()
                    ->withInput()
                    ->with('error', "Reservation not possible, the room is not available at {$timeSlot}.");
            }
        }

        // Create a reservation for each 30-minute slot
        $createdReservations = [];
        foreach ($timeSlots as $timeSlot) {
            $reservation = Reservation::create([
                'room_id' => $validated['room_id'],
                'reservation_date' => $validated['reservation_date'],
                'reservation_time' => $timeSlot,
                'by_user_id' => $validated['by_user_id'],
                'for_user_id' => $validated['for_user_id'],
            ]);
            $createdReservations[] = $reservation;
        }

        // Load relationships for the first reservation (for email)
        $firstReservation = $createdReservations[0];
        $firstReservation->load(['room', 'byUser', 'forUser']);

        // Send confirmation email
        Mail::to($firstReservation->forUser->email)->send(new ReservationCreated($firstReservation));

        // Send notification email to Super Admins if the user is not a Super Admin
        if (!auth()->user()->hasRole(RoleEnum::SUPER_ADMIN)) {
            $superAdmins = User::role(RoleEnum::SUPER_ADMIN)->get();
            foreach ($superAdmins as $admin) {
                Mail::to($admin->email)->send(new ReservationNotification($firstReservation));
            }
        }

        $slotsCount = count($timeSlots);
        return redirect()
            ->route('admin.reservations.index')
            ->with('success', "Reservation created successfully ({$slotsCount} time slots reserved).");
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Reservation $reservation)
    {
        $rooms = Room::all();
        $users = User::select('id', 'name')->get();

        return Inertia::render('admin/reservations/Edit', [
            'reservation' => $reservation->load(['room', 'byUser', 'forUser']),
            'rooms' => $rooms,
            'users' => $users
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateReservationRequest $request, Reservation $reservation)
    {
        $validated = $request->validated();

        // Check if non-Super Admin is trying to update reservation beyond 3 weeks
        if (!auth()->user()->hasRole(RoleEnum::SUPER_ADMIN)) {
            $reservationDate = Carbon::parse($validated['reservation_date']);
            $currentWeekStart = Carbon::now()->startOfWeek();
            $currentWeekEnd = Carbon::now()->endOfWeek();
            $maxAllowedDate = $currentWeekEnd->copy()->addWeeks(3)->subDay(); // Saturday of 3rd week

            if ($reservationDate->gt($maxAllowedDate)) {
                return redirect()
                    ->back()
                    ->with('error', 'You cannot make reservations more than 3 weeks in advance.');
            }
        }

        $reservation->update($validated);

        // Load relationships for emails
        $reservation->load(['room', 'byUser', 'forUser']);

        // Send update email to the user for whom the reservation was made
        Mail::to($reservation->forUser->email)->send(new ReservationUpdated($reservation));

        // Send notification email to Super Admins
        $superAdmins = User::role(RoleEnum::SUPER_ADMIN)->get();
        foreach ($superAdmins as $admin) {
            Mail::to($admin->email)->send(new ReservationUpdatedNotification($reservation));
        }

        return redirect()->route('admin.reservations.index')
            ->with('success', 'Reservation updated successfully');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Reservation $reservation)
    {
        // Load relationships for emails
        $reservation->load(['room', 'byUser', 'forUser']);

        // Send deletion email to the user for whom the reservation was made
        Mail::to($reservation->forUser->email)->send(new ReservationDeleted($reservation));

        // Send notification email to Super Admins
        $superAdmins = User::role(RoleEnum::SUPER_ADMIN)->get();
        foreach ($superAdmins as $admin) {
            Mail::to($admin->email)->send(new ReservationDeletedNotification($reservation));
        }

        $reservation->delete();

        return redirect()->route('admin.reservations.index')
            ->with('success', 'Reservation deleted successfully');
    }
}

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

        // Get all rooms
        $rooms = Room::all();

        // Get reservations for the week
        $reservations = Reservation::with(['byUser', 'forUser', 'room'])
            ->whereBetween('reservation_date', [$startOfWeek, $endOfWeek])
            ->get()
            ->groupBy(['room_id', function ($reservation) {
                return $reservation->reservation_date->format('Y-m-d');
            }]);

        // Prepare time slots (AM/PM for each day)
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
            'users' => $users
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreReservationRequest $request)
    {
        $validated = $request->validated();
        $validated['by_user_id'] = auth()->id();
        // If for_user_id is not provided, default to the authenticated user
        $validated['for_user_id'] = $validated['for_user_id'] ?? auth()->id();

        // Check if non-Super Admin is trying to reserve beyond 3 weeks
        if (!auth()->user()->hasRole(RoleEnum::SUPER_ADMIN)) {
            $reservationDate = Carbon::parse($validated['reservation_date']);
            $currentWeekEnd = Carbon::now()->endOfWeek();
            $maxAllowedDate = $currentWeekEnd->copy()->addWeeks(3)->subDay(); // Saturday of 3rd week

            if ($reservationDate->gt($maxAllowedDate)) {
                return redirect()
                    ->back()
                    ->with('error', 'You cannot make reservations more than 3 weeks in advance.');
            }
        }

        // Check if room is available
        if (!ReservationRepository::checkIsAvailable(
            $validated['room_id'],
            $validated['reservation_date'],
            $validated['reservation_period']
        )) {
            return redirect()
                ->back()
                ->withInput()
                ->with('error', 'Reservation not possible, the room is not available.');
        }

        $reservation = Reservation::create($validated);

        // Load relationships for emails
        $reservation->load(['room', 'byUser', 'forUser']);

        // Send confirmation email to the user who made the reservation
        Mail::to($reservation->forUser->email)->send(new ReservationCreated($reservation));

        // Send notification email to Super Admins if the user is not a Super Admin
        if (!auth()->user()->hasRole(RoleEnum::SUPER_ADMIN)) {
            $superAdmins = User::role(RoleEnum::SUPER_ADMIN)->get();
            foreach ($superAdmins as $admin) {
                Mail::to($admin->email)->send(new ReservationNotification($reservation));
            }
        }

        return redirect()
            ->route('admin.reservations.index')
            ->with('success', 'Reservation created successfully.');
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

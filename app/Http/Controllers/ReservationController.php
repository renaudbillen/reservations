<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreReservationRequest;
use App\Http\Requests\UpdateReservationRequest;
use App\Models\Reservation;
use App\Models\Room;
use App\Models\User;
use App\Repository\ReservationRepository;
use Carbon\Carbon;
use Illuminate\Http\Request;
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

        if (
            ReservationRepository::checkIsAvailable(
                $validated['room_id'],
                $validated['reservation_date'],
                $validated['reservation_period']
            )
        ) {
            return redirect()
                ->route('admin.reservations.index')
                ->with('Danger', 'Reservation no possible, the room is not available.');
        }

        Reservation::create($validated);

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
        $reservation->update($validated);

        return redirect()->route('admin.reservations.index')
            ->with('success', 'Reservation updated successfully');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Reservation $reservation)
    {
        $reservation->delete();

        return redirect()->route('admin.reservations.index')
            ->with('success', 'Reservation deleted successfully');
    }
}

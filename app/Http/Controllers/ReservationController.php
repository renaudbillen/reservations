<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreReservationRequest;
use App\Http\Requests\UpdateReservationRequest;
use App\Models\Reservation;
use App\Models\Room;
use App\Models\User;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Inertia\Inertia;

class ReservationController extends Controller
{
    /**
     * Display a listing of the resource.
     */
// In ReservationController.php
    public function index(Request $request)
    {
        $week = $request->input('week', now()->weekOfYear);
        $year = $request->input('year', now()->year);

        // Get start and end of the week
        $startOfWeek = Carbon::now()->setISODate($year, $week)->startOfWeek();
        $endOfWeek = (clone $startOfWeek)->endOfWeek();

        // Get all rooms
        $rooms = Room::all();

        // Get reservations for the week
        $reservations = Reservation::with(['byUser', 'forUser', 'room'])
            ->whereBetween('reservation_date', [$startOfWeek, $endOfWeek])
            ->orWhereBetween('reservation_date', [$startOfWeek, $endOfWeek])
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
            'week' => $week,
            'year' => $year,
            'days' => $days,
            'rooms' => $rooms,
            'reservations' => $reservations
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

        Reservation::create($validated);

        return redirect()->route('admin.reservations.index')
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

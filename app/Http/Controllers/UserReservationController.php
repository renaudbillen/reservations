<?php

namespace App\Http\Controllers;

use App\Models\Reservation;
use App\Models\Room;
use App\Models\User;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Illuminate\Support\Facades\Auth;
use Carbon\Carbon;

class UserReservationController extends Controller
{
    public function index()
    {
        $user = Auth::user();
        
        // Get user's reservations (both own and those made for them)
        $reservations = Reservation::with(['room', 'user', 'forUser'])
            ->where(function($query) use ($user) {
                $query->where('by_user_id', $user->id)
                      ->orWhere('for_user_id', $user->id);
            })
            ->orderBy('reservation_date', 'asc')
            ->get();

        // Separate past and future reservations
        $now = Carbon::now();
        $pastReservations = $reservations->filter(function($reservation) use ($now) {
            return Carbon::parse($reservation->reservation_date)->lt($now);
        });

        $futureReservations = $reservations->filter(function($reservation) use ($now) {
            return Carbon::parse($reservation->reservation_date)->gte($now);
        });

        return Inertia::render('user/Dashboard', [
            'pastReservations' => $pastReservations->values(),
            'futureReservations' => $futureReservations->values(),
            'userStats' => [
                'totalReservations' => $reservations->count(),
                'pastReservations' => $pastReservations->count(),
                'upcomingReservations' => $futureReservations->count(),
            ]
        ]);
    }

    public function create()
    {
        $rooms = Room::all();
        $users = User::all();
        
        return Inertia::render('reservations/Create', [
            'rooms' => $rooms,
            'users' => $users,
        ]);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'room_id' => 'required|exists:rooms,id',
            'reservation_date' => 'required|date|after_or_equal:today',
            'reservation_period' => 'required|in:AM,PM',
            'for_user_id' => 'nullable|exists:users,id',
        ]);

        $validated['by_user_id'] = Auth::id();

        Reservation::create($validated);

        return redirect()->route('user.dashboard')
            ->with('success', 'Réservation créée avec succès.');
    }

    public function show(Reservation $reservation)
    {
        // Check if user can view this reservation
        $user = Auth::user();
        if ($reservation->by_user_id !== $user->id && $reservation->for_user_id !== $user->id) {
            abort(403);
        }
        
        return Inertia::render('reservations/Show', [
            'reservation' => $reservation->load(['room', 'user', 'forUser']),
        ]);
    }

    public function edit(Reservation $reservation)
    {
        // Check if user can edit this reservation
        $user = Auth::user();
        if ($reservation->by_user_id !== $user->id && $reservation->for_user_id !== $user->id) {
            abort(403);
        }
        
        $rooms = Room::all();
        $users = User::all();
        
        return Inertia::render('reservations/Edit', [
            'reservation' => $reservation->load(['room', 'user', 'forUser']),
            'rooms' => $rooms,
            'users' => $users,
        ]);
    }

    public function update(Request $request, Reservation $reservation)
    {
        // Check if user can update this reservation
        $user = Auth::user();
        if ($reservation->by_user_id !== $user->id && $reservation->for_user_id !== $user->id) {
            abort(403);
        }
        
        $validated = $request->validate([
            'room_id' => 'required|exists:rooms,id',
            'reservation_date' => 'required|date|after_or_equal:today',
            'reservation_period' => 'required|in:AM,PM',
            'for_user_id' => 'nullable|exists:users,id',
        ]);

        $reservation->update($validated);

        return redirect()->route('user.dashboard')
            ->with('success', 'Réservation mise à jour avec succès.');
    }

    public function destroy(Reservation $reservation)
    {
        // Check if user can delete this reservation
        $user = Auth::user();
        if ($reservation->by_user_id !== $user->id && $reservation->for_user_id !== $user->id) {
            abort(403);
        }
        
        // Check if reservation can be deleted (not within 24 hours)
        $reservationDate = Carbon::parse($reservation->reservation_date);
        $now = Carbon::now();
        
        // If reservation is today or tomorrow, don't allow deletion
        if ($reservationDate->diffInDays($now, false) >= -1) {
            return redirect()->route('user.dashboard')
                ->with('error', 'Les réservations du jour même ou du lendemain ne peuvent pas être annulées.');
        }

        $reservation->delete();

        return redirect()->route('user.dashboard')
            ->with('success', 'Réservation annulée avec succès.');
    }
}

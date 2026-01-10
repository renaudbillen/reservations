<?php

namespace App\Http\Controllers;

use App\Http\Requests\StorePeriodicReservationRequest;
use App\Models\Reservation;
use App\Models\Room;
use App\Models\User;
use Carbon\Carbon;
use Carbon\CarbonPeriod;
use Inertia\Inertia;
use Illuminate\Support\Facades\DB;

class PeriodicReservationController extends Controller
{
    /**
     * Show the form for creating a new periodic reservation.
     */
    public function create()
    {
        $rooms = Room::all();
        $users = User::select('id', 'name')->orderBy('name')->get();

        return Inertia::render('admin/reservations/CreatePeriodic', [
            'rooms' => $rooms,
            'users' => $users
        ]);
    }

    /**
     * Store a new periodic reservation in storage.
     */
    public function store(StorePeriodicReservationRequest $request)
    {
        $validated = $request->validated();
        $createdCount = 0;

        $dayOfWeek = (int)$validated['day_of_week'];

        // Create a period from start to end date
        $startDate = Carbon::parse($validated['start_date']);
        $endDate = Carbon::parse($validated['end_date']);

        // Adjust start date to the next occurrence of the selected day of week
        $startDate->next($dayOfWeek);
        if ($startDate->lt(Carbon::parse($validated['start_date']))) {
            $startDate->addWeek(); // Ensure we don't go before the selected start date
        }

        // Get all dates that match the selected day of week within the date range
        $period = CarbonPeriod::create($startDate, '1 week', $endDate);

        // Check for existing reservations in a single query
        $existingReservations = [];
        $datesToCheck = [];

        foreach ($period as $date) {
            $date->setTimeFromTimeString($validated['period'] === 'AM' ? '09:00:00' : '13:00:00');
            $datesToCheck[] = [
                'reservation_date' => $date->toDateString(),
                'reservation_period' => $validated['period'],
                'room_id' => $validated['room_id']
            ];
        }

        if (!empty($datesToCheck)) {
            $existingReservations = DB::table('reservations')
                ->whereIn('reservation_date', array_column($datesToCheck, 'reservation_date'))
                ->where('reservation_period', $validated['period'])
                ->where('room_id', $validated['room_id'])
                ->pluck('reservation_date')
                ->toArray();
        }

        // Create reservations that don't already exist
        $createdReservations = [];

        foreach ($period as $date) {
            // Skip if this date already has a reservation
            if (in_array($date->toDateString(), $existingReservations)) {
                continue;
            }

            $reservation = Reservation::create([
                'room_id' => $validated['room_id'],
                'reservation_date' => $date->toDateString(),
                'reservation_period' => $validated['period'],
                'for_user_id' => $validated['user_id'] ?? auth()->id(),
                'by_user_id' => auth()->id(),
            ]);

            $createdCount++;
        }

        $message = $createdCount > 0
            ? "Successfully created {$createdCount} reservations."
            : "No new reservations were created. All requested time slots are already booked.";

        if ($createdCount < count($period)) {
            $message .= ' Some time slots were already booked.';
        }

        return redirect()
            ->route('admin.reservations.index')
            ->with('success', $message);
    }
}

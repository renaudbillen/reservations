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
            'users' => $users,
            'timeSlots' => Reservation::TIME_SLOTS
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
            $startDate->addWeek();
        }

        // Get all dates that match the selected day of week within the date range
        $period = CarbonPeriod::create($startDate, '1 week', $endDate);

        // Get the time slots between start_time and end_time
        $startIndex = array_search($validated['start_time'], Reservation::TIME_SLOTS);
        $endIndex = array_search($validated['end_time'], Reservation::TIME_SLOTS);

        if ($startIndex === false || $endIndex === false) {
            return redirect()
                ->back()
                ->with('error', 'Invalid time slots selected.');
        }

        $timeSlots = array_slice(Reservation::TIME_SLOTS, $startIndex, $endIndex - $startIndex);

        // For each date in the period, create reservations for all time slots
        foreach ($period as $date) {
            foreach ($timeSlots as $timeSlot) {
                // Check if this time slot is already reserved
                $exists = DB::table('reservations')
                    ->where('reservation_date', $date->toDateString())
                    ->where('reservation_time', $timeSlot)
                    ->where('room_id', $validated['room_id'])
                    ->exists();

                if (!$exists) {
                    Reservation::create([
                        'room_id' => $validated['room_id'],
                        'reservation_date' => $date->toDateString(),
                        'reservation_time' => $timeSlot,
                        'for_user_id' => $validated['user_id'] ?? auth()->id(),
                        'by_user_id' => auth()->id(),
                    ]);

                    $createdCount++;
                }
            }
        }

        $message = $createdCount > 0
            ? "Successfully created {$createdCount} reservation slots."
            : "No new reservations were created. All requested time slots are already booked.";

        return redirect()
            ->route('admin.reservations.index')
            ->with('success', $message);
    }
}

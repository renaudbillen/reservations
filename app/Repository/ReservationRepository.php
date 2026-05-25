<?php

namespace App\Repository;

use App\Models\Reservation;
use App\Models\Vacation;
use Illuminate\Support\Facades\DB;

class ReservationRepository
{
    /**
     * @param int $room_id
     * @param string $reservation_date
     * @param string $reservation_time
     * @return bool
     */
    public static function checkIsAvailable(
        int    $room_id,
        string $reservation_date,
        string $reservation_time
    ): bool
    {
        // Check for existing reservations at the same time
        $hasReservation = DB::table('reservations')
            ->where('room_id', $room_id)
            ->where('reservation_date', $reservation_date)
            ->where('reservation_time', $reservation_time)
            ->exists();

        // Check for vacations that block this date
        $hasVacation = Vacation::whereDate('start_date', '<=', $reservation_date)
            ->whereDate('end_date', '>=', $reservation_date)
            ->exists();

        return !$hasReservation && !$hasVacation;
    }
}

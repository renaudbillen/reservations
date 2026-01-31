<?php

namespace App\Repository;

use App\Models\Reservation;
use Illuminate\Support\Facades\DB;

class ReservationRepository
{
    /**
     * @param int $room_id
     * @param string $reservation_date
     * @param string $reservation_period
     * @return bool
     */
    public static function checkIsAvailable(
        int    $room_id,
        string $reservation_date,
        string $reservation_period
    ): bool
    {
        return !DB::table('reservations')
            ->where('room_id', $room_id)
            ->where('reservation_date', $reservation_date)
            ->where('reservation_period', $reservation_period)
            ->exists();
    }
}

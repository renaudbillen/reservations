<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        // Add new reservation_time column
        Schema::table('reservations', function (Blueprint $table) {
            $table->time('reservation_time')->nullable()->after('reservation_date');
        });

        // Convert existing AM/PM reservations to time slots
        // AM becomes 10:00, PM becomes 14:00 as default conversion
        \DB::table('reservations')
            ->where('reservation_period', 'AM')
            ->update(['reservation_time' => '10:00:00']);

        \DB::table('reservations')
            ->where('reservation_period', 'PM')
            ->update(['reservation_time' => '14:00:00']);

        // Make reservation_time not nullable after setting default values
        Schema::table('reservations', function (Blueprint $table) {
            $table->time('reservation_time')->nullable(false)->change();
        });

        // Drop the old reservation_period column
        Schema::table('reservations', function (Blueprint $table) {
            $table->dropColumn('reservation_period');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        // Add back the reservation_period column
        Schema::table('reservations', function (Blueprint $table) {
            $table->enum('reservation_period', ['AM', 'PM'])->nullable()->after('reservation_date');
        });

        // Convert time slots back to AM/PM
        \DB::table('reservations')
            ->whereTime('reservation_time', '<', '12:00:00')
            ->update(['reservation_period' => 'AM']);

        \DB::table('reservations')
            ->whereTime('reservation_time', '>=', '12:00:00')
            ->update(['reservation_period' => 'PM']);

        // Make reservation_period not nullable
        Schema::table('reservations', function (Blueprint $table) {
            $table->enum('reservation_period', ['AM', 'PM'])->nullable(false)->change();
        });

        // Drop the reservation_time column
        Schema::table('reservations', function (Blueprint $table) {
            $table->dropColumn('reservation_time');
        });
    }
};

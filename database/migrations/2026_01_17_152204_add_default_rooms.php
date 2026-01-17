<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Support\Facades\DB;

return new class extends Migration {
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        $rooms = [
            ['name' => 'Piscine'],
            ['name' => 'Cabinet 1'],
            ['name' => 'Cabinet 2'],
            ['name' => 'Cabinet 3'],
            ['name' => 'Cabinet 4'],
            ['name' => 'Cabinet 5'],
        ];

        DB::table('rooms')->insert($rooms);
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        DB::table('rooms')
            ->whereIn('name', [
                'Piscine',
                'Cabinet 1',
                'Cabinet 2',
                'Cabinet 3',
                'Cabinet 4',
                'Cabinet 5'
            ])
            ->delete();
    }
};

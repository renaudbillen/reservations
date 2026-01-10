<?php

namespace Database\Seeders;

use App\Enums\RoleEnum;
use App\Models\Room;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Spatie\Permission\Models\Permission;
use Spatie\Permission\Models\Role;

class RoomSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        Room::create(
            ['name' => 'Piscine'],
            ['name' => 'Cabinet 1'],
            ['name' => 'Cabinet 2'],
            ['name' => 'Cabinet 3'],
            ['name' => 'Cabinet 4'],
            ['name' => 'Cabinet 5'],
        );
    }
}

<?php

namespace Database\Seeders;

use App\Enums\RoleEnum;
use App\Models\User;

// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Spatie\Permission\Models\Role;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        Role::create(['name' => RoleEnum::SUPER_ADMIN]);
        Role::create(['name' => RoleEnum::USER]);

        $this->call(RoleSeeder::class);

        $userRole = Role::firstWhere('name', RoleEnum::USER);

        User::factory()->create([
            'name' => 'Renaud Billen',
            'email' => 'contact@renaudbillen.com',
            'password' => 'contact@renaudbillen.com',
        ])->assignRole(RoleEnum::SUPER_ADMIN);

        User::factory(10)
            ->create()
            ->each(
                fn($user) => $user->assignRole($userRole)
            );
    }
}

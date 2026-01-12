<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Support\Facades\DB;
use Spatie\Permission\Models\Role;
use Spatie\Permission\Models\Permission;

return new class extends Migration {
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        // Reset cached roles and permissions
        app()['cache']->forget('spatie.permission.cache');

        // Create permissions
        $permissions = [
            'user_index',
            'user_create',
            'user_edit',
            'user_destroy',
            'vacation_index',
            'vacation_create',
            'vacation_edit',
            'vacation_destroy',
            'reservation_index',
            'reservation_create',
            'reservation_edit',
            'reservation_destroy',
        ];

        foreach ($permissions as $permission) {
            Permission::firstOrCreate(['name' => $permission, 'guard_name' => 'web']);
        }

        // Create roles and assign created permissions
        // Get all permissions we just created
        $allPermissions = Permission::all()->pluck('name')->toArray();
        
        // Create or update Super Admin role and give all permissions
        $superAdminRole = Role::firstOrCreate(['name' => 'Super Admin', 'guard_name' => 'web']);
        $superAdminRole->syncPermissions($allPermissions);

        // Create or update User role with basic permissions
        $userRole = Role::firstOrCreate(['name' => 'User', 'guard_name' => 'web']);
        $userPermissions = [
            'reservation_index',
            'reservation_create',
            'reservation_edit',
            'reservation_destroy',
        ];
        $userRole->syncPermissions($userPermissions);
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        // Reset cached roles and permissions
        app()['cache']->forget('spatie.permission.cache');

        // Optionally remove the roles and permissions
        $tableNames = config('permission.table_names');

        DB::table($tableNames['role_has_permissions'])->delete();
        DB::table($tableNames['model_has_roles'])->delete();
        DB::table($tableNames['model_has_permissions'])->delete();
        DB::table($tableNames['roles'])->where('name', 'User')->delete();

        // Remove permissions
        $permissions = [
            'view dashboard',
            'view profile',
            'edit profile',
            'view users',
            'create users',
            'edit users',
            'delete users',
        ];

        foreach ($permissions as $permission) {
            Permission::where('name', $permission)->delete();
        }
    }
};

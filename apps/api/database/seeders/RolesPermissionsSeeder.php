<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Spatie\Permission\Models\Permission;
use Spatie\Permission\Models\Role;

class RolesPermissionsSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        app()[\Spatie\Permission\PermissionRegistrar::class]->forgetCachedPermissions();

        // Products & Categories
        $ProductsCategoriesPermissions = [
            'products.view',
            'products.create',
            'products.edit',
            'products.delete',
            'categories.manage'
        ];

        $UsersPermission = [
            'users.view',
            'users.create',
            'users.edit',
            'users.suspend',
        ];

        $orderPermission = [
            'orders.view',
            'orders.update',
        ];

        // Create permissions
        foreach ([...$ProductsCategoriesPermissions, ...$UsersPermission, ...$orderPermission] as  $value) {
            Permission::create(['name' => $value]);
        }

        $admin = Role::create(['name' => 'admin']);
        $manager = Role::create(['name' => 'manager']);
        $customer = Role::create(['name' => 'customer']);

        // Assign permissions to roles
        $admin->givePermissionTo(Permission::all());
        $manager->givePermissionTo([...$ProductsCategoriesPermissions, ...$UsersPermission, ...$orderPermission]);
        $customer->givePermissionTo([$ProductsCategoriesPermissions[0], $orderPermission[0]]);
    }
}

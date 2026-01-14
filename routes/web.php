<?php

use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use Laravel\Fortify\Features;

Route::get('/', function () {
    return Inertia::render('Welcome');
})->name('home');

Route::get('dashboard', function () {
    return Inertia::render('Dashboard');
})->middleware(['auth', 'verified'])->name('dashboard');


Route::middleware(['auth', 'verified'])
    ->prefix('admin')
    ->name('admin.')
    ->group(function () {
        Route::resource('users', \App\Http\Controllers\UserController::class)
            ->names('users');

        Route::resource('reservations', \App\Http\Controllers\ReservationController::class)
            ->names('reservations');

        Route::resource('periodicReservations', \App\Http\Controllers\PeriodicReservationController::class)
            ->names('periodicReservations');

        Route::resource('vacations', \App\Http\Controllers\VacationController::class)
            ->except(['show']);
    });

require __DIR__ . '/settings.php';

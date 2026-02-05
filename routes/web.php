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

Route::get('admin/dashboard', function () {
    $user = request()->user();
    
    if (!$user || !$user->roles || !$user->roles->contains('name', 'Super Admin')) {
        return redirect('/user/dashboard');
    }
    
    return Inertia::render('admin/Dashboard');
})->middleware(['auth', 'verified'])->name('admin.dashboard');

Route::get('admin/dashboard-data', function () {
    $user = request()->user();
    
    if (!$user || !$user->roles || !$user->roles->contains('name', 'Super Admin')) {
        return response()->json(['error' => 'Unauthorized'], 403);
    }
    
    // Get stats
    $stats = [
        'totalReservations' => \App\Models\Reservation::count(),
        'monthlyReservations' => \App\Models\Reservation::whereMonth('reservation_date', now()->month)->count(),
        'activeUsers' => \App\Models\User::whereHas('reservations')->count(),
        'availableRooms' => \App\Models\Room::count(),
    ];
    
    // Get future reservations with relationships
    $futureReservations = \App\Models\Reservation::with(['room', 'user', 'forUser'])
        ->where('reservation_date', '>=', now())
        ->orderBy('reservation_date', 'asc')
        ->get();
    
    return response()->json([
        'stats' => $stats,
        'futureReservations' => $futureReservations,
    ]);
})->middleware(['auth', 'verified']);

Route::get('user/dashboard', function () {
    return Inertia::render('user/Dashboard');
})->middleware(['auth', 'verified'])->name('user.dashboard');

// User reservation routes
Route::middleware(['auth', 'verified'])
    ->prefix('reservations')
    ->name('reservations.')
    ->group(function () {
        Route::get('/', [\App\Http\Controllers\UserReservationController::class, 'index'])
            ->name('index');
        Route::get('/create', [\App\Http\Controllers\UserReservationController::class, 'create'])
            ->name('create');
        Route::post('/', [\App\Http\Controllers\UserReservationController::class, 'store'])
            ->name('store');
        Route::get('/{reservation}', [\App\Http\Controllers\UserReservationController::class, 'show'])
            ->name('show');
        Route::get('/{reservation}/edit', [\App\Http\Controllers\UserReservationController::class, 'edit'])
            ->name('edit');
        Route::put('/{reservation}', [\App\Http\Controllers\UserReservationController::class, 'update'])
            ->name('update');
        Route::delete('/{reservation}', [\App\Http\Controllers\UserReservationController::class, 'destroy'])
            ->name('destroy');
    });


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

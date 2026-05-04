<?php

use App\Http\Controllers\PeriodicReservationController;
use App\Http\Controllers\ReservationController;
use App\Http\Controllers\UserController;
use App\Http\Controllers\UserReservationController;
use App\Http\Controllers\VacationController;
use App\Models\Reservation;
use App\Models\Room;
use App\Models\User;
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

    // Get filter parameters
    $startDate = request()->input('start_date');
    $endDate = request()->input('end_date');
    $byUserId = request()->input('by_user_id');
    $forUserId = request()->input('for_user_id');

    // Get stats
    $stats = [
        'totalReservations' => Reservation::count(),
        'monthlyReservations' => Reservation::whereMonth('reservation_date', now()->month)->count(),
        'activeUsers' => User::whereHas('reservations')->count(),
        'availableRooms' => Room::count(),
    ];

    // Build query for future reservations with filters
    $query = Reservation::with(['room', 'user', 'forUser'])
        ->whereDate('reservation_date', '>=', now()->toDateString());

    // Apply date range filters if provided
    if ($startDate && $endDate) {
        // Both dates provided - use range
        $query->whereDate('reservation_date', '>=', $startDate)
              ->whereDate('reservation_date', '<=', $endDate);
    } elseif ($startDate) {
        // Only start date provided - filter from this date onwards
        $query->whereDate('reservation_date', '>=', $startDate);
    } elseif ($endDate) {
        // Only end date provided - filter up to this date
        $query->whereDate('reservation_date', '<=', $endDate);
    }
    
    // Apply user filters if provided
    if ($byUserId) {
        $query->where('by_user_id', $byUserId);
    }
    if ($forUserId) {
        $query->where('for_user_id', $forUserId);
    }

    $futureReservations = $query->orderBy('reservation_date', 'asc')->get();

    // Get users for filter dropdowns
    $users = User::select('id', 'name')->orderBy('name')->get();

    return response()->json([
        'stats' => $stats,
        'futureReservations' => $futureReservations,
        'users' => $users,
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
        Route::get('/', [UserReservationController::class, 'index'])
            ->name('index');
        Route::get('/create', [UserReservationController::class, 'create'])
            ->name('create');
        Route::post('/', [UserReservationController::class, 'store'])
            ->name('store');
        Route::get('/{reservation}', [UserReservationController::class, 'show'])
            ->name('show');
        Route::get('/{reservation}/edit', [UserReservationController::class, 'edit'])
            ->name('edit');
        Route::put('/{reservation}', [UserReservationController::class, 'update'])
            ->name('update');
        Route::delete('/{reservation}', [UserReservationController::class, 'destroy'])
            ->name('destroy');
    });

Route::middleware(['auth', 'verified'])
    ->prefix('admin')
    ->name('admin.')
    ->group(function () {
        Route::resource('users', UserController::class)
            ->names('users');

        Route::resource('reservations', ReservationController::class)
            ->names('reservations');

        Route::resource('periodicReservations', PeriodicReservationController::class)
            ->names('periodicReservations');

        Route::resource('vacations', VacationController::class)
            ->except(['show']);
    });

require __DIR__ . '/settings.php';

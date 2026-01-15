<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Vacation;
use Illuminate\Http\JsonResponse;

class VacationController extends Controller
{
    /**
     * Display a listing of the users.
     */
    public function index(): JsonResponse
    {
        $perPage = request('per_page', 10);
        $sortBy = request('sort', 'created_at');
        $sortDirection = request('direction', 'desc');

        $vacations = Vacation::query()
            ->when(request('search'), function ($query, $search) {
                $query->where('name', 'like', "%{$search}%");
            })
            ->orderBy($sortBy, $sortDirection)
            ->paginate($perPage)
            ->withQueryString();

        return response()->json([
            'success' => true,
            'vacations' => $vacations,
        ]);
    }
}

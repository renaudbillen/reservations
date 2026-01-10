<?php

namespace App\Http\Controllers;

use App\Models\Vacation;
use Illuminate\Http\Request;
use Inertia\Inertia;

class VacationController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $vacations = Vacation::orderBy('start_date', 'desc')->get();

        return Inertia::render('admin/vacations/Index', [
            'vacations' => $vacations,
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        return Inertia::render('admin/vacations/Create');
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'start_date' => 'required|date',
            'end_date' => 'required|date|after_or_equal:start_date',
        ]);

        Vacation::create($validated);

        return redirect()
            ->route('admin.vacations.index')
            ->with('success', 'Vacation created successfully.');
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Vacation $vacation)
    {
        return Inertia::render('admin/vacations/Edit', [
            'vacation' => $vacation,
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Vacation $vacation)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'start_date' => 'required|date',
            'end_date' => 'required|date|after_or_equal:start_date',
        ]);

        $vacation->update($validated);

        return redirect()->route('admin.vacations.index')
            ->with('success', 'Vacation updated successfully.');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Vacation $vacation)
    {
        $vacation->delete();

        return redirect()->route('admin.vacations.index')
            ->with('success', 'Vacation deleted successfully.');
    }
}

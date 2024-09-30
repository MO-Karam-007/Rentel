<?php

namespace App\Http\Controllers;

use App\Models\Rental;
use Illuminate\Http\Request;
use Illuminate\Routing\Controllers\HasMiddleware;
use Illuminate\Routing\Controllers\Middleware;
use Illuminate\Support\Facades\Gate;

class RentalController extends BaseController implements HasMiddleware
{

    public static function middleware()
    {
        return [
            new Middleware('auth:sanctum', except: ['index', 'show'])
        ];
    }

    public function index()
    {
        $rentals = Rental::with('item', 'borrowers')->get();
        return $this->sendResponse($rentals, 'Rentals retrieved successfully');
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'item_id' => 'required|exists:items,item_id',
            'borrower_ids' => 'required|array',
            'borrower_ids.*' => 'exists:users,id',
            'start_date' => 'required|date',
            'end_date' => 'required|date|after_or_equal:start_date',
            'status' => 'required|in:requested,approved,active,returned',
            'rental_price' => 'nullable|numeric',
        ]);
        

        $rental = Rental::create($validated);
        
        $rental->borrowers()->attach($validated['borrower_ids']);

        return response()->json(['message' => 'Rental created successfully', 'rental' => $rental], 201);
    }

    public function show($id)
    {
        $rental = Rental::with('item', 'borrowers')->find($id);

        if (!$rental) {
            return $this->sendError('Rental not found', 404);
        }

        return $this->sendResponse($rental, 'Rental retrieved successfully');
    }

    public function update(Request $request, Rental $rental)
    {
        Gate::authorize('modify', $rental);

        $validated = $request->validate([
            'item_id' => 'required|exists:items,item_id',
            'borrower_ids' => 'required|array',
            'borrower_ids.*' => 'exists:users,id',
            'start_date' => 'required|date',
            'end_date' => 'required|date|after_or_equal:start_date',
            'status' => 'required|in:requested,approved,active,returned',
            'rental_price' => 'nullable|numeric',
        ]);

        $rental->update($validated);

        // Sync borrowers
        $rental->borrowers()->sync($validated['borrower_ids']);

        return $this->sendResponse(['message' => 'Rental updated successfully', 'rental' => $rental], 200);
    }

    public function destroy(Rental $rental)
    {
        Gate::authorize('modify', $rental);

        $rental->borrowers()->detach();
        $rental->delete();

        return $this->sendResponse(['message' => 'Rental deleted successfully'], 200);
    }
}

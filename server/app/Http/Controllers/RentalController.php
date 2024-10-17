<?php

namespace App\Http\Controllers;

use App\Models\Item;
use App\Models\Rental;
use Illuminate\Http\Request;
use Illuminate\Routing\Controllers\HasMiddleware;
use Illuminate\Routing\Controllers\Middleware;
use Illuminate\Support\Facades\Auth;
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
        $user = Auth::user();

        $validated = $request->validate([
            'end_date' => 'required|date|after_or_equal:' . now(),
            'item_id' => 'required|exists:items,id'
        ]);

        $item = Item::findOrFail($validated['item_id']);

        $validated['borrower_id'] = $user->id;
        $validated['start_date'] = now();
        $validated['status'] = 'requested';
        $validated['rental_price'] = $item->price;


        $rental = Rental::create($validated);

        return $this->sendResponse(['message' => 'Rental created successfully', 'rental' => $rental], 201);
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
            'start_date' => 'date',
            'end_date' => 'date|after_or_equal:start_date',
            'status' => 'in:requested,approved,active,returned',
            'rental_price' => 'nullable|numeric',
        ]);

        $rental->update($validated);

        // Sync borrowers
        // $rental->borrowers()->sync($validated['borrower_ids']);

        return $this->sendResponse(['message' => 'Rental updated successfully',  $rental], 200);
    }

    public function destroy(Rental $rental)
    {
        Gate::authorize('modify', $rental);

        $rental->borrowers()->detach();
        $rental->delete();

        return $this->sendResponse(['message' => 'Rental deleted successfully'], 200);
    }
}

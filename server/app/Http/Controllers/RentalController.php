<?php

namespace App\Http\Controllers;

use App\Models\Item;
use App\Models\Rental;
use Illuminate\Http\Request;
use Illuminate\Routing\Controllers\HasMiddleware;
use Illuminate\Routing\Controllers\Middleware;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Gate;
use Illuminate\Support\Facades\Mail;
use Illuminate\Support\Facades\Log;
use App\Notifications\rentemail;
use App\Notifications\AcceptReqNoti;


class RentalController extends BaseController implements HasMiddleware
{

    public static function middleware()
    {
        return [
            new Middleware('auth:sanctum', except: ['show'])
        ];
    }

    public function index(Request $request)
    {

        $user = Auth::user()->role;

        if ($user == 'admin') {
            $rentals = Rental::with('item', 'borrowers', 'item.user');
            if ($request->has('search')) {
                $search = $request->input('search');

                $rentals = $rentals->whereHas('item.user', function ($query) use ($search) {
                    // Search by lender's (owner's) username
                    $query->where('username', 'like', '%' . $search . '%');
                })
                    ->orWhereHas('borrowers', function ($query) use ($search) {
                        // Search by borrower's username
                        $query->where('username', 'like', '%' . $search . '%');
                    })
                    ->orWhereHas('item', function ($query) use ($search) {
                        // Search by borrower's username
                        $query->where('name', 'like', '%' . $search . '%');
                    });;
            }


            if ($request->has('status')) {
                $status = $request->input('status');
                $rentals->where('status', 'like', '%' . $status . '%');
            }
            $perPage = $request->input('limit', 10);
            $rentals = $rentals->paginate($perPage);
            return $this->sendResponse($rentals, 'Posts retrieved successfully');
        } else {
            return $this->sendError('User not authorized to delete this post', [], 403);
        }
    }


    public function getItemOwnerRentals(Request $request)
    {
        $userId = Auth::id();
        $rentals = Rental::where('item_owner_id', $userId)
            ->with('item', 'borrower');

        $perPage = $request->input('limit', 10);
        $rentals = $rentals->paginate($perPage);

        return $this->sendResponse($rentals, 'Rentals retrieved successfully');
    }

    public function getBorrowerRentals(Request $request)
    {
        $userId = Auth::id();
        $rentals = Rental::with('item')->where('borrower_id', '=', $userId);
        $perPage = $request->input('limit', 10);
        $rentals = $rentals->paginate($perPage);

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
        $validated['item_owner_id'] = $item->lender_id;  // Set item owner
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




    public function approveRental(Rental $rental)
    {

        Gate::authorize('modify', $rental);

        if ($rental->status !== 'requested') {
            return $this->sendError('Rental cannot be approved', 400);
        }

        $rental->status = 'approved';
        $rental->save();

        $borrower = $rental->borrower;  // Using the borrower relationship
        $owner = $rental->itemOwner;
        $item = $rental->item;


        if (!$owner) {
            Log::error('Owner not found for rental:', ['rental_id' => $rental->id]);
            return $this->sendError('Owner not found', 404);
        }
        // Send an email to the borrower with the owner information
        $borrower->notify(new AcceptReqNoti($owner, $rental, $item));


        //    $borrower->notify(new rentemail($rental));
        return $this->sendResponse([
            'message' => 'Rental approved successfully',
            'borrower' => [
                'id' => $borrower->id,
                'name' => $borrower->username,
                'email' => $borrower->email
            ],
            'owner' => [
                'id' => $owner->id,
                'name' => $owner->username,
                'email' => $owner->email
            ]
        ], 200);
    }
}

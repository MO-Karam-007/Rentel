<?php

namespace App\Http\Controllers;

use App\Models\Item;
use App\Models\Review;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Gate;
use Illuminate\Routing\Controllers\HasMiddleware;

use Illuminate\Routing\Controllers\Middleware;


class ReviewController extends BaseController implements HasMiddleware

{
    public static function middleware()
    {
        return [
            new Middleware('auth:sanctum', except: ['index', 'show'])
        ];
    }


    public function index()
    {
        $reviews = Review::with('reviewed')->get();
        return $this->sendResponse($reviews, 'Reviews retrieved successfully');
    }

    public function store(Request $request)
    {
        $user = Auth::id();
        $validated = $request->validate([
            'reviewed_id' => 'required',
            'reviewed_type' => 'required|in:App\\Models\\User,App\\Models\\Item',
            'rating' => 'required|integer|min:1|max:5',
            'comment' => 'nullable|string',
        ]);

        $validated['reviewer_id'] = $user;

        if ($request->reviewed_type == 'App\\Models\\Item') {
            $hasBorrowed = DB::table('rentals')
                ->where('item_id', $request->reviewed_id)
                ->where('borrower_id', $user)
                ->where('status', 'returned')
                ->exists();


            if (!$hasBorrowed) {
                return response()->json([
                    'message' => 'You cannot review this item because you have not borrowed it before.'
                ], 403); // Forbidden response
            }
        } elseif ($request->reviewed_type == 'App\\Models\\User') {
            $item = Item::find($request->reviewed_id);

            if (!$item || $item->owner_id != $request->reviewed_id) {
                return response()->json([
                    'message' => 'Invalid owner or item.'
                ], 404); // Not Found response
            }
        }




        $review = Review::create($validated);

        return response()->json(['message' => 'Review created successfully', 'review' => $review], 201);
    }

    public function show($id)
    {
        $review = Review::with('reviewed')->find($id);

        if (!$review) {
            return $this->sendError('Review not found', 404);
        }

        return $this->sendResponse($review, 'Review retrieved successfully');
    }

    public function update(Request $request, Review $review)
    {
        //  Gate::authorize('modify', $review);

        $validated = $request->validate([
            'reviewer_id' => 'required|exists:users,id',
            'reviewed_id' => 'required',
            'reviewed_type' => 'required|in:App\\Models\\User,App\\Models\\Item',
            'rating' => 'required|integer|min:1|max:5',
            'comment' => 'nullable|string',
        ]);

        $review->update($validated);

        return $this->sendResponse(['message' => 'Review updated successfully', 'review' => $review], 200);
    }

    public function destroy(Review $review)
    {
        //  Gate::authorize('modify', $review);

        $review->delete();

        return $this->sendResponse(['message' => 'Review deleted successfully'], 200);
    }
}


//  public function reviews()
//{
 //   return $this->morphMany(Review::class, 'reviewed');
//}

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
        $currentUserId = auth()->id();
        $reviews = Review::where('reviewed_id', $currentUserId)
            ->with(['reviewed:id,longitude,latitude', 'reviewer:id,username'])
            ->get()
            ->map(function ($review) {
                return [
                    'reviewer_username' => $review->reviewer->username,
                    'longitude' => $review->reviewed->longitude,
                    'latitude' => $review->reviewed->latitude,
                    'comment' => $review->comment,
                ];
            });

        return $this->sendResponse($reviews, 'Reviews retrieved successfully');
    }


    public function store(Request $request)
    {
        $user = Auth::id();
        $validated = $request->validate([
            'reviewed_id' => 'required',
            'rating' => 'required|integer|min:1|max:5',
            'comment' => 'nullable|string',

        ]);

        $validated['reviewer_id'] = $user;



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

    // public function getItemReviews($itemId)
    // {
    //     // Retrieve all reviews for the given item ID
    //     $reviews = Review::where('reviewed_id', $itemId)->get();

    //     // Check if any reviews exist
    //     if ($reviews->isEmpty()) {
    //         return response()->json(['message' => 'No reviews found for this item'], 404);
    //     }

    //     // Return the reviews in the response
    //     return response()->json(['reviews' => $reviews], 200);
    // }
    public function getItemReviews($itemId)
    {
        // Retrieve all reviews for the given item ID along with reviewer username
        $reviews = Review::with('reviewer') // Assuming 'reviewer' is the relationship in the Review model
            ->where('reviewed_id', $itemId)
            ->get();

        // Check if any reviews exist
        if ($reviews->isEmpty()) {
            return response()->json(['message' => 'No reviews found for this item'], 404);
        }

        // Transform reviews to include the reviewer's username
        $reviewsWithUsernames = $reviews->map(function ($review) {
            return [
                'id' => $review->id,
                'reviewer_id' => $review->reviewer_id,
                'username' => $review->reviewer->username, // Assuming 'username' is the field in the User model
                'rating' => $review->rating,
                'comment' => $review->comment,
                // Add any other fields you want to return
            ];
        });

        // Return the reviews in the response
        return response()->json(['reviews' => $reviewsWithUsernames], 200);
    }
}

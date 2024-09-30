<?php

namespace App\Http\Controllers;

use App\Models\Review;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Gate;

class ReviewController extends BaseController
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
        $validated = $request->validate([
            'reviewer_id' => 'required',
            'reviewed_id' => 'required',
            'reviewed_type' => 'required|in:App\\Models\\User,App\\Models\\Item',
            'rating' => 'required|integer|min:1|max:5',
            'comment' => 'nullable|string',
        ]);

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
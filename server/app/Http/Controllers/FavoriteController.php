<?php

namespace App\Http\Controllers;

use App\Models\Favorite;
use Illuminate\Http\Request;
use App\Models\User;
use App\Models\Item;
use Illuminate\Routing\Controllers\HasMiddleware;
use Illuminate\Routing\Controllers\Middleware;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Gate;

class FavoriteController extends Controller
{
    public function index(Request $request)
    {
        $perPage = $request->input('limit', 10);

        $favorites = Favorite::paginate($perPage);

        dd($favorites);
        // Return the paginated result in a JSON response
        return response()->json([
            'success' => true,
            'data' => $favorites,
            'message' => 'Favorites retrieved successfully'
        ]);
    }

    public function store(Request $request)
    {
        $favorite = Favorite::create($request->all());
        return response()->json($favorite, 201);
    }

    public function destroy($userId, $itemId)
    {
        // Remove a specific favorite
        Favorite::where('user_id', $userId)->where('item_id', $itemId)->delete();
        return response()->json(null, 204);
    }

    // Get the authenticated user's favorite items
    public function getUserFavorites(Request $request)
    {
        $user = auth()->user(); // Get the authenticated user

        // Set the perPage limit, defaulting to 10 if not provided
        $perPage = $request->input('limit', 10);

        // Retrieve and paginate favorite items
        $favorites = $user->favoriteItems()->paginate($perPage);

        return response()->json([
            'success' => true,
            'data' => $favorites,
            'message' => 'User favorites retrieved successfully'
        ]);
    }

    // Add an item to the authenticated user's favorites
    public function addFavorite(Request $request)
    {
        $user = auth()->user(); // Get the authenticated user
        $item = Item::findOrFail($request->item_id); // Get the item by ID

        // Attach the item to the user's favorites (will avoid duplicates due to the unique constraint)
        $user->favoriteItems()->syncWithoutDetaching([$item->id]);

        return response()->json(['message' => 'Item added to favorites.'], 200);
    }

    // Remove an item from the user's favorites
    public function removeFavorite(Request $request)
    {
        $user = auth()->user(); // Get the authenticated user
        $item = Item::findOrFail($request->item_id); // Get the item by ID

        // Detach the item from the user's favorites
        $user->favoriteItems()->detach($item->id);

        return response()->json(['message' => 'Item removed from favorites.'], 200);
    }
}

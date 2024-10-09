<?php
namespace App\Http\Controllers;

use App\Models\Favorite;
use Illuminate\Http\Request;

class FavoriteController extends Controller
{
    public function index()
    {
        // Display all favorites
        $favorites = Favorite::all();
        return response()->json($favorites);
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
}

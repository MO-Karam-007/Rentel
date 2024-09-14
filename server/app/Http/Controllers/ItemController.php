<?php

namespace App\Http\Controllers;

use App\Models\Item;
use Illuminate\Http\Request;
use Illuminate\Routing\Controllers\HasMiddleware;
use Illuminate\Routing\Controllers\Middleware;
use Illuminate\Support\Facades\Gate;

class ItemController extends BaseController implements HasMiddleware
{

    public static function middleware()
    {
        return [
            new Middleware('auth:sanctum', except: ['index', 'show'])
        ];
    }

    public function index()
    {
        $items = Item::all();
        // return response()->json("ok", 200);
        return $this->sendResponse($items, 'Data retrived successfully');
    }

    public function store(Request $request)
    {

        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'description' => 'required',
            'item_image' => 'nullable|image|mimes:jpeg,png,jpg,gif,svg|max:2048',
            'price' => 'required|numeric',
            'duration' => 'required|integer',
            'status' => 'required|in:available,rented,unavailable',
        ]);

        $validated['leander_id']  = $request->user->id;

        if ($request->hasFile('item_image')) {
            $imagePath = $request->file('item_image')->store('images', 'public');
            $validated['item_image'] = $imagePath;
        }

        $item = Item::create($validated);

        return response()->json(['message' => 'Item created successfully', 'item' => $item], 201);
    }


    public function show($id)
    {
        $item = Item::find($id);

        if (!$item) {
            return $this->sendError('Item not found', 404);
        }
        return  $this->sendResponse($item, 200);
    }


    public function update(Request $request, Item $item)
    {
        Gate::authorize('modify', $item);

        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'description' => 'required',
            'item_image' => 'nullable|image|mimes:jpeg,png,jpg,gif,svg|max:2048',
            'price' => 'required|numeric',
            'duration' => 'required|integer',
            'status' => 'required|in:available,rented,unavailable'
        ]);

        if ($request->hasFile('item_image')) {
            $imagePath = $request->file('item_image')->store('images', 'public');
            $validated['item_image'] = $imagePath;
        }

        $item->update($validated);

        return $this->sendResponse(['message' => 'Item updated successfully', 'item' => $item], 200);
    }

    public function destroy(Item $item)
    {
        Gate::authorize('modify', $item);

        $item->delete();

        return $this->sendResponse(['message' => 'Item deleted successfully'], 200);
    }
}

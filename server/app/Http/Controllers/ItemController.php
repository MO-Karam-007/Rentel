<?php

namespace App\Http\Controllers;

use App\Models\Item;
use Illuminate\Http\Request;

class ItemController extends BaseController
{
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
            'lender_id' => 'required|exists:users,id'
        ]);

        if ($request->hasFile('item_image')) {
            $imagePath = $request->file('item_image')->store('images', 'public');
            $validated['item_image'] = $imagePath;
        }

        $item = Item::create($validated);

        return response()->json(['message' => 'Item created successfully', 'item' => $item], 201);
    }

    public function show(Item $item)
    {
        return response()->json($item, 200);
    }

    public function update(Request $request, Item $item)
    {
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

        return response()->json(['message' => 'Item updated successfully', 'item' => $item], 200);
    }

    public function destroy(Item $item)
    {
        $item->delete();

        return response()->json(['message' => 'Item deleted successfully'], 200);
    }
}

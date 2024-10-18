<?php

namespace App\Http\Controllers;

use App\Models\Item;
use App\Models\Item_image;
use App\Models\Item_specification;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Routing\Controllers\HasMiddleware;
use Illuminate\Routing\Controllers\Middleware;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Gate;
use Illuminate\Support\Str;

class ItemController extends BaseController implements HasMiddleware
{

    public static function middleware()
    {
        return [
            new Middleware('auth:sanctum', except: [])
        ];
    }


    function haversineGreatCircleDistance($lat1, $lon1, $lat2, $lon2, $radius = 6371)
    {
        $lat1 = deg2rad($lat1);
        $lon1 = deg2rad($lon1);
        $lat2 = deg2rad($lat2);
        $lon2 = deg2rad($lon2);

        // Haversine formula
        $dLat = $lat2 - $lat1;
        $dLon = $lon2 - $lon1;

        $a = sin($dLat / 2) * sin($dLat / 2) +
            cos($lat1) * cos($lat2) *
            sin($dLon / 2) * sin($dLon / 2);

        $c = 2 * atan2(sqrt($a), sqrt(1 - $a));
        $distance = $radius * $c;

        return $distance;
    }

    public function index(Request $request)
    {

        $searchTerm = $request->input('search');
        $userId = Auth::id();

        $userLat = Auth::user()->latitude;
        $userLon = Auth::user()->longitude;

        $maxDistanceInKm = $request->query('maxDistance', 21);

        $items = Item::with(['category', 'images', 'specifications', 'user'])
            ->where('lender_id', '!=', $userId)
            ->get();

        if ($searchTerm) {
            $items = $items->filter(function ($item) use ($searchTerm) {
                return Str::contains(strtolower($item->name), strtolower($searchTerm))
                    || Str::contains(strtolower($item->description), strtolower($searchTerm));
            });
        }

        $filteredItems = $items->filter(function ($item) use ($userLat, $userLon, $maxDistanceInKm) {
            // Get item's latitude and longitude
            $itemLat = $item->latitude;
            $itemLon = $item->longitude;

            $distance = $this->haversineGreatCircleDistance($userLat, $userLon, $itemLat, $itemLon);

            return $distance <= $maxDistanceInKm;
        })->map(function ($item) use ($userLat, $userLon) {
            $itemLat = $item->latitude;
            $itemLon = $item->longitude;

            $distance = $this->haversineGreatCircleDistance($userLat, $userLon, $itemLat, $itemLon);

            $item->distance = round($distance, 2);

            return $item;
        });





        return $this->sendResponse($filteredItems->values(), 'Items within range retrieved successfully');
    }


    public function myItems(Request $request)
    {
        $userId = Auth::id();

        $items = Item::with(['category', 'images', 'specifications', 'user'])->where('lender_id', '=', $userId)->get();

        return $items;
    }




    public function store(Request $request)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'description' => 'required',
            'price' => 'required|numeric',
            // 'duration' => 'required|integer',
            'startDate' => 'required|date',
            'endDate' => 'required|date|after:startDate',
            'status' => 'boolean',
            'current_state' => 'required|in:available,rented,unavailable',
            'category_id' => 'required|exists:categories,id',
            'latitude' => 'required',
            'longitude' => 'required',
            'item_image' => 'image|mimes:jpeg,png,jpg,gif,svg|max:2048',
            'item_images.*' => 'image|mimes:jpg,jpeg,png|max:2048',

        ]);


        $user = Auth::user();
        $validated['location'] =  DB::raw("ST_Point({$validated['latitude']}, {$validated['longitude']})");
        $validated['lender_id']  = $user->id;
        $validated['tag'] = Str::slug($validated['name'], '-') . '-' . Str::random(2);

        if ($request->hasFile('item_image')) {
            $imagePath = $request->file('item_image')->store('images', 'public');
            $validated['item_image'] = $imagePath;
        }


        if ($request->hasFile('item_images')) {
            foreach ($request->file('item_images') as $image) {
                $path = $image->store('item_images', 'public');

                Item_image::create([
                    'item_id' => $item->id,
                    'image_path' => $path,
                ]);
            }
        }

        if ($request->has('specifications')) {
            foreach ($request->input('specifications') as $specification) {
                Item_specification::create([
                    'item_id' => $item->id,
                    'spec_name' => $specification['spec_name'],
                    'spec_value' => $specification['spec_value'],
                ]);
            }
        }
        // }

        $item = Item::create($validated);

        return response()->json(['message' => 'Item created successfully', 'item' => $item->load(['images', 'specifications'])], 201);
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
            'name' => 'string|max:255',
            'description' => 'string',
            'price' => 'numeric',
            'duration' => 'integer',
            'status' => 'boolean',
            'available' => 'in:available,rented,unavailable'
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

    public function getUserItems($userId)
    {
        // Retrieve items where lender_id matches the provided user ID
        $items = Item::where('lender_id', $userId)->get();

        // Check if there are any items
        if ($items->isEmpty()) {
            return response()->json(['message' => 'No items found for this user'], 404);
        }

        return response()->json(['items' => $items], 200);
    }
}

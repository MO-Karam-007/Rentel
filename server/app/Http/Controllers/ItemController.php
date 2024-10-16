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
            new Middleware('auth:sanctum', except: ['index'])
        ];
    }



    // private function getLocationBasedTrials($longitude, $latitude, $radius = 5)
    // {
    //     // Convert radius from miles to meters
    //     $radiusInMeters = $radius * 1609.34;

    //     // Calculate the center sphere coordinates
    //     $centerSphere = [
    //         $longitude,
    //         $latitude,
    //         $radiusInMeters / 6378137 // Convert radius to radians
    //     ];

    //     $closeTrials = Item::with(['category', 'images', 'specifications'])
    //         ->select('items.*')
    //         ->selectRaw("ST_Distance_Sphere(point(longitude, latitude), point(?, ?)) AS sphere_distance", [
    //             $longitude,
    //             $latitude
    //         ])
    //         ->where('location', $centerSphere)
    //         ->orderBy('sphere_distance')
    //         ->get();

    //     return $closeTrials;
    // }


    public function index(Request $request)
    {

        $latitude = $request->input('latitude');
        $longitude = $request->input('longitude');
        $minDistance = 0; // Minimum distance in meters (7 km)
        $maxDistance = $request->input('max'); // Maximum distance in meters (22 km)

        if ($maxDistance > 22000) {
            return response()->json(['message' => 'Out of our range'], 401);
        }

        if ($latitude && $longitude) {
            // Use PostGIS function to calculate distances
            $items = Item::selectRaw('*, ST_Distance(location, ST_MakePoint(?, ?)::geography) as distance', [$longitude, $latitude])
                ->whereRaw('ST_DWithin(location::geography, ST_MakePoint(?, ?)::geography, ?)', [$longitude, $latitude, $maxDistance])
                ->get();
        } else {
            // If no location is provided, retrieve all items
            $items = Item::with(['category', 'images', 'specifications'])->get();
        }
        // $items = Item::with(['category', 'images', 'specifications'])->get();

        return $this->sendResponse($items, 'Data retrived successfully');
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
        // $validated['location'] = DB::raw("ST_SetSRID(ST_MakePoint({$validated['longitude']}, {$validated['latitude']}), 4326)");

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



    function getNearbyUsers($latitude, $longitude, $radius = 22)
    {
        $nearbyUsers = DB::table('users')
            ->select('users.*', DB::raw("
            ( 6371 * acos( cos( radians($latitude) )
            * cos( radians(latitude) )
            * cos( radians(longitude) - radians($longitude) )
            + sin( radians($latitude) )
            * sin(  
 radians(latitude) ) ) ) AS distance
        "))
            ->having('distance', '<=', $radius)
            ->orderBy('distance')
            ->get();

        return $nearbyUsers;
    }
}

<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreWishlistRequest;
use App\Http\Requests\UpdateWishlistRequest;
use App\Models\Wishlist;
use Illuminate\Routing\Controllers\Middleware;
use Illuminate\Support\Facades\Auth;

class WishlistController extends Controller
{
    public static function middleware()
    {
        return [
            new Middleware('auth:sanctum', except: [])
        ];
    }

    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $userId = Auth::id();

        $items = Wishlist::with(['category', 'images', 'specifications', 'user'])->where('lender_id', '=', $userId)->get();

        return $items;
        //
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {

        // Click Auch add in pivot table wishlist
        //  store user id item Id


    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreWishlistRequest $request)
    {
        //
    }

    /**
     * Display the specified resource.
     */
    public function show(Wishlist $wishlist)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Wishlist $wishlist)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateWishlistRequest $request, Wishlist $wishlist)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Wishlist $wishlist)
    {
        //
    }
}

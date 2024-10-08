<?php
namespace App\Http\Controllers;

use App\Models\Follower;
use Illuminate\Http\Request;

class FollowerController extends Controller
{
    public function index()
    {
        $followers = Follower::all();
        return response()->json($followers);
    }

    public function store(Request $request)
    {
        $follower = Follower::create($request->all());
        return response()->json($follower, 201);
    }

    public function destroy($id)
    {
        Follower::destroy($id);
        return response()->json(null, 204);
    }
}

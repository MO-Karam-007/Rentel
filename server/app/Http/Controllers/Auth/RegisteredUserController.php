<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\BaseController;
use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Auth\Events\Registered;
use Illuminate\Http\Request;
use Illuminate\Http\Response;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Gate;
use Illuminate\Support\Facades\Hash;
use Illuminate\Validation\Rules;

class RegisteredUserController extends BaseController
{
    /**
     * Handle an incoming registration request.
     *
     * @throws \Illuminate\Validation\ValidationException
     */

    public function getUsers(Request $request)
    {
        // Get the authenticated user's role
        $user = Auth::user()->role;

        // Only allow access if the user is an admin
        if ($user == 'admin') {
            // Start building the query with the condition 'profile_incomplete' is false
            $query = User::where('role', 'user');

            // Check if 'email' exists in the request and filter the query
            if ($request->has('search')) {
                $search = $request->input('search');
                $query->where(function ($q) use ($search) {
                    $q->where('email', 'like', '%' . $search . '%')
                        ->orWhere('username', 'like', '%' . $search . '%');
                });
            }
            // Paginate the result with 10 users per page
            $perPage = $request->input('limit', 10); // Results per page, default to 10
            $users = $query->paginate($perPage);

            // Send the response with the users list
            return $this->sendResponse($users, 201);
        } else {
            // Return an error if the user is not authenticated as admin
            return $this->sendError('User not authenticated', [], 401);
        }
    }


    public function store(Request $request)
    {
        $validated =  $request->validate([
            'username' => ['required', 'string', 'max:255'],
            'email' => ['required', 'string', 'lowercase', 'email', 'max:255', 'unique:' . User::class],
            'password' => ['required', 'confirmed', Rules\Password::defaults()],
            'role'  => ['required', 'string']
        ]);

        $validated['role'] = $validated['role'] ?? 'user';


        $user = User::create([
            'username' => $request->username,
            'email' => $request->email,
            'password' => Hash::make($request->string('password')),
            'profile_incomplete' => true,
            'role' => $validated['role'],
            'active_status' => $validated['role'] == 'admin' ? true : false

        ]);

        event(new Registered($user));

        Auth::login($user);

        $token = $user->createToken('api-token')->plainTextToken;

        //  GIS
        return $this->sendResponse(['token' => $token, 'message' => 'User created successfully'], 201);
    }
    public function completeProfile(Request $request)
    {
        $user = Auth::user();

        Gate::authorize('update', $user);

        $validated =  $request->validate([
            'first_name' => ['required', 'string', 'max:255'],
            'last_name' => ['required', 'string', 'max:255'],
            'phone' => ['required', 'string'],
            'address' => ['required'],
            'profile_picture' => ['image', 'mimes:jpeg,png,jpg,gif,svg', 'max:2048'],
            'identification_scan' => ['image', 'mimes:jpeg,png,jpg,gif,svg', 'max:2048'],
            'latitude' => ['required'],
            'longitude' => ['required'],
        ]);

        $validated['profile_incomplete'] = false;
        $validated['location'] =  DB::raw("ST_Point({$validated['latitude']}, {$validated['longitude']})");

        if ($request->hasFile('profile_picture')) {
            $imagePath = $request->file('profile_picture')->store('images', 'public');
            $validated['profile_picture'] = $imagePath;
        }

        if ($request->hasFile('identification_scan')) {
            $imagePath = $request->file('identification_scan')->store('images', 'public');
            $validated['identification_scan'] = $imagePath;
        }

        $user->update($validated);


        // $token = $user->createToken('api-token')->plainTextToken;

        return $this->sendResponse(['message' => 'User created successfully'], 201);
    }


    public function currentUser(Request $request)
    {
        $user = Auth::user();
        return $this->sendResponse(['message' => $user], 201);
    }


    public function banUser($id)
    {

        $user = Auth::user()->role;
        if ($user === 'admin') {

            $user = User::find($id);

            if ($user) {
                $user->active_status = false;
                $user->banned = true;
                $user->save();

                return response()->json(['message' => 'User has been permanently banned.']);
            }

            return response()->json(['message' => 'User not found.'], 404);
        } else {
            return $this->sendError('User not authenticated', [], 401);
        }
    }

    public function suspendUser($id, $days = 3)
    {
        $user = User::find($id);

        if ($user) {
            $user->suspended_until = now()->addDays($days);
            $user->banned = false; // Ensure the user is not banned
            $user->save();

            return response()->json(['message' => "User has been suspended for {$days} days."]);
        }

        return response()->json(['message' => 'User not found.'], 404);
    }


    public function unbanOrUnsuspendUser($id)
    {
        $user = Auth::user()->role;
        if ($user === 'admin') {
            $user = User::find($id);

            if ($user) {
                $user->banned = false;
                $user->active_status = true; // Remove any suspension
                $user->save();

                return response()->json(['message' => 'User has been unbanned or unsuspended.']);
            }
        } else {
            return $this->sendError('User not authenticated', [], 401);
        }

        return response()->json(['message' => 'User not found.'], 404);
    }
}

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
        $user = Auth::user()->role;
        if ($user == 'admin') {
            $query = User::where('profile_incomplete', false);
            $users = $query->paginate(10);

            return $this->sendResponse($users, 201);
        } else {
            return $this->sendError('User not Authenticated', [], 401);
        }
    }


    public function store(Request $request)
    {
        $request->validate([
            'username' => ['required', 'string', 'max:255'],
            'email' => ['required', 'string', 'lowercase', 'email', 'max:255', 'unique:' . User::class],
            'password' => ['required', 'confirmed', Rules\Password::defaults()],
        ]);

        $user = User::create([
            'username' => $request->username,
            'email' => $request->email,
            'password' => Hash::make($request->string('password')),
            'profile_incomplete' => true,
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
                $user->banned = true;
                $user->suspended_until = null; // Clear any suspension
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
        $user = User::find($id);

        if ($user) {
            $user->banned = false;
            $user->suspended_until = null; // Remove any suspension
            $user->save();

            return response()->json(['message' => 'User has been unbanned or unsuspended.']);
        }

        return response()->json(['message' => 'User not found.'], 404);
    }
}

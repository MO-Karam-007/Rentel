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
}

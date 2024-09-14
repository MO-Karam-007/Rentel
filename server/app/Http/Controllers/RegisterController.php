<?php

namespace App\Http\Controllers;

use App\Models\User;
use COM;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Validator;
use Laravel\Socialite\Facades\Socialite;

use Illuminate\Support\Str;

class RegisterController extends BaseController
{
    // Done
    public function register(Request $request): JsonResponse
    {
        //  Add validation to the body 
        $validator = Validator::make($request->all(), [
            'username' => 'required|string|unique:users',
            'email' => 'required|email|unique:users',
            'password' => 'required|min:8|confirmed'
        ]);
        // Check if there any validation failures
        if ($validator->fails()) {
            return $this->sendError('validation failed', $validator->errors());
        }

        // Store the validatated data
        $data = $request->all();
        $data['password'] = bcrypt($data['password']);
        $user = User::create($data);

        $success['token'] =  $user->createToken($request->username)->plainTextToken;

        return $this->sendResponse($success, 'User registration successful');
    }




    public function completeRegister() {}
    // Login


    public function login(Request $request): JsonResponse
    {

        $request->validate([
            'email' => 'email|required|exists:users',
            'password' => 'required'
        ]);

        $user = User::where('email', $request->email)->first();

        if (!$user || !Hash::check($request->password, $user->password)) {
            return $this->sendError('Unauthorised', ['Wrong Credentials'], 401);
        }

        // if (Auth::attempt(['email' => $request->email, 'passwrod' => $request->password])) {

        //     $user = Auth::user();
        $success['token'] =  $user->createToken($user->username)->plainTextToken;
        return $this->sendResponse($success, 'User login successful');
        // } else {

        // }
    }


    public function logout(Request $request)
    {

        // $user = $request->user()->tokens()->delete();
        if (!$request->user()->tokens()->delete()) {
            $this->sendError('No user to log out', 403);
        }
        $request->user()->tokens()->delete();
        return response()->json(['message' => 'User successfully logged out'], 200);
    }
    // Social redirects X & Goole
    public function xRedirect()
    {
        return Socialite::driver('twitter')->redirect();
    }

    public function googleRedirect()
    {
        return Socialite::driver('google')->stateless()->redirect();
    }

    public function xCallback()
    {
        $user = Socialite::driver('twitter')->user();

        dd($user);
        // $user->token
    }
    public function googleCallback()
    {

        $googleUser = Socialite::driver('google')->stateless()->user();
        // dump($googleUser);
        try {
            // dump('hello');

            dump($googleUser->getEmail());
            $user = User::firstOrCreate(
                ['email' => $googleUser->getEmail()],
                [
                    'first_name' => $googleUser->user['given_name'] ?? null,
                    'last_name' => $googleUser->user['family_name'] ?? null,
                    'username' => $googleUser->getNickname() ?: $googleUser->getEmail(),
                    'email' => $googleUser->getEmail(),
                    'profile_picture' => $googleUser->getAvatar(),
                    'google_id' => $googleUser->getId(),
                    'password' => Hash::make(Str::random(24))

                ]
            );

            Auth::login($user);

            return redirect()->intended('/');
        } catch (\Exception $e) {
            dump($e);
            // return redirect('/oauth/google/redirect')->with('error', 'Failed to login with Google');
        }
    }
}



// 'first_name' => 'string',
// 'last_name' => 'string',
// 'username' => 'required|string',
// 'email' => 'required|string',
// 'phone' => 'string',
// 'address' => 'string',
// 'profile_picture' => 'string',
// 'identification_scan' => 'required|string',
// 'password' => 'required',
// 'password_confirmation' => 'required|same:password',
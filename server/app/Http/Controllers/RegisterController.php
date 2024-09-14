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

class RegisterController extends BaseController
{
    //
    public function register(Request $request): JsonResponse
    {

        //  Add validation to the body 
        $validator = Validator::make($request->all(), [
            'first_name' => 'required|string',
            'last_name' => 'required|string',
            'username' => 'required|string',
            'email' => 'required|string',
            'phone' => 'required|string',
            'address' => 'required|string',
            'profile_picture' => 'required|string',
            'identification_scan' => 'required|string',
            'password' => 'required',
            'password_confirmation' => 'required|same:password',
        ]);
        // Check if there any validation failures
        if ($validator->fails()) {
            return $this->sendError('validation failed', $validator->errors());
        }

        // Store the validatated data
        $data = $request->all();
        $data['password'] = bcrypt($data['password']);
        $user = User::create($data);

        $success['token'] =  $user->createToken('mk')->plainTextToken;
        $success['name'] =  $user->first_name . ' ' . $user->last_name;


        return $this->sendResponse($success, 'User registration successful');
    }

    public function login(Request $request): JsonResponse
    {

        $request->validate([
            'email' => 'string|required',
            'password' => 'string|required'
        ]);

        $user = User::where('email', $request->email)->first();

        if (!$user || !Hash::check($request->password, $user->password)) {
            return $this->sendError('Unauthorised', ['Wrong Credentials'], 401);
        }

        // if (Auth::attempt(['email' => $request->email, 'passwrod' => $request->password])) {

        //     $user = Auth::user();
        $success['token'] =  $user->createToken('mk')->plainTextToken;
        $success['name'] =  $user->first_name . ' ' . $user->last_name;
        return $this->sendResponse($success, 'User login successful');
        // } else {

        // }
    }
    // Social redirects X & Goole
    public function xRedirect()
    {
        return Socialite::driver('twitter')->redirect();
    }

    public function googleRedirect()
    {
        return Socialite::driver('google')->redirect();
    }

    public function xCallback()
    {
        $user = Socialite::driver('twitter')->user();

        dd($user);
        // $user->token
    }
    public function googleCallback()
    {
        $user = Socialite::driver('google')->user();

        dd($user);
        // $user->token
    }
}

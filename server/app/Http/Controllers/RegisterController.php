<?php

namespace App\Http\Controllers;

use App\Models\User;
use COM;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Validator;

class RegisterController extends BaseController
{
    //
    public function register(Request $request): JsonResponse
    {

        //  Add validation to the body 
        $validator = Validator::make($request->all(), [
            'first_name' => "required",
            'last_name' => "required",
            'username' => "required",
            'email' => "required",
            'address' => "required",
            'profile_picture' => "required",
            'identification_scan' => "required",
            'password' => "required",
            'c_password' => "required|same:password",
        ]);
        // Check if there any validation failures
        if ($validator->fails()) {
            return $this->sendError('validation failed', $validator->errors());
        }

        // Store the validatated data
        $data = $request->all();
        $data['password'] = bcrypt($data['password']);
        $user = User::create($data);

        $success['token'] =  $user->createToken('MyApp')->plainTextToken;
        $success['name'] =  $user->first_name . ' ' . $user->last_name;


        return $this->sendResponse($success, 'User registration successful');
    }

    public function login(Request $request): JsonResponse
    {


        if (Auth::attempt(['email' => $request->email, 'passwrod' => $request->password])) {

            $user = Auth::user();
            $success['token'] =  $user->createToken('MyApp')->plainTextToken;
            $success['name'] =  $user->first_name . ' ' . $user->last_name;
            return $this->sendResponse($success, 'User login successful');
        } else {

            return $this->sendError('Unauthorised', ['Unauthorised  '], 401);
        }
    }
}

<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\BaseController;
use App\Http\Controllers\Controller;
use App\Http\Requests\Auth\LoginRequest;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Http\Response;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;

class AuthenticatedSessionController extends Controller
{
    /**
     * Handle an incoming authentication request.
     */
    public function store(LoginRequest $request)
    {
        // Token-based authentication
        // Session-based authentication

        $user = User::where('email', $request->email)->first();

        if (!$user || !Hash::check($request->password, $user->password)) {
            return response()->json(['message' => 'Invalid credentials'], 401);
        }

        $user->tokens()->delete();

        // $request->authenticate();
        // $request->dd();

        $token = $user->createToken('api-token')->plainTextToken;

        // $request->session()->regenerate();
        // dd("4");

        return response()->json(['token' => $token]);
        // return $this->sendResponse(['token' => $token], 'User logged in successfully');
    }

    /**
     * Destroy an authenticated session.
     */
    public function destroy(Request $request)
    {
        return $request->user()->currentAccessToken()->delete();
    }
}

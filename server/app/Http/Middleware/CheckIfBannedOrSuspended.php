<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;

class CheckIfBannedOrSuspended
{
    /**
     * Handle an incoming request.
     *
     * @param  \Closure(\Illuminate\Http\Request): (\Symfony\Component\HttpFoundation\Response)  $next
     */
    public function handle(Request $request, Closure $next): Response
    {
        $user = Auth::user(); // Get the authenticated user

        // Check if the user is banned
        if ($user && $user->banned) {
            return response()->json(['message' => 'Your account is permanently banned.'], 403);
        }

        // Check if the user is suspended and if the suspension is still active
        if ($user && $user->isSuspended()) {
            $suspensionEnds = $user->suspended_until->diffForHumans();
            return response()->json(['message' => "Your account is suspended until {$suspensionEnds}."], 403);
        }

        // Allow the request to proceed if the user is not banned or suspended
        return $next($request);
    }
}

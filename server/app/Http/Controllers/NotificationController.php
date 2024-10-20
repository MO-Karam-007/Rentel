<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class NotificationController extends Controller
{
    public function index(Request $request)
    {
        $user = $request->user();  // Get the authenticated user

        // Retrieve unread notifications
        $notifications = $user->unreadNotifications;

        return response()->json($notifications);
    }

    public function count()
{
    $user = Auth::user();

    if (!$user) {
        return response()->json(['error' => 'User not authenticated'], 401);
    }

    // Count the notifications for the authenticated user
    $count = $user->unreadNotifications->count();

    return response()->json(['count' => $count]);
}

public function markAsRead($id)
{
    $user = Auth::user();

    if (!$user) {
        return response()->json(['error' => 'User not authenticated'], 401);
    }

    $notification = $user->notifications()->find($id);

    if (!$notification) {
        return response()->json(['error' => 'Notification not found'], 404);
    }

    // Mark the notification as read
    $notification->markAsRead();

    return response()->json(['message' => 'Notification marked as read']);
}

}

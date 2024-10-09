<?php

namespace App\Http\Controllers;

use App\Events\MessageSent;
use App\Models\Conversation;
use Illuminate\Http\Request;
use Illuminate\Routing\Controllers\Middleware;

class PusherController extends Controller
{
    public static function middleware()
    {
        return [
            new Middleware('auth:sanctum', except: ['index', 'show'])
        ];
    }
    public function store(Request $request)
    {
        $message = Conversation::create([
            'user_id' => auth()->id(),
            'message' => $request->message,
        ]);

        broadcast(new MessageSent($message))->toOthers();

        return response()->json($message);
    }
}

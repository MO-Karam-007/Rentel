<?php

namespace App\Http\Controllers;

use App\Events\MessageSent;
use App\Models\Conversation;
use App\Models\Message;
use Illuminate\Http\Request;

class MessageController extends Controller
{
    //
    // Get all conversations for a user
    public function getConversations(Request $request)
    {
        $user = auth()->user();
        $conversations = Conversation::where('user1_id', $user->id)
            ->orWhere('user2_id', $user->id)
            ->with('messages')
            ->get();
        return response()->json($conversations);
    }

    // Get messages for a specific conversation
    public function getMessages($conversation_id)
    {
        $messages = Message::where('conversation_id', $conversation_id)->get();
        return response()->json($messages);
    }

    // Send a new message
    public function sendMessage(Request $request)
    {
        $message = Message::create([
            'conversation_id' => $request->conversation_id,
            'sender_id' => auth()->id(),
            'content' => $request->content,
        ]);
        broadcast(new MessageSent($message))->toOthers(); // Broadcast the event


        return response()->json($message);
    }
}

<?php

namespace App\Http\Controllers;

use App\Models\Conversation;
use Illuminate\Http\Request;

class PusherController extends Controller
{

    public function store()
    {
       
        $conversation = Conversation::create([
            'message' => request('message'),
            'user' => $random_usernames[array_rand($random_usernames)],
        ]);
    }
}

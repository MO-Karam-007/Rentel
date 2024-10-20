<?php

namespace App\Notifications;

use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Notifications\Messages\MailMessage;
use Illuminate\Notifications\Notification;
use App\Models\Post;
use App\Models\User;
class offeritem extends Notification
{
    use Queueable;

    public $user;
    public $post;
    public $itemId;
    public function __construct(User $user, Post $post , $itemId)
    {
        $this->user = $user;
        $this->post = $post;
        $this->itemId = $itemId;
    }

    // Define the notification delivery channels
    public function via($notifiable)
    {
        return ['database']; // Only use 'database' channel for now
    }

    // Define the data to be stored in the notification table
    public function toDatabase($notifiable)
    {
        return [
            'offer_made_by' => $this->user->username,     // The name of the user who made the offer
            'offer_made_by_id' => $this->user->id,    // The ID of the user who made the offer
            'post_title' => $this->post->title,       // Title of the post the offer is made on
            'post_id' => $this->post->id, 
            'item_id' => $this->itemId,            // ID of the post
            'message' => $this->user->username . ' offer an item for your post ' . $this->post->title 
        ];
    }
}

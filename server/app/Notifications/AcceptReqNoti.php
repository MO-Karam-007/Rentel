<?php

namespace App\Notifications;

use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Notifications\Messages\MailMessage;
use Illuminate\Notifications\Notification;
use App\Models\User;
use App\Models\Item;
use App\Models\Rental;


class AcceptReqNoti extends Notification
{
    use Queueable;

    public $owner;
    public $rentel;
    public $item;
    /**
     * Create a new notification instance.
     */
    public function __construct(User $owner, Rental $rentel , Item $item)
    {
        $this->owner = $owner;
        $this->rentel = $rentel;
        $this->item = $item;
    }

    /**
     * Get the notification's delivery channels.
     *
     * @return array<int, string>
     */
    public function via(object $notifiable): array
    {
        return ['database'];
    }

    /**
     * Get the mail representation of the notification.
     */
    public function toDatabase($notifiable)
    {
        return [
            'item_owner' => $this->owner ,    // The name of the user who made the offer
            'item' => $this->item   ,    // Title of the post the offer is made on
            'message' => $this->owner->username . ' accepted your request to rent ' . $this->item->name . ".\n" .
            'Meet him at ' . $this->owner->address . " by " . $this->rentel->start_date . ".\n" .
            'Call him to get in touch: ' . $this->owner->phone

        ];
    }


    /**
     * Get the array representation of the notification.
     *
     * @return array<string, mixed>
     */
    public function toArray(object $notifiable): array
    {
        return [
            //
        ];
    }
}

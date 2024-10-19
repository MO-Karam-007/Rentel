<?php

namespace App\Notifications;

use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Notifications\Messages\MailMessage;
use Illuminate\Notifications\Notification;
use App\Models\Rental;

class rentemail extends Notification
{
    use Queueable;
    protected $rental;
    /**
     * Create a new notification instance.
     */
    public function __construct(Rental $rental)
    {
        $this->rental = $rental;
    }

    /**
     * Get the notification's delivery channels.
     *
     * @return array<int, string>
     */
    public function via(object $notifiable): array
    {
        return ['mail'];
    }

    /**
     * Get the mail representation of the notification.
     */
    public function toMail(object $notifiable): MailMessage
    {
        return (new MailMessage)
                    ->subject('Rental Approved')
                    ->greeting('Hello!')
                    ->line('Your rental request has been approved.')
                    ->line('Rental Details:')
                    // ->line('Item: ' . $this->rental->item->name)
                    // ->line('Owner: ' . $this->rental->item->owner->name) // Adjust according to your relationship
                    // ->line('Rental Price: ' . $this->rental->rental_price)
                    // ->line('Start Date: ' . $this->rental->start_date)
                    // ->line('End Date: ' . $this->rental->end_date)
                    // ->action('View Rental', url('/rentals/' . $this->rental->id)) // Update this URL as needed
                    ->line('Thank you for using our application!');
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

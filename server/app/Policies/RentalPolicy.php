<?php

namespace App\Policies;

use App\Models\Rental;
use App\Models\User;
use Illuminate\Auth\Access\Response;

class RentalPolicy
{
    public function modify(User $user, Rental $rental): Response
    {
        return $user->id == $rental->item->lender_id ?
            Response::allow() :
            Response::deny('You are not allowed to modify this rental');
    }
}

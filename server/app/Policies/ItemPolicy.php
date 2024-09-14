<?php

namespace App\Policies;

use App\Models\Item;
use App\Models\User;
use Illuminate\Auth\Access\Response;

class ItemPolicy
{

    public function modify(User $user, Item $item): Response
    {
        return $user->id === $item->lender_id ?
            Response::allow() :
            Response::deny('You are not allowed to modify this item');
    }
}

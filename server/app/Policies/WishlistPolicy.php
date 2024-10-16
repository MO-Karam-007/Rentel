<?php

namespace App\Policies;

use App\Models\User;
use App\Models\Wishlist;
use Illuminate\Auth\Access\Response;

class WishlistPolicy
{

    public function modify(User $user, Wishlist $wishlist): bool
    {
        //
    }
}

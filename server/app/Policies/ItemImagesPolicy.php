<?php

namespace App\Policies;

use App\Models\Item_image;
use App\Models\User;
use Illuminate\Auth\Access\Response;

class ItemImagesPolicy
{
    public function modify(User $user, Item_image $itemImage): bool
    {
        //
    }
}

<?php

namespace App\Policies;

use App\Models\Item_specification;
use App\Models\User;
use Illuminate\Auth\Access\Response;

class ItemSpecificationsPolicy
{
    public function modify(User $user, Item_specification $itemSpecification): bool
    {
        //
    }
}

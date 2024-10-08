<?php

namespace App\Policies;

use App\Models\User;
use Illuminate\Auth\Access\Response;

class UserPolicy
{

    /**
     * Determine whether the user can permanently delete the model.
     */

    public function update(User $currentUser, User $user)
    {
        return $currentUser->id === $user->id;
    }
}

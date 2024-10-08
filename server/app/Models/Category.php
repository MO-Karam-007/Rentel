<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Category extends Model
{
    protected $fillable = ['category'];

    // Assuming Category may have many items
    public function items()
    {
        return $this->hasMany(Item::class); // If items table exists
    }
}

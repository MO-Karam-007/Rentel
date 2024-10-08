<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Tag extends Model
{
    protected $fillable = ['tag_name'];

    // Assuming Tags can belong to many items (many-to-many relationship)
    public function items()
    {
        return $this->belongsToMany(Item::class); // Pivot table 'item_tag' needed
    }
}

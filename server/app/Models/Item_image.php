<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Item_image extends Model
{
    use HasFactory;

    protected $fillable = ['item_id', 'image_path'];

    public function item()
    {
        return $this->belongsTo(Item::class);
    }
}

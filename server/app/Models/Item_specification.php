<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Item_specification extends Model
{
    use HasFactory;
    protected $fillable = ['item_id', 'spec_name', 'spec_value'];

    public function item()
    {
        return $this->belongsTo(Item::class);
    }
}

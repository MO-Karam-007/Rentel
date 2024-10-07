<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Item extends Model
{
    use HasFactory;
    protected $fillable = [
        'name',
        'description',
        'item_image',
        'available',
        'status',
        'price',
        'duration',
        'lender_id',
    ];

    public function user()
    {
        return $this->belongsTo(User::class, 'lender_id');
    }
    public function images()
    {
        return $this->hasMany(ItemImage::class);
    }
    public function specifications()
{
    return $this->hasMany(ItemSpecification::class);
}

}

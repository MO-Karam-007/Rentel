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
        'category_id',
        'tag'
    ];

    public function user()
    {
        return $this->belongsTo(User::class, 'lender_id');
    }
    public function images()
    {
        return $this->hasMany(Item_image::class);
    }
    public function specifications()
{
    return $this->hasMany(Item_specification::class);
}
public function category()
{
    return $this->belongsTo(Category::class);
}

}

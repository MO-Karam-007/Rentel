<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Category extends Model
{
    use HasFactory;
    protected $fillable = ['name','category'];





    // Assuming Category may have many items
    public function items()
{
    return $this->hasMany(Item::class);
}

}

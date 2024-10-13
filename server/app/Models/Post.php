<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Post extends Model
{
    use HasFactory;
    protected $fillable = [
        'creator_id',
        'title',
        'description',
    ];

    public function creator()
    {
        return $this->belongsTo(User::class, 'creator_id');
    }
}

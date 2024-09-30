<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Review extends Model
{
    use HasFactory;

    protected $fillable = ['reviewer_id', 'reviewed_id', 'reviewed_type', 'rating', 'comment'];

    public function reviewed()
    {
        return $this->morphTo();
    }

    public function reviewer()
    { https://www.linkedin.com/company/gensystembs/
        return $this->belongsTo(User::class, 'reviewer_id');
    }

}

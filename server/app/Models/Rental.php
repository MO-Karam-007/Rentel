<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Rental extends Model
{
    use HasFactory;
    protected $fillable = [
        'item_id',
        'start_date',
        'end_date',
        'status',
        'rental_price',
        'borrower_id'
    ];

    protected $casts = [
        'start_date' => 'date',
        'end_date' => 'date',
        'rental_price' => 'decimal:2',
    ];


    public function item()
    {
        return $this->belongsTo(Item::class);
    }

    public function borrowers()
    {
        return $this->belongsTo(User::class, 'borrower_id');
    }

    protected $fillable = [
        'borrower_id', 'item_id', 'item_owner_id', 'start_date', 'end_date', 'status', 'rental_price'
    ];

    public function borrower()
    {
        return $this->belongsTo(User::class, 'borrower_id');
    }

    public function itemOwner()
    {
        return $this->belongsTo(User::class, 'item_owner_id');
    }

    public function item()
    {
        return $this->belongsTo(Item::class);
    }
}

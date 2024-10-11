<?php

namespace App\Models;

use Clickbar\Magellan\Database\Eloquent\HasPostgisColumns;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Item extends Model
{
    use HasFactory;
    use HasPostgisColumns;

    // HasPostgisColumns    // protected array $postgisColumns = [
    //     'location' => [
    //         'type' => 'geometry',
    //         'srid' => 4326,
    //     ],
    // ];

    // use SpatialTrait;

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
        'tag',
        'location',
        'latitude',
        "specifications",

        'longitude'
    ];
    // protected $casts = [
    // 'location' => 'magellanPoint', // Cast the location to point type if necessary
    // ];
    protected array $postgisColumns = [
        'location' => [
            'type' => 'geometry',
            'srid' => 4326,
        ],
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

    public function getImageUrlAttribute()
    {
        return asset('storage/images/' . $this->images->first()->image_path);
    }
}

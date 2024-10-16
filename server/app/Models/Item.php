<?php

namespace App\Models;

use Clickbar\Magellan\Database\Eloquent\HasPostgisColumns;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Malhal\Geographical\Geographical;

class Item extends Model
{
    use HasFactory;
    use HasPostgisColumns;
    use Geographical;


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
        "specifications",
        'item_images',
        'longitude',
        'latitude',
        'startDate',
        'endDate',
        'location'
    ];
    // protected $casts = [
    // 'location' => 'magellanPoint', // Cast the location to point type if necessary
    // ];

    // protected $casts = [
    // 'location' => 'Point',
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

    public function users()
    {
        return $this->belongsToMany(User::class, 'favorites')->withTimestamps();
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


    private function getLocationBasedTrials($longitude, $latitude, $radius = 5)
    {
        // Convert radius from miles to meters
        $radiusInMeters = $radius * 1609.34;

        // Calculate the center sphere coordinates
        $centerSphere = [
            $longitude,
            $latitude,
            $radiusInMeters / 6378137 // Convert radius to radians
        ];

        $closeTrials = Item::with(['category', 'images', 'specifications'])
            ->select('items.*')
            ->selectRaw("ST_Distance_Sphere(point(longitude, latitude), point(?, ?)) AS sphere_distance", [
                $longitude,
                $latitude
            ])
            ->where('location', $centerSphere)
            ->orderBy('sphere_distance')
            ->get();

        return $closeTrials;
    }
}

<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Str;
use Illuminate\Database\Eloquent\Casts\Attribute;


class Products extends Model
{
    use HasFactory;

    protected $fillable = [
        'name',
        'description',
        'sku',
        'slug',
        'price',
        'compare_price',
        'quantity',
        'stock_status',
        'category_id',
        'main_image',
        'gallery_images',
        'meta_title',
        'meta_description',
        'tags',
        'is_active',
        'is_featured',
    ];

    protected $casts = [
        'gallery_images' => 'array',
        'tags' => 'array',
        'is_active' => 'boolean',
        'is_featured' => 'boolean',
    ];

    protected $appends = ['is_on_sale', 'discount_percentage'];

    protected $with = ['category:id,slug,icon,name,description'];

    public function setNameAttribute($value)
    {
        $this->attributes['name'] = $value;
        $this->attributes['slug'] = Str::slug($value);
    }

    protected function discountPercentage(): Attribute
    {
        return Attribute::make(
            get: fn($value, $attributes) =>
            $attributes['compare_price']
                ? round((($attributes['compare_price'] - $attributes['price']) / $attributes['compare_price']) * 100, 2)
                : null
        );
    }

    public function isOnSale(): Attribute
    {
        return Attribute::make(
            get: fn($value, $attributes) => $attributes['compare_price'] !== null,
        );
    }

    public function category()
    {
        return $this->belongsTo(Category::class);
    }
}

<?php

namespace App\Models;

use App\Enums\ProductStatus;
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
        'status',
        'category_id',
        'main_image',
        'gallery_images',
        'meta_title',
        'meta_description',
        'tags',
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

    /**
     * Scope a query to filter products based on the given criteria.
     */
    public function scopeFilter($query, $filter)
    {
        return $query
            ->when(isset($filter['filter']), function ($query) use ($filter) {
                $query->where('name', 'like', '%' . $filter['filter'] . '%');
            })
            ->when(isset($filter['category']), function ($query) use ($filter) {
                $query->where('category_id', $filter['category']);
            })
            ->when(isset($filter['min_price']) && isset($filter['max_price']), function ($query) use ($filter) {
                $query->whereBetween('price', [$filter['min_price'], $filter['max_price']]);
            })
            ->when(isset($filter['is_featured']), function ($query) {
                $query->where('is_featured', true);
            })
            ->when(isset($filter['is_on_sale']), function ($query) {
                $query->whereNotNull('compare_price');
            })
            ->when(isset($filter['status']), function ($query) use ($filter) {
                $query->where('status', $filter['status']);
            });
    }

    public function category()
    {
        return $this->belongsTo(Category::class);
    }
}

<?php

namespace App\Models;

use App\Enums\ProductStatus;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Str;
use Illuminate\Database\Eloquent\Casts\Attribute;


class Product extends Model
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
        'compare_price' => 'double',
        'price' => 'double',
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
            $attributes['compare_price'] > 0
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
                $query->whereFullText(['name', 'description'], $filter['filter']);
            })
            ->when(isset($filter['category_id']), function ($query) use ($filter) {
                $query->where('category_id', $filter['category_id']);
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
                $query->whereIn('status', $filter['status']);
            });
    }

    public function scopeForPublic($query)
    {
        return $query->whereIn('status', [ProductStatus::ACTIVE, ProductStatus::OUT_OF_STOCK]);
    }

    public function scopeFilterByRoute($query, bool $isAdminRoute)
    {
        return $query->when(!$isAdminRoute, fn($q) => $q->forPublic());
    }

    public function category()
    {
        return $this->belongsTo(Category::class);
    }
}

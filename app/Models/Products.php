<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Str;


class Products extends Model
{
    use HasFactory;

    protected $fillable = [
        'name',
        'description',
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

    public function setNameAttribute($value)
    {
        $this->attributes['name'] = $value;
        $this->attributes['slug'] = Str::slug($value);
    }

    public function category()
    {
        return $this->belongsTo(Category::class);
    }
}

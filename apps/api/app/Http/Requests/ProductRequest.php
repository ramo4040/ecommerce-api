<?php

namespace App\Http\Requests;

use App\Enums\ProductStatus;
use App\Enums\UploadImageMode;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class ProductRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        $productId = $this->route('product') ?? $this->route('id');

        return [
            'name' => 'required|string|max:255|unique:products,name,' . $productId,
            'description' => 'nullable|string|max:1000',
            'sku' => 'required|string|max:255|unique:products,sku,' . $productId,
            'price' => 'required|numeric',
            'compare_price' => 'nullable|numeric|gt:price',
            'quantity' => 'required|integer|min:0',
            'status' => ['required', Rule::enum(ProductStatus::class)],
            'category_id' => 'required|exists:categories,id',

            'main_image' => 'nullable|image|mimes:jpeg,png,jpg,svg|max:2048',
            'main_image_mode' => ['required', Rule::enum(UploadImageMode::class)],
            'gallery_images' => 'nullable|array|max:10',
            'gallery_images.*' => 'image|mimes:jpeg,png,jpg,svg|max:2048',
            'gallery_images_modes' => 'required|array',
            'gallery_images_modes.*.mode' => ['required', Rule::enum(UploadImageMode::class)],
            'gallery_images_modes.*.id' => 'string',

            'meta_title' => 'nullable|string|max:255',
            'meta_description' => 'nullable|string|max:500',
            'tags' => 'nullable|array|max:20',
            'tags.*' => 'string|max:50',
            'is_featured' => 'boolean',
        ];
    }

    public function attributes(): array
    {
        return [
            'sku' => 'SKU',
            'category_id' => 'category',
            'main_image' => 'main image',
            'gallery_images' => 'gallery images',
            'gallery_images.*' => 'gallery image',
            'meta_title' => 'meta title',
            'meta_description' => 'meta description',
            'status' => 'product status',
            'is_featured' => 'featured status',
        ];
    }

    public function messages(): array
    {
        return [
            'compare_price.gt' => 'The compare price must be greater than the regular price.',
            'gallery_images.max' => 'You can upload a maximum of 10 gallery images.',
            'gallery_images.*.image' => 'Each gallery file must be an image.',
            'gallery_images.*.mimes' => 'Each gallery image must be a file of type: jpeg, png, jpg, svg.',
            'gallery_images.*.max' => 'Each gallery image must not be greater than 2MB.',
            'tags.max' => 'You can add a maximum of 20 tags.',
        ];
    }
}

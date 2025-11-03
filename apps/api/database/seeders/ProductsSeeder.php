<?php

namespace Database\Seeders;

use App\Enums\ProductStatus;
use App\Models\Category;
use Illuminate\Database\Seeder;
use App\Models\Product;
use Illuminate\Support\Facades\File;
use Illuminate\Support\Facades\Http;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Str;

class ProductsSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $jsonPath = database_path('seeders/data/products.json');
        $jsonData = File::get($jsonPath);
        $productsData = json_decode($jsonData, true);

        $products = [];

        foreach ($productsData as $productData) {
            $name = $productData['title'];
            $slug = Str::slug($name);
            $sku = strtoupper(Str::random(8));

            // Download main image
            $mainImage = Http::withoutVerifying()->get($productData['images'][0])->body();
            $mainImagePath = "products/{$sku}.jpg";
            Storage::disk('public')->put($mainImagePath, $mainImage);

            // Download gallery images
            $galleryImages = [];
            foreach (array_slice($productData['images'], 1) as $index => $imageUrl) {
                $image = Http::withoutVerifying()->get($imageUrl)->body();
                $path = "products/{$sku}_{$index}.jpg";
                Storage::disk('public')->put($path, $image);
                $galleryImages[] = $path;
            }

            $products[] = [
                'name' => $name,
                'description' => 'Made from solid oak, this chair showcases the natural beauty of the wood with its smooth grain and warm finish.',
                'slug' => $slug,
                'sku' => $sku,
                'price' => $productData['price'],
                'compare_price' => $productData['compare_price'],
                'quantity' => 50,
                'status' => ProductStatus::ACTIVE->value,
                'category_id' => Category::where('slug', $productData['category'])->first()?->id ?? Category::inRandomOrder()->first()->id,
                'main_image' => $mainImagePath,
                'gallery_images' => json_encode($galleryImages),
                'meta_title' => $name,
                'meta_description' => 'Elevate your dining experience with the ' . $name,
                'tags' => json_encode(fake()->words(6)),
                'is_featured' => fake()->boolean(30),
            ];
        }

        Product::insert($products);
    }
}

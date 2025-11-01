<?php

namespace Database\Seeders;

use App\Models\Category;
use Illuminate\Database\Seeder;
use App\Models\Product;
use Illuminate\Support\Str;

class ProductsSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {

        $products = [];

        for ($i = 0; $i < 50; $i++) {
            $name = fake()->unique()->word();
            $slug = Str::slug($name);
            $sku = strtoupper(Str::random(8));

            $products[] = [
                'name' => $name,
                'description' => 'Made from solid oak, this chair showcases the natural beauty of the wood with its smooth grain and warm finish.',
                'slug' => $slug,
                'sku' => $sku,
                'price' => '299.00',
                'compare_price' => '400.00',
                'quantity' => 50,
                'status' => 'active',
                'category_id' => Category::inRandomOrder()->first()->id,
                'main_image' => 'products/p1.jpg',
                'gallery_images' => json_encode([
                    'products/p3.jpg',
                    'products/p2.jpg'
                ]),
                'meta_title' => null,
                'meta_description' => 'Elevate your dining experience with the Nordic Dining Chair, a perfect blend of timeless design and modern craftsmanship. Made from solid oak, this chair showcases the natural beauty of the wood with its smooth grain and warm finish. The ergonomic design ensures comfort for long meals and gatherings, while its minimalist silhouette complements any interior style.',
                'tags' => json_encode([
                    'smartphone',
                    'iphone',
                    'apple',
                    'mobile',
                    'electronics',
                    'premium'
                ]),
                'is_featured' => false,
            ];
        }

        Product::insert($products);
    }
}

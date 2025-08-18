<?php

namespace Database\Factories;

use App\Models\Category;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Products>
 */
class ProductsFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'name' => $this->faker->words(3, true),
            'description' => $this->faker->sentence(12),
            'sku' => strtoupper($this->faker->bothify('???-#####')),
            'price' => $this->faker->randomFloat(2, 5, 500),
            'compare_price' => $this->faker->optional(0.3)->randomFloat(2, 6, 600),
            'quantity' => $this->faker->numberBetween(0, 200),
            'stock_status' => $this->faker->randomElement(['in_stock', 'out_of_stock']),
            'category_id' => Category::all()->random()->id,
            'main_image' => null,
            'gallery_images' => null,
            'meta_title' => null,
            'meta_description' => null,
            'tags' => null,
            'is_active' => $this->faker->boolean(90),
            'is_featured' => $this->faker->boolean(15),
        ];
    }
}

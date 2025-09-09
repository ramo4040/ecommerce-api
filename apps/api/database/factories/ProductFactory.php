<?php

namespace Database\Factories;

use App\Enums\ProductStatus;
use App\Models\Category;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Products>
 */
class ProductFactory extends Factory
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
            'status' => $this->faker->randomElement(ProductStatus::values()),
            'category_id' => Category::all()->random()->id,
            'main_image' => null,
            'gallery_images' => null,
            'meta_title' => null,
            'meta_description' => null,
            'tags' => null,
            'is_featured' => $this->faker->boolean(15),
        ];
    }
}

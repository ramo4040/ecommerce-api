<?php

namespace Database\Factories;

use App\Models\Category;
use Illuminate\Database\Eloquent\Factories\Factory;

class CategoryFactory extends Factory
{
    public function definition(): array
    {
        $categories = Category::all();

        return [
            'name' => $this->faker->unique()->word(),
            'description' => $this->faker->sentence(8),
            'icon' => null,
            'image' => null,
            'meta_title' => null,
            'meta_description' => null,
            'sort_order' => $this->faker->numberBetween(0, 100),
            'is_active' => $this->faker->boolean(90),
            'is_featured' => $this->faker->boolean(20),
        ];
    }
}

<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Category;

class CategorySeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $categories = [
            [
                'name' => 'Wood',
                'slug' => 'wood',
                'description' => 'Our Wood Collection celebrates the natural beauty of wood.',
                'icon' => null,
                'image' => 'categories/wood.jpg',
                'meta_title' => 'Home & Kitchen Products',
                'meta_description' => 'Find the best home and kitchen',
                'sort_order' => 0,
                'is_active' => true,
                'is_featured' => false,
            ],
            [
                'name' => 'Dark',
                'slug' => 'dark',
                'description' => 'Refined finishes bring an air of sophistication and drama to any room.',
                'icon' => null,
                'image' => 'categories/dark.jpg',
                'meta_title' => 'Home & Kitchen Products',
                'meta_description' => 'Find the best home and kitchen',
                'sort_order' => 0,
                'is_active' => true,
                'is_featured' => false,
            ],
            [
                'name' => 'Modern',
                'slug' => 'modern',
                'description' => 'The Modern Collection brings together graceful lines and luxurious finishes.',
                'icon' => null,
                'image' => 'categories/modern.jpg',
                'meta_title' => 'Home & Kitchen Products',
                'meta_description' => 'Find the best home and kitchen',
                'sort_order' => 0,
                'is_active' => true,
                'is_featured' => false,
            ],
        ];

        Category::insert($categories);
    }
}

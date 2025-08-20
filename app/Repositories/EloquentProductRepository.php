<?php

namespace App\Repositories;

use App\Models\Product;
use Illuminate\Database\Eloquent\Collection;

interface ProductsRepository
{
    public function index(array $filter): Collection;
    public function find(int $id): ?Product;
    public function create(array $data): Product;
    public function update(int $id, array $data): ?Product;
    public function delete(int $id): bool;
}

class EloquentProductRepository implements ProductsRepository
{
    public function index(array $filter): Collection
    {
        return Product::filter($filter)->get();
    }

    public function find(int $id): ?Product
    {
        return Product::findOrFail($id);
    }

    public function create(array $data): Product
    {
        return Product::create($data);
    }

    public function update(int $id, array $data): ?Product
    {
        $product = Product::findOrFail($id);
        $product->update($data);
        return $product;
    }

    public function delete(int $id): bool
    {
        return Product::destroy($id) > 0;
    }
}

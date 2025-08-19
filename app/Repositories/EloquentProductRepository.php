<?php

namespace App\Repositories;

use App\Models\Products;
use Illuminate\Database\Eloquent\Collection;

interface ProductsRepository
{
    public function index(array $filter): Collection;
    public function find(int $id): ?Products;
    public function create(array $data): Products;
    public function update(int $id, array $data): ?Products;
    public function delete(int $id): bool;
}

class EloquentProductRepository implements ProductsRepository
{
    public function index(array $filter): Collection
    {
        return Products::filter($filter)->get();
    }

    public function find(int $id): ?Products
    {
        return Products::findOrFail($id);
    }

    public function create(array $data): Products
    {
        return Products::create($data);
    }

    public function update(int $id, array $data): ?Products
    {
        $product = Products::findOrFail($id);
        $product->update($data);
        return $product;
    }

    public function delete(int $id): bool
    {
        return Products::destroy($id) > 0;
    }
}

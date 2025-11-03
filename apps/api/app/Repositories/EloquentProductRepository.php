<?php

namespace App\Repositories;

use App\Models\Product;
use Illuminate\Contracts\Pagination\LengthAwarePaginator;
use Illuminate\Database\Eloquent\Collection;

interface ProductRepository
{
    public function index(array $filter): LengthAwarePaginator|Collection;
    public function findBy(string $column, mixed $value, bool $isAdminRoute): ?Product;
    public function create(array $data): Product;
    public function update(int $id, array $data): ?Product;
    public function delete(int $id): bool;
}

class EloquentProductRepository implements ProductRepository
{
    public function index(array $filter): LengthAwarePaginator|Collection
    {
        $query = Product::filter($filter);
        return isset($filter['page']) ? $query->paginate($filter["limit"]) : $query->get();
    }

    public function findBy(string $column, mixed $value, bool $isAdminRoute): ?Product
    {
        return Product::where($column, $value)
            ->filterByRoute($isAdminRoute)
            ->firstOrFail();
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

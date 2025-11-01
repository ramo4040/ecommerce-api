<?php

namespace App\Repositories;

use App\Enums\ProductStatus;
use App\Models\Product;
use Illuminate\Contracts\Pagination\LengthAwarePaginator;
use Illuminate\Database\Eloquent\Collection;
use Illuminate\Support\Facades\Log;

interface ProductRepository
{
    public function index(array $filter): LengthAwarePaginator|Collection;
    public function find(int $id, bool $isAdminRoute): ?Product;
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

    public function find(int $id, bool $isAdminRoute): ?Product
    {
        return Product::where('id', $id)
            ->when(
                !$isAdminRoute,
                fn($query) =>
                $query->whereIn('status', [ProductStatus::ACTIVE, ProductStatus::OUT_OF_STOCK])
            )
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

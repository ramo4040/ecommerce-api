<?php

namespace App\Services;

use App\Models\Product;
use App\Repositories\ProductRepository;
use Illuminate\Database\Eloquent\Collection;

class ProductService
{
    public function __construct(private ProductRepository $productsRepository) {}

    public function all(array $filter): Collection
    {
        return $this->productsRepository->index($filter);
    }

    public function find(int $id, bool $isAdminRoute): ?Product
    {
        return $this->productsRepository->find($id, $isAdminRoute);
    }

    public function create(array $data): Product
    {
        return $this->productsRepository->create($data);
    }

    public function update(int $id, array $data): ?Product
    {
        return $this->productsRepository->update($id, $data);
    }

    public function delete(int $id): bool
    {
        return $this->productsRepository->delete($id);
    }
}

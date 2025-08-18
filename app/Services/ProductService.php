<?php

namespace App\Services;

use App\Models\Products;
use App\Repositories\ProductsRepository;
use Illuminate\Database\Eloquent\Collection;

class ProductService
{
    public function __construct(private ProductsRepository $productsRepository) {}

    public function all(): Collection
    {
        return $this->productsRepository->index();
    }

    public function find(int $id): ?Products
    {
        return $this->productsRepository->find($id);
    }

    public function create(array $data): Products
    {
        return $this->productsRepository->create($data);
    }

    public function update(int $id, array $data): ?Products
    {
        return $this->productsRepository->update($id, $data);
    }

    public function delete(int $id): bool
    {
        return $this->productsRepository->delete($id);
    }
}

<?php

namespace App\Services;

use App\Repositories\CategoryRepository;

class CategoryService
{
    public function __construct(private CategoryRepository $categoryRepository) {}

    public function findAll()
    {
        return $this->categoryRepository->index();
    }

    public function findById(string $id)
    {
        return $this->categoryRepository->find($id);
    }

    public function create(array $data)
    {
        return $this->categoryRepository->store($data);
    }

    public function update(string $id, array $data)
    {
        return $this->categoryRepository->update($id, $data);
    }

    public function delete(string $id)
    {
        return $this->categoryRepository->delete($id);
    }
}

<?php

namespace App\Repositories;

use App\Models\Category;
use Illuminate\Database\Eloquent\Collection;

interface CategoryRepository
{
    public function index(): Collection;
    public function find(int $id): Category;
    public function store(array $data): Category;
    public function update(int $id, array $data): Category;
    public function delete(int $id): bool;
}

class EloquentCategoryRepository implements CategoryRepository
{

    public function __construct(protected Category $category) {}

    public function index(): Collection
    {
        return $this->category->all();
    }

    public function find(int $id): Category
    {
        return $this->category->findOrFail($id);
    }

    public function store(array $data): Category
    {
        return $this->category->create($data);
    }

    public function update(int $id, array $data): Category
    {
        $category = $this->find($id);
        $category->update($data);
        return $category;
    }

    public function delete(int $id): bool
    {
        $category = $this->category->find($id);

        if (!$category) {
            return false;
        }

        return $category->delete();
    }
}

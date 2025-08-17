<?php

use App\Models\Category;
use Illuminate\Database\Eloquent\Collection;

interface CategoryRepository
{
    public function list(): Collection;
    public function find(int $id): ?Category;
    public function store(array $data): Category;
    public function update(int $id, array $data): bool;
    public function delete(int $id): bool;
}

class EloquentCategoryRepository implements CategoryRepository
{

    public function __construct(protected Category $category) {}

    public function list(): Collection
    {
        return $this->category->all();
    }

    public function find(int $id): ?Category
    {
        return $this->category->find($id);
    }

    public function store(array $data): Category
    {
        return $this->category->create($data);
    }

    public function update(int $id, array $data): bool
    {
        return $this->category->where('id', $id)->update($data) > 0;
    }

    public function delete(int $id): bool
    {
        return $this->category->where('id', $id)->delete() > 0;
    }
}

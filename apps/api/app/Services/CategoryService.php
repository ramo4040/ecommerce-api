<?php

namespace App\Services;

use App\Enums\UploadImageMode;
use App\Models\Category;
use App\Repositories\CategoryRepository;
use Illuminate\Support\Facades\Storage;

class CategoryService
{
    public function __construct(
        private CategoryRepository $categoryRepository,
        private ImageService $imageService
    ) {}

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
        $this->imageService->handle($data, [
            'mode' => $data['image_mode'],
            'key' => 'image',
            'folder' => 'categories',
            'existing' => null,
        ]);
        return $this->categoryRepository->store($data);
    }

    public function update(string $id, array $data)
    {
        $category = $this->categoryRepository->find($id);
        $this->imageService->handle($data, [
            'mode' => $data['image_mode'],
            'key' => 'image',
            'folder' => 'categories',
            'existing' => $category->image,
        ]);
        return $this->categoryRepository->update($id, $data);
    }

    public function delete(string $id)
    {
        return $this->categoryRepository->delete($id);
    }
}

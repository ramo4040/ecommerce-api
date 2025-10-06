<?php

namespace App\Services;

use App\Enums\UploadImageMode;
use App\Models\Category;
use App\Repositories\CategoryRepository;
use Illuminate\Support\Facades\Storage;

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
        $this->saveImage($data, null);
        return $this->categoryRepository->store($data);
    }

    public function update(string $id, array $data)
    {
        $category = $this->categoryRepository->find($id);
        $this->saveImage($data, $category);

        return $this->categoryRepository->update($id, $data);
    }

    public function delete(string $id)
    {
        return $this->categoryRepository->delete($id);
    }

    private function saveImage(array &$data, ?Category $category): void
    {
        $mode = UploadImageMode::from($data['image_mode']);

        switch ($mode) {
            case UploadImageMode::UPLOAD:
                if ($category?->image) {
                    Storage::disk('public')->delete($category->image);
                }
                $data['image'] = $data['image']->store('categories', 'public');
                break;

            case UploadImageMode::CLEAR:
                if ($category?->image) {
                    Storage::disk('public')->delete($category->image);
                }
                $data['image'] = null;
                break;

            case UploadImageMode::KEEP:
                unset($data['image']);
                break;
        }
    }
}

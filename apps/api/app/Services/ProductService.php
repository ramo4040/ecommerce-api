<?php

namespace App\Services;

use App\Models\Product;
use App\Repositories\ProductRepository;
use App\Services\ImageService;
use Illuminate\Contracts\Pagination\LengthAwarePaginator;
use Illuminate\Database\Eloquent\Collection;

class ProductService
{
    public function __construct(
        private ProductRepository $productsRepository,
        private ImageService $imageService
    ) {}

    public function all(array $filter): LengthAwarePaginator|Collection
    {
        return $this->productsRepository->index($filter);
    }

    public function find(int $id, bool $isAdminRoute): ?Product
    {
        return $this->productsRepository->find($id, $isAdminRoute);
    }

    public function create(array $data): Product
    {
        $this->imageService->handle($data, [
            'mode' => $data['main_image_mode'],
            'key' => 'main_image',
            'folder' => 'products',
            'existing' => null,
        ]);

        $this->imageService->uploadMultiple($data, [
            'key' => 'gallery_images',
            'folder' => 'products',
        ]);

        return $this->productsRepository->create($data);
    }

    public function update(int $id, array $data): ?Product
    {
        $product = $this->find($id, true);

        $this->imageService->handle($data, [
            'mode' => $data['main_image_mode'],
            'key' => 'main_image',
            'folder' => 'products',
            'existing' => $product->main_image,
        ]);

        $this->imageService->handleMultiple($data, [
            'modes' => $data['gallery_images_modes'],
            'key' => 'gallery_images',
            'folder' => 'products',
            'existing' => $product->gallery_images,
        ]);

        return $this->productsRepository->update($id, $data);
    }

    public function delete(int $id): bool
    {
        return $this->productsRepository->delete($id);
    }
}

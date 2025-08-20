<?php

namespace App\Services;

use App\Models\WishList;
use App\Repositories\WishListRepository;
use Illuminate\Database\Eloquent\Collection;

class WishListService
{
    public function __construct(private WishListRepository $repository) {}

    public function index(int $userId): Collection
    {
        return $this->repository->index($userId);
    }

    public function toggle(int $userId, int $productId): ?WishList
    {
        return $this->repository->toggle($userId, $productId);
    }
}

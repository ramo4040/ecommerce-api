<?php

namespace App\Repositories;

use App\Models\WishList;
use Illuminate\Database\Eloquent\Collection;

interface WishListRepository
{
    public function index(int $userId): Collection;
    public function toggle(int $userId, int $productId): ?WishList;
}

class EloquentWishListRepository implements WishListRepository
{
    public function index(int $userId): Collection
    {
        return WishList::with('product')->where('user_id', $userId)->get();
    }

    public function toggle(int $userId, int $productId): ?WishList
    {
        $query = WishList::where('user_id', $userId)->where('product_id', $productId);
        $wishlistItem = $query->first();

        if ($wishlistItem) {
            $query->delete();
            return null;
        }

        return WishList::create(['user_id' => $userId, 'product_id' => $productId]);
    }
}

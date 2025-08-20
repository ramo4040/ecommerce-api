<?php

namespace App\Http\Controllers;

use App\Helpers\ApiResponse;
use App\Services\WishListService;
use Illuminate\Support\Facades\Auth;

class WishListController extends Controller
{
    public function __construct(private WishListService $service) {}

    public function index()
    {
        $wishlists = $this->service->index(Auth::id());
        return ApiResponse::success($wishlists);
    }

    public function toggle(int $productId)
    {
        $wishlist = $this->service->toggle(Auth::id(), $productId);
        return ApiResponse::success($wishlist ? __('messages.product_added_to_wishlist') : __('messages.product_removed_from_wishlist'));
    }
}

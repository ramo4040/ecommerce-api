<?php

use App\Http\Controllers\CategoryController;
use App\Http\Controllers\ProductsController;
use App\Http\Controllers\WishListController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;


// Public routes
Route::apiResource('categories', CategoryController::class)->only(['index']);
Route::apiResource('products', ProductsController::class)->only(['index', 'show']);
Route::get('products/slug/{slug}', [ProductsController::class, 'showBySlug']);

// Authenticated routes
Route::middleware(['auth:sanctum'])->group(function () {
    // User routes
    Route::get('/user', function (Request $request) {
        return $request->user();
    });

    Route::middleware(['role:admin|manager'])->prefix('admin')->group(function () {
        Route::apiResource('categories', CategoryController::class);
        Route::apiResource('products', ProductsController::class);
    });

    // Wishlist routes
    Route::prefix('wishlist')->group(function () {
        Route::get('/', [WishListController::class, 'index']);
        Route::post('/{productId}', [WishListController::class, 'toggle']);
    });
});

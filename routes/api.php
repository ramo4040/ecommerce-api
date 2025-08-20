<?php

use App\Http\Controllers\CategoryController;
use App\Http\Controllers\ProductsController;
use App\Http\Controllers\WishListController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

Route::middleware(['auth:sanctum'])->get('/user', function (Request $request) {
    return $request->user();
});


Route::apiResource('categories', CategoryController::class);
Route::apiResource('products', ProductsController::class);

Route::middleware(['auth:sanctum'])->group(function () {

    // Wishlist routes
    Route::prefix('wishlist')->group(function () {
        Route::get('/', [WishListController::class, 'index']);
        Route::post('/{productId}', [WishListController::class, 'toggle']);
    });
});

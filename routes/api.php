<?php

use App\Http\Controllers\CategoryController;
use App\Http\Controllers\ProductsController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

Route::middleware(['auth:sanctum'])->get('/user', function (Request $request) {
    return $request->user();
});


Route::apiResource('categories', CategoryController::class);
Route::apiResource('products', ProductsController::class);

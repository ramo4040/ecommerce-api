<?php

namespace App\Http\Controllers;

use App\Helpers\ApiResponse;
use App\Http\Requests\ProductRequest;
use App\Http\Requests\ProductIndexRequest;
use App\Services\ProductService;
use Illuminate\Http\Request;

class ProductsController extends Controller
{
    public function __construct(private ProductService $productService) {}

    public function index(ProductIndexRequest $request)
    {
        $filter = $request->validated();
        $products = $this->productService->all($filter);
        return ApiResponse::success($products);
    }

    public function show(int $id, Request $request)
    {
        $isAdminRoute = $request->is('api/admin/*');
        $product = $this->productService->find($id, $isAdminRoute);
        return ApiResponse::success($product);
    }

    public function showBySlug(string $slug, Request $request)
    {
        $isAdminRoute = $request->is('api/admin/*');
        $product = $this->productService->findBySlug($slug, $isAdminRoute);
        return ApiResponse::success($product);
    }

    public function store(ProductRequest $request)
    {
        $product = $this->productService->create($request->validated());
        return ApiResponse::created($product, __('messages.product_created'));
    }

    public function update(ProductRequest $request, int $id)
    {
        $product = $this->productService->update($id, $request->validated());
        return ApiResponse::success($product, __('messages.product_updated'));
    }

    public function destroy(int $id)
    {
        $isDeleted = $this->productService->delete($id);
        $message = $isDeleted ? __('messages.product_deleted') : __('messages.product_not_found');
        return ApiResponse::deleted($message);
    }
}

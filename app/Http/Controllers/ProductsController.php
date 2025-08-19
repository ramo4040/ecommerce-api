<?php

namespace App\Http\Controllers;

use App\Helpers\ApiResponse;
use App\Http\Requests\ProductRequest;
use App\Services\ProductService;
use Illuminate\Http\Request;

class ProductsController extends Controller
{
    public function __construct(private ProductService $productService) {}

    public function index(Request $request)
    {
        $filter = $request->only([
            'filter',
            'category',
            'min_price',
            'max_price',
            'is_featured',
            'is_on_sale',
            'status'
        ]);
        $products = $this->productService->all($filter);
        return ApiResponse::success($products);
    }

    public function show(int $id)
    {
        return ApiResponse::success($this->productService->find($id));
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

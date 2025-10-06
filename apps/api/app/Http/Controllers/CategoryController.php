<?php

namespace App\Http\Controllers;

use App\Helpers\ApiResponse;
use App\Http\Requests\CategoryRequest;
use App\Services\CategoryService;
use F9Web\ApiResponseHelpers;

class CategoryController extends Controller
{
    use ApiResponseHelpers;

    public function __construct(private CategoryService $categoryService) {}

    public function index()
    {
        $categories = $this->categoryService->findAll();
        return ApiResponse::success($categories);
    }

    public function show(string $id)
    {
        $category = $this->categoryService->findById($id);
        return ApiResponse::success($category);
    }

    public function store(CategoryRequest $request)
    {
        $data = $this->categoryService->create($request->validated());
        return ApiResponse::created($data, __('messages.category_created'));
    }

    public function update(CategoryRequest $request, string $category)
    {
        $data = $this->categoryService->update($category, $request->validated());
        return ApiResponse::success($data, __('messages.category_updated'));
    }

    public function destroy(string $id)
    {
        $isDeleted = $this->categoryService->delete($id);
        $message = $isDeleted ? __('messages.category_deleted') : __('messages.category_not_found');
        return ApiResponse::deleted($message);
    }
}

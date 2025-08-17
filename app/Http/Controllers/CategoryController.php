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

    public function store(CategoryRequest $request)
    {
        $data = $this->categoryService->create($request->validated());
        return ApiResponse::created($data, 'Category created successfully');
    }

    public function update(CategoryRequest $request, string $id)
    {
        $data = $this->categoryService->update($id, $request->validated());
        return ApiResponse::success($data, 'Category updated successfully');
    }

    public function destroy(string $id)
    {
        $isDeleted = $this->categoryService->delete($id);
        return ApiResponse::deleted($isDeleted ? 'Category deleted successfully' : 'Category not found');
    }
}

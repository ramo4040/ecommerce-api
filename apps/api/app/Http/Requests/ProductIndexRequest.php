<?php

namespace App\Http\Requests;

use App\Enums\ProductStatus;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class ProductIndexRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    public function validated($key = null, $default = null): array
    {
        $validated = parent::validated($key, $default);
        $isAdminRoute = $this->is('api/admin/*');

        if (!$isAdminRoute && !$this->has('status')) {
            $validated['status'] = [ProductStatus::ACTIVE->value, ProductStatus::OUT_OF_STOCK->value];
        }

        return $validated;
    }

    public function rules(): array
    {
        $isAdminRoute = $this->is('api/admin/*');

        $statusRule = $isAdminRoute
            ? ['nullable', Rule::enum(ProductStatus::class)]
            : ['nullable', Rule::in([ProductStatus::ACTIVE->value, ProductStatus::OUT_OF_STOCK->value])];

        return [
            'status' => $statusRule,
        ];
    }


    public function messages(): array
    {
        return [
            'status.in' => 'The selected status is not allowed for public access. Only active and out of stock products are available.',
        ];
    }
}

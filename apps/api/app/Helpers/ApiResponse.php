<?php

namespace App\Helpers;

use Illuminate\Http\JsonResponse;
use Illuminate\Http\Resources\Json\JsonResource;
use Illuminate\Http\Resources\Json\ResourceCollection;
use Illuminate\Http\Response;

class ApiResponse
{
    public static function resource(JsonResource $resource): array
    {
        return ['success' => true, 'data' => $resource->resolve()];
    }

    public static function collection(ResourceCollection $collection): array
    {
        $response = ['success' => true, 'data' => $collection->collection];

        if (method_exists($collection->resource, 'currentPage')) {
            $response['meta'] = [
                'current_page' => $collection->currentPage(),
                'per_page' => $collection->perPage(),
                'total' => $collection->total(),
                'last_page' => $collection->lastPage(),
                'has_more' => $collection->hasMorePages(),
                'next_url' => $collection->nextPageUrl(),
                'prev_url' => $collection->previousPageUrl(),
            ];
        }

        return $response;
    }

    public static function success(mixed $data = null, ?string $message = null, int $status = 200, mixed $meta = null): JsonResponse
    {
        return response()->json(array_filter([
            'success' => true,
            'message' => $message,
            'data' => $data,
            'meta' => $meta,
        ], fn($value) => $value !== null), $status);
    }

    public static function error(string $message = 'Error', int $status = 400, mixed $errors = null): JsonResponse
    {
        return response()->json(array_filter([
            'success' => false,
            'message' => $message,
            'errors' => $errors,
        ], fn($value) => $value !== null), $status);
    }

    public static function notFound(string $message = 'Resource not found'): JsonResponse
    {
        return self::error($message, Response::HTTP_NOT_FOUND);
    }

    public static function unauthorized(string $message = 'Unauthorized'): JsonResponse
    {
        return self::error($message, Response::HTTP_UNAUTHORIZED);
    }

    public static function forbidden(string $message = 'Forbidden'): JsonResponse
    {
        return self::error($message, Response::HTTP_FORBIDDEN);
    }

    public static function validation(mixed $errors, string $message = 'Validation failed'): JsonResponse
    {
        return self::error($message, Response::HTTP_UNPROCESSABLE_ENTITY, $errors);
    }

    public static function noContent(): JsonResponse
    {
        return response()->json(null, Response::HTTP_NO_CONTENT);
    }

    public static function serverError(string $message = 'Internal server error'): JsonResponse
    {
        return self::error($message, Response::HTTP_INTERNAL_SERVER_ERROR);
    }

    public static function created(mixed $data = null, string $message = 'Created successfully'): JsonResponse
    {
        return self::success($data, $message, Response::HTTP_CREATED);
    }

    public static function updated(mixed $data = null, string $message = 'Updated successfully'): JsonResponse
    {
        return self::success($data, $message);
    }

    public static function deleted(string $message = 'Deleted successfully'): JsonResponse
    {
        return self::success(null, $message);
    }
}

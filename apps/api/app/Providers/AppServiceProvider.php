<?php

namespace App\Providers;

use App\Repositories\CategoryRepository;
use App\Repositories\EloquentCategoryRepository;
use App\Repositories\ProductRepository;
use App\Repositories\EloquentProductRepository;
use App\Repositories\EloquentWishListRepository;
use App\Repositories\WishListRepository;
use App\Services\ImageService;
use Illuminate\Auth\Notifications\ResetPassword;
use Illuminate\Support\ServiceProvider;

class AppServiceProvider extends ServiceProvider
{
    /**
     * Register any application services.
     */
    public function register(): void
    {
        $this->app->bind(ProductRepository::class, EloquentProductRepository::class);
        $this->app->bind(CategoryRepository::class, EloquentCategoryRepository::class);
        $this->app->bind(WishListRepository::class, EloquentWishListRepository::class);

        $this->app->singleton(ImageService::class, function ($app) {
            return new ImageService();
        });
    }

    /**
     * Bootstrap any application services.
     */
    public function boot(): void
    {
        ResetPassword::createUrlUsing(function (object $notifiable, string $token) {
            return config('app.frontend_url') . "/password-reset/$token?email={$notifiable->getEmailForPasswordReset()}";
        });
    }
}

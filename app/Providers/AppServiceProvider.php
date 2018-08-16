<?php

namespace App\Providers;

use App\Http\Resources\Post;
use App\Services\CategoryService;
use App\Services\Impl\CategoryServiceImpl;
use App\Services\Impl\PostServiceImpl;
use App\Services\PostService;
use Illuminate\Support\Carbon;
use Illuminate\Support\ServiceProvider;

class AppServiceProvider extends ServiceProvider
{

    public function register()
    {
        $this->app->singleton(PostService::class, PostServiceImpl::class);
        $this->app->singleton(CategoryService::class, CategoryServiceImpl::class);
    }

    public function boot()
    {
        Carbon::serializeUsing(function ($carbon) {
            return $carbon->toIso8601String();
        });

        Post::withoutWrapping();
    }
}

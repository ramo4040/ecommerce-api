<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\App;
use Illuminate\Support\Facades\Log;

class SetLocale
{
    public function handle(Request $request, Closure $next)
    {
        // Get language from Accept-Language header
        $locale = $request->getPreferredLanguage(['en', 'ar', 'fr']);


        App::setLocale($locale);
        return $next($request);
    }
}

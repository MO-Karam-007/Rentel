<?php

use App\Http\Middleware\CheckIfBanned;
use Illuminate\Foundation\Application;
use Illuminate\Foundation\Configuration\Exceptions;
use Illuminate\Foundation\Configuration\Middleware;

return Application::configure(basePath: dirname(__DIR__))
    ->withRouting(
        web: __DIR__ . '/../routes/web.php',
        api: __DIR__ . '/../routes/api.php',
        commands: __DIR__ . '/../routes/console.php',
        channels: __DIR__ . '/../routes/channels.php',
        health: '/up',
    )
    ->withMiddleware(
        function (Middleware $middleware) {

            $middleware->api(prepend: [
                CheckIfBanned::class,
                \Laravel\Sanctum\Http\Middleware\EnsureFrontendRequestsAreStateful::class,
            ]);

            $middleware->alias([
                'verified' => \App\Http\Middleware\EnsureEmailIsVerified::class,
            ]);

            //
        }
    )
    ->withExceptions(function (Exceptions $exceptions) {
        //
    })->create();

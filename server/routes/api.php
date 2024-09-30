<?php

use App\Http\Controllers\ItemController;
use App\Http\Controllers\RegisterController;
use App\Http\Controllers\RentalController;
use App\Http\Controllers\ReviewController;


use Illuminate\Support\Facades\Route;

// Route::get('/user', function (Request $request) {
//     return $request->user();
// })->middleware('auth:sanctum');



Route::middleware('web')->group(function () {
    Route::controller(RegisterController::class)->group(function () {
        Route::get('/oauth/x/redirect', [RegisterController::class, 'xRedirect']);
        Route::get('/oauth/x/callback', [RegisterController::class, 'xCallback']);
        Route::get('/oauth/google/redirect', [RegisterController::class, 'googleRedirect']);
        Route::get('/oauth/google/callback', [RegisterController::class, 'googleCallback']);
    });
});


Route::middleware('api')->group(function () {
    // Route::controller(RegisterController::class)->group(function () {
    Route::post('/register', [RegisterController::class, 'register']);
    Route::patch('/complete-register', [RegisterController::class, 'completeRegister']);
    Route::post('/login', [RegisterController::class, 'login']);
    Route::post('/logout', [RegisterController::class, 'logout'])->middleware('auth:sanctum');
    // Route::post('/login', 'LoginController@store');

    // });
});



//Route::middleware('auth:sanctum')->group(function () {
Route::apiResource('items', ItemController::class);
Route::apiResource('rental', RentalController::class);
Route::apiResource('review', ReviewController::class);


//});
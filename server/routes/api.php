<?php

use App\Http\Controllers\ItemController;
use App\Http\Controllers\RegisterController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

// Route::get('/user', function (Request $request) {
//     return $request->user();
// })->middleware('auth:sanctum');


Route::controller(RegisterController::class)->group(function () {
    Route::post('/register', [RegisterController::class, 'register']);
    Route::get('/login', [RegisterController::class, 'login']);
    // Route::post('/login', 'LoginController@store');
});

Route::middleware('auth:sanctum')->group(function () {
    Route::apiResource('items', ItemController::class);
});

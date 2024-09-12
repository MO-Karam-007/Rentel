<?php

use App\Http\Controllers\RegisterController;
use Illuminate\Support\Facades\Route;

Route::get('/', function () {
    return view('welcome');
});


Route::controller(RegisterController::class)->group(function () {
    Route::post('/register', 'RegisterController@register');
    Route::get('/login', 'LoginController@login');
    // Route::post('/login', 'LoginController@store');
});

Route::middleware('auth:sanctum')->group(function () {
    Route::resource('items', ItemController::class);
});

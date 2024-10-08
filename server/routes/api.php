<?php

use App\Http\Controllers\ItemController;
use App\Http\Controllers\RegisterController;
use App\Http\Controllers\RentalController;
use App\Http\Controllers\ReviewController;


use App\Http\Controllers\Auth\AuthenticatedSessionController;
use App\Http\Controllers\Auth\EmailVerificationNotificationController;
use App\Http\Controllers\Auth\NewPasswordController;
use App\Http\Controllers\Auth\PasswordResetLinkController;
use App\Http\Controllers\Auth\RegisteredUserController;
use App\Http\Controllers\Auth\SocialiteController;
use App\Http\Controllers\Auth\VerifyEmailController;
use Illuminate\Support\Facades\Route;

Route::post('/register', [RegisteredUserController::class, 'store']);
Route::post('/login', [AuthenticatedSessionController::class, 'store']);

// Route::middleware('web')->group(function () {
//     Route::controller(RegisterController::class)->group(function () {
//         Route::get('/oauth/x/redirect', [RegisterController::class, 'xRedirect']);
//         Route::get('/oauth/x/callback', [RegisterController::class, 'xCallback']);
//         Route::get('/oauth/google/redirect', [RegisterController::class, 'googleRedirect']);
//         Route::get('/oauth/google/callback', [RegisterController::class, 'googleCallback']);
//     });
// });


// Middleware inside Controller
Route::apiResource('items', ItemController::class);
Route::apiResource('rentals', RentalController::class);
Route::apiResource('review', ReviewController::class);


Route::middleware('auth:sanctum')->group(function () {
    Route::post('/complete-data', [RegisteredUserController::class, 'completeProfile']);
    Route::post('/logout', [AuthenticatedSessionController::class, 'destroy']);
});


// Route::middleware('api')->group(function () {
//     // Route::controller(RegisterController::class)->group(function () {
//     Route::post('/register', [RegisterController::class, 'register']);
//     Route::patch('/complete-register', [RegisterController::class, 'completeRegister']);
//     Route::post('/login', [RegisterController::class, 'login']);
//     Route::post('/logout', [RegisterController::class, 'logout'])->middleware('auth:sanctum');
//     // Route::post('/login', 'LoginController@store');

// Route::apiResource('items', ItemController::class);
// Route::apiResource('rental', RentalController::class);

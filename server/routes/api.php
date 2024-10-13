<?php

use App\Http\Controllers\ItemController;
use App\Http\Controllers\RegisterController;
use App\Http\Controllers\RentalController;
use App\Http\Controllers\ReviewController;
use App\Http\Controllers\CategoryController;
use App\Http\Controllers\PostController;



use App\Http\Controllers\TagController;
use App\Http\Controllers\FavoriteController;
use App\Http\Controllers\FollowerController;


use App\Http\Controllers\Auth\AuthenticatedSessionController;
use App\Http\Controllers\Auth\EmailVerificationNotificationController;
use App\Http\Controllers\Auth\NewPasswordController;
use App\Http\Controllers\Auth\PasswordResetLinkController;
use App\Http\Controllers\Auth\RegisteredUserController;
use App\Http\Controllers\Auth\SocialiteController;
use App\Http\Controllers\Auth\VerifyEmailController;
use App\Http\Controllers\PusherController;
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
Route::apiResource('category', CategoryController::class);
Route::post('/messages', [PusherController::class, 'store']);



Route::middleware('auth:sanctum')->group(function () {
    Route::post('/complete-data', [RegisteredUserController::class, 'completeProfile']);
    Route::post('/logout', [AuthenticatedSessionController::class, 'destroy']);
});



// catted api routes
Route::apiResource('categories', CategoryController::class);
Route::apiResource('tags', TagController::class);

// Favorites and Followers
Route::post('favorites', [FavoriteController::class, 'store']);
Route::delete('favorites/{user_id}/{item_id}', [FavoriteController::class, 'destroy']);
Route::apiResource('followers', FollowerController::class);
//Route::middleware('auth:sanctum')->group(function () {
   // Route::apiResource('posts', PostController::class);
//});
Route::apiResource('posts', PostController::class);






// Route::middleware('api')->group(function () {
//     // Route::controller(RegisterController::class)->group(function () {
//     Route::post('/register', [RegisterController::class, 'register']);
//     Route::patch('/complete-register', [RegisterController::class, 'completeRegister']);
//     Route::post('/login', [RegisterController::class, 'login']);
//     Route::post('/logout', [RegisterController::class, 'logout'])->middleware('auth:sanctum');
//     // Route::post('/login', 'LoginController@store');

// Route::apiResource('items', ItemController::class);
// Route::apiResource('rental', RentalController::class);

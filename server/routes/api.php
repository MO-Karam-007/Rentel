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
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use App\Http\Controllers\PusherController;
use Illuminate\Support\Facades\Route;
use Laravel\Socialite\Facades\Socialite;

Route::post('/register', [RegisteredUserController::class, 'store']);
Route::post('/login', [AuthenticatedSessionController::class, 'store']);

// Route::middleware('web')->group(function () {
//     Route::controller(RegisterController::class)->group(function () {
//         Route::get('/oauth/{driver}/redirect', [RegisterController::class, 'redirect']);
//         Route::get('/oauth/x/callback', [RegisterController::class, 'xCallback']);
//         Route::get('/oauth/google/redirect', [RegisterController::class, 'googleRedirect']);
//         Route::get('/oauth/google/callback', [RegisterController::class, 'googleCallback']);
//     });
// });

Route::middleware('web')->group(function () {
    Route::get('/oauth/google/redirect', function () {
        return Socialite::driver('google')->redirect();
    })->name('google.redirect');

    Route::get('/oauth/google/callback', function () {
        $googleUser = Socialite::driver('google')->user();

        // Find or create the user in your database
        $user = User::firstOrCreate(
            ['email' => $googleUser->getEmail()],
            ['username' => $googleUser->getName(), 'google_id' => $googleUser->getId()]
        );

        // Log in the user
        Auth::login($user);

        // Generate the Sanctum token
        $token = $user->createToken('token')->plainTextToken;

        // Redirect to your Angular app with the token in the URL
        return redirect('localhost:4200?token=' . $token);
    })->name('google.callback');


    Route::middleware('auth:sanctum')->get('/protected', function (Request $request) {
        return response()->json(['message' => 'You are authenticated']);
    });
});




// Middleware inside Controller
Route::apiResource('items', ItemController::class);
Route::apiResource('rentals', RentalController::class);
Route::apiResource('review', ReviewController::class);
Route::apiResource('category', CategoryController::class);
Route::post('/messages', [PusherController::class, 'store']);



Route::middleware('auth:sanctum')->group(function () {
    Route::post('/complete-data', [RegisteredUserController::class, 'completeProfile']);
    Route::get('/current-user', [RegisteredUserController::class, 'currentUser']);

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

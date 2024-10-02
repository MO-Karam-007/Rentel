<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Auth\Events\Registered;
use Illuminate\Foundation\Support\Providers\RouteServiceProvider;
use Illuminate\Support\Str;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Laravel\Socialite\Facades\Socialite;

class SocialiteController extends Controller
{
    public function redirect(Request $request, string $provider)
    {
        // $this->validateProvider($provider);

        // dd('inside');
        return Socialite::driver($provider)->redirect();
    }

    public function callback(Request $request, string $provider)
    {
        $this->validateProvider($provider);

        dd('Inside');
        $response = Socialite::driver($provider)->user();

        $user = User::firstOrCreate(['email' => $response->getEmail()], ['password' => Str::password()]);

        $data = [$provider . '_id' => $response->getId()];
        if ($user->wasRecentlyCreated) {
            $data['name'] = $response->getName() ?? $response->getNickname();

            event(new Registered($user));
        }

        $user->update($data);

        Auth::login($user, remember: true);

        // return redirect()->intended(RouteServiceProvider::HOME);
        return "redirect()->intended(RouteServiceProvider::HOME)";
    }

    protected function validateProvider($provider)
    {
        $allowedProviders = ['google', 'facebook', 'twitter'];

        if (!in_array($provider, $allowedProviders)) {
            abort(400, 'Invalid provider');
        }
    }
}

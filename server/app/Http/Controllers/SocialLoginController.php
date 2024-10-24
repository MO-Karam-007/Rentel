<?php

namespace App\Http\Controllers;

use App\Models\LinkedSocialAccount;
use App\Models\User;
use Exception;
use Illuminate\Http\Request;
use Laravel\Socialite\Facades\Socialite;
use Laravel\Socialite\Two\User as ProviderUser;


class SocialLoginController extends Controller
{
    public function login(Request $request)
    {

        try {
            // Use 
            $accessToken = $request->get('api-token');
            $provider = $request->get('provider');
            $providerUser = Socialite::driver($provider)->userFromToken($accessToken);
        } catch (Exception $exception) {
            return response()->json([
                'message' => $exception->getMessage(),
            ]);
        }

        if (filled($providerUser)) {
            $user = $this->findOrCreate($providerUser, $provider);
        } else {
            $user = $providerUser;
        }
        auth()->login($user);
        if (auth()->check()) {
            return response()->json([
                'message' => 'Logged in successfully',
                'data' => ['token' => auth()->user()->createToken('api-token')->plainTextToken],
            ]);
        } else {
            return $this->error(
                message: 'Failed to Login try again',
                code: 401
            );
        }
    }


    protected function findOrCreate(ProviderUser $providerUser, string $provider): User
    {
        $linkedSocialAccount = LinkedSocialAccount::query()->where('provider_name', $provider)
            ->where('provider_id', $providerUser->getId())
            ->first();

        if ($linkedSocialAccount) {
            return $linkedSocialAccount->user;
        } else {
            $user = null;

            if ($email = $providerUser->getEmail()) {
                $user = User::query()->where('email', $email)->first();
            }

            if (! $user) {
                $user = User::query()->create([
                    'name' => $providerUser->getName(),
                    'email' => $providerUser->getEmail(),
                ]);
                $user->markEmailAsVerified();
            }

            $user->linkedSocialAccounts()->create([
                'provider_id' => $providerUser->getId(),
                'provider_name' => $provider,
            ]);

            return $user;
        }
    }
}

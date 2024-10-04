<?php

use Illuminate\Support\Facades\Route;
use App\Models\User;
use Illuminate\Support\Facades\Auth;
use Laravel\Socialite\Facades\Socialite;
use Inertia\Inertia;

const GITHUB_NAME_FALLBACK = 'Unnamed GitHub User';

Route::middleware('guest')->group(function () {
    Route::get('login', function () {
        return Inertia::render('Auth/Login');
    })->name('login');


    Route::get('/auth/redirect', function () {
        return Socialite::driver('github')
            ->scopes(['read:user', 'repo'])
            ->redirect();
    })->name('login.github');

    Route::get('/auth/callback', function () {
        $githubUser = Socialite::driver('github')->user();

        $user = User::updateOrCreate([
            'github_id' => $githubUser->id,
        ], [
            'name' => $githubUser->name ?? GITHUB_NAME_FALLBACK,
            'email' => $githubUser->email,
            'github_token' => $githubUser->token,
            'github_image_url' => $githubUser->avatar
        ]);

        Auth::login($user);

        return redirect('/dashboard');
    });
});

Route::middleware('auth')->group(function () {
    Route::post('logout', function () {
        $request = request();

        Auth::guard('web')->logout();

        $request->session()->invalidate();

        $request->session()->regenerateToken();

        return redirect('/');
    })->name('logout');
});

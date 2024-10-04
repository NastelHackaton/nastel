<?php

namespace App\Http\Controllers;

use Auth;
use Cache;
use Illuminate\Support\Facades\Http;
use Inertia\Inertia;

class DashboardController extends Controller
{
    public function index()
    {
        $user = Auth::user();
        $token = $user->github_token;

        Cache::remember('github_repos', 60, function () use ($token) {
            return Http::withToken($token)
                ->get('https://api.github.com/user/repos')
                ->json();
        });

        $repos = Cache::get('github_repos');

        return Inertia::render('Dashboard', [
            'availableRepos' => $repos,
            'connectedRepos' => $user->repositories()->orderBy('last_updated', 'DESC')->get()->map(function ($repo) {
                return [
                    'id' => $repo->id,
                    'name' => $repo->name,
                    'language' => $repo->language,
                    'visibility' => $repo->visibility,
                    'lastUpdated' => $repo->last_updated,
                    'description' => $repo->description,
                ];
            }),
        ]);
    }
}

<?php

namespace App\Http\Controllers;

use Auth;
use App\Models\Repository;
use App\Services\RepositoryDataService;
use Illuminate\Support\Facades\Http;

class RepositoryController extends Controller
{
    public function __construct(protected RepositoryDataService $repositoryDataService) {}

    public function store()
    {
        $data = request()->validate([
            'github_repo_id' => 'required|string'
        ]);

        $user = Auth::user();

        $repositoryData = Http::withToken($user->github_token)
            ->get("https://api.github.com/repositories/{$data['github_repo_id']}");

        Repository::firstOrCreate([
            'github_repo_id' => $data['github_repo_id'],
            'user_id' => $user->id,
            'name' => $repositoryData['name'],
            'language' => $repositoryData['language'],
            'visibility' => $repositoryData['private'] ? 'Private' : 'Public',
            'last_updated' => $repositoryData['updated_at'],
            'description' => $repositoryData['description'],
        ]);

        return redirect()->route('dashboard')->with('flash', [
            'message' => 'Repository added successfully',
            'type' => 'success',
        ]);
    }

    public function show(Repository $repository)
    {
        $categories = $this->repositoryDataService->getCategories();
        $overallHealth = $this->repositoryDataService->getOverallHealth();
        $additionalData = $this->repositoryDataService->getAdditionalData();
        $healthData = $this->repositoryDataService->getHealthData();
        
        return inertia('Repository/Show', [
            'repository' => $repository,
            'categories' => $categories,
            'overallHealth' => $overallHealth,
            'healthData' => $healthData,
            'additionalData' => $additionalData,
        ]);
    }
}

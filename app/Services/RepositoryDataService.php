<?php

namespace App\Services;

use PhpParser\Node\Stmt\Return_;

class RepositoryDataService

{
    public function getCategories(): array
    {
        $categories = [
            [
                'name' => 'Documentation',
                'icon' => 'FileText',
                'color' => 'from-blue-500 to-blue-600',
                'value' => 75,
                'tasks' => 3,
            ],
            [
                'name' => 'Unit Tests',
                'icon' => 'TestTube',
                'color' => 'from-green-500 to-green-600',
                'value' => 60,
                'tasks' => 2,
            ],
            [
                'name' => 'End-to-End Tests',
                'icon' => 'Gauge',
                'color' => 'from-yellow-500 to-yellow-600',
                'value' => 40,
                'tasks' => 1,
            ],
            [
                'name' => 'Performance',
                'icon' => 'Zap',
                'color' => 'from-purple-500 to-purple-600',
                'value' => 85,
                'tasks' => 4,
            ],
            [
                'name' => 'Developer Experience',
                'icon' => 'Wrench',
                'color' => 'from-indigo-500 to-indigo-600',
                'value' => 70,
                'tasks' => 2,
            ],
            [
                'name' => 'Project Structure',
                'icon' => 'FolderTree',
                'color' => 'from-pink-500 to-pink-600',
                'value' => 55,
                'tasks' => 3,
            ],
            [
                'name' => 'Code Quality',
                'icon' => 'Code',
                'color' => 'from-teal-500 to-teal-600',
                'value' => 80,
                'tasks' => 5,
            ],
            [
                'name' => 'Security',
                'icon' => 'Shield',
                'color' => 'from-red-500 to-red-600',
                'value' => 90,
                'tasks' => 2,
            ],
            [
                'name' => 'Bug Fixes',
                'icon' => 'Bug',
                'color' => 'from-orange-500 to-orange-600',
                'value' => 30,
                'tasks' => 6,
            ],
            [
                'name' => 'Dependency Updates',
                'icon' => 'Package',
                'color' => 'from-cyan-500 to-cyan-600',
                'value' => 50,
                'tasks' => 1,
            ],
        ];

        return $categories;
    }

    public function getOverallHealth(): int
    {
        $overallHealth = 75;

        return $overallHealth;
    }

    public function getAdditionalData(): array
    {
        $additionalData = [
            'contributors' => 5,
            'issues' => 10,
            'pullRequests' => 2,
        ];

        return $additionalData;
    }

    public function getHealthData(): array
    {
        $healthData = [60, 65, 70, 68, 72];

        return $healthData;
    }
}

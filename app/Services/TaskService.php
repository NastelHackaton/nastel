<?php

namespace App\Services;

class TaskService

{
    public function getTasksForRepository($repositoryId): array
    {
        $tasks = [
            [
                'id' => 1,
                'name' => 'Refactor authentication system',
                'status' => 'in-progress',
                'isNew' => false,
                'category' => 'Security',
            ],
            [
                'id' => 2,
                'name' => 'Optimize database queries',
                'status' => 'todo',
                'isNew' => true,
                'category' => 'Performance',
            ],
            [
                'id' => 3,
                'name' => 'Implement error logging',
                'status' => 'todo',
                'isNew' => true,
                'category' => 'Developer Experience',
            ],
            [
                'id' => 4,
                'name' => 'Update React to version 18',
                'status' => 'in-progress',
                'isNew' => false,
                'category' => 'Dependency Updates',
            ],
            [
                'id' => 5,
                'name' => 'Write end-to-end tests',
                'status' => 'todo',
                'isNew' => false,
                'category' => 'End-to-End Tests',
            ],
        ];

        return $tasks;
    }
}

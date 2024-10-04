<?php

namespace App\Http\Controllers;

class RepositoryTaskController extends Controller
{
    public function index()
    {
        return inertia('Repository/Tasks/Index');
    }

    public function show()
    {
        return inertia('Repository/Tasks/Show');
    }
}

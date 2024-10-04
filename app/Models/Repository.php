<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Repository extends Model
{
    use HasFactory;

    protected $fillable = [
        'user_id',
        'github_repo_id',
        'name',
        'language',
        'visibility',
        'last_updated',
        'description',
    ];

    public function user()
    {
        return $this->belongsTo(User::class);
    }
}

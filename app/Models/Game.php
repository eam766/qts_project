<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Game extends Model {
    use HasFactory;

    protected $fillable = [
        'game_id',
        'name',
        'slug',
        'first_release_date',
        'cover_image_id',
        'total_rating',
        'storyline',
        'summary',
        'artworks',
        'screenshots',
        'genres',
        'involved_companies',
        'similar_games',
        'videos',
        'platforms',
        'themes',
        'external_games',
        'game_type',
        'hypes',
        'price'
    ];

    protected $casts = [
        'first_release_date' => 'date',
        'total_rating' => 'float',
        'artworks' => 'array',
        'screenshots' => 'array',
        'genres' => 'array',
        'involved_companies' => 'array',
        'similar_games' => 'array',
        'videos' => 'array',
        'platforms' => 'array',
        'themes' => 'array',
        'external_games' => 'array',
    ];
}

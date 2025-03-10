<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\File;
use App\Models\Game;

class GameSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        // Get JSON data from the file
        $json = File::get(database_path('json/games.json'));
        $games = json_decode($json, true);

        foreach ($games as $game) {

            Game::updateOrCreate([ 'game_id' => $game['game_id'] ?? null],[
                'game_id' => $game['game_id'] ?? null,
                'name' => $game['name'] ?? null,
                'slug' => $game['slug'] ?? null,
                'release_date' => $game['release_date'] ?? null,
                'cover_image_id' => $game['cover_image_id'] ?? null,
                'total_rating' => $game['total_rating'] ?? null,
                'storyline' => $game['storyline'] ?? null,
                'summary' => $game['summary'] ?? null,
                'hypes' => $game['hypes'] ?? null,
                'game_type' => $game['game_type'] ?? null,

                // Just decode JSON once, don't re-encode
                'artworks' => isset($game['artworks']) ? json_decode($game['artworks'], true) : null,
                'screenshots' => isset($game['screenshots']) ? json_decode($game['screenshots'], true) : null,
                'genres' => isset($game['genres']) ? json_decode($game['genres'], true) : null,
                'involved_companies' => isset($game['involved_companies']) ? json_decode($game['involved_companies'], true) : null,
                'similar_games' => isset($game['similar_games']) ? json_decode($game['similar_games'], true) : null,
                'videos' => isset($game['videos']) ? json_decode($game['videos'], true) : null,
                'platforms' => isset($game['platforms']) ? json_decode($game['platforms'], true) : null,
                'themes' => isset($game['themes']) ? json_decode($game['themes'], true) : null,
                'external_games' => isset($game['external_games']) ? json_decode($game['external_games'], true) : null,
            ]);
        }
    }
}

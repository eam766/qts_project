<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\File;
use App\Models\Game;
use Illuminate\Support\Facades\Http;
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
                'price' => $game['price'] ?? null,


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



//Translation de summary, storyline, themes and genres avec Google API Translation

//class GameSeeder extends Seeder
//{
//    /**
//     * Run the database seeds.
//     */
//    public function run(): void
//    {
//
//        $json = File::get(database_path('json/games.json'));
//        $games = json_decode($json, true);
//
//        foreach ($games as $game) {
//            // Traduction des textes
//            $storylineFr = isset($game['storyline']) ? $this->translateText($game['storyline']) : null;
//            $summaryFr = isset($game['summary']) ? $this->translateText($game['summary']) : null;
//
//            // Décodage correct des genres et thèmes
//            $genresArray = [];
//            $themesArray = [];
//
//            // Extraction des genres
//            if (isset($game['genres'])) {
//                // Nettoyer la chaîne pour extraire le tableau
//                $genresStr = $game['genres'];
//
//                // Détecter le double encodage
//                if (is_string($genresStr) && strpos($genresStr, '"[\"') === 0) {
//                    // Enlever les guillemets extérieurs
//                    $genresStr = trim($genresStr, '"');
//                    // Remplacer les guillemets échappés par des guillemets simples
//                    $genresStr = str_replace('\"', '"', $genresStr);
//                    // Décoder la chaîne JSON résultante
//                    $genresArray = json_decode($genresStr, true);
//                }
//                // Format déjà correct JSON
//                else if (is_string($genresStr) && (strpos($genresStr, '[') === 0)) {
//                    $genresArray = json_decode($genresStr, true);
//                }
//                // Déjà un tableau
//                else if (is_array($genresStr)) {
//                    $genresArray = $genresStr;
//                }
//            }
//
//            // Même approche pour les thèmes
//            if (isset($game['themes'])) {
//                $themesStr = $game['themes'];
//
//                if (is_string($themesStr) && strpos($themesStr, '"[\"') === 0) {
//                    $themesStr = trim($themesStr, '"');
//                    $themesStr = str_replace('\"', '"', $themesStr);
//                    $themesArray = json_decode($themesStr, true);
//                }
//                else if (is_string($themesStr) && (strpos($themesStr, '[') === 0)) {
//                    $themesArray = json_decode($themesStr, true);
//                }
//                else if (is_array($themesStr)) {
//                    $themesArray = $themesStr;
//                }
//            }
//
//            // Vérifier que les tableaux sont correctement décodés
//            if (!is_array($genresArray)) {
//                \Log::warning('Échec du décodage des genres', ['original' => $game['genres']]);
//                $genresArray = [];
//            }
//
//            if (!is_array($themesArray)) {
//                \Log::warning('Échec du décodage des thèmes', ['original' => $game['themes']]);
//                $themesArray = [];
//            }
//
//            // Traduction individuelle des genres
//            $genresFr = [];
//            foreach ($genresArray as $genre) {
//                if (is_string($genre)) {
//                    $genresFr[] = $this->translateText($genre);
//                }
//            }
//
//            // Traduction individuelle des thèmes
//            $themesFr = [];
//            foreach ($themesArray as $theme) {
//                if (is_string($theme)) {
//                    $themesFr[] = $this->translateText($theme);
//                }
//            }
//
//
////             dd([
////                 'original_genres' => $game['genres'] ?? null,
////                 'decoded_genres' => $genresArray,
////                 'translated_genres' => $genresFr
////             ]);
//
//            Game::updateOrCreate(['game_id' => $game['game_id'] ?? null], [
//                'game_id' => $game['game_id'] ?? null,
//                'name' => $game['name'] ?? null,
//                'slug' => $game['slug'] ?? null,
//                'release_date' => $game['release_date'] ?? null,
//                'cover_image_id' => $game['cover_image_id'] ?? null,
//                'total_rating' => $game['total_rating'] ?? null,
//                'storyline' => $storylineFr,
//                'summary' => $summaryFr,
//                'hypes' => $game['hypes'] ?? null,
//                'game_type' => $game['game_type'] ?? null,
//                'price' => $game['price'] ?? null,
//                'artworks' => isset($game['artworks']) ? json_decode($game['artworks'], true) : null,
//                'screenshots' => isset($game['screenshots']) ? json_decode($game['screenshots'], true) : null,
//                'genres' => !empty($genresFr) ? json_encode($genresFr) : null,
//                'involved_companies' => isset($game['involved_companies']) ? json_decode($game['involved_companies'], true) : null,
//                'similar_games' => isset($game['similar_games']) ? json_decode($game['similar_games'], true) : null,
//                'videos' => isset($game['videos']) ? json_decode($game['videos'], true) : null,
//                'platforms' => isset($game['platforms']) ? json_decode($game['platforms'], true) : null,
//                'themes' => !empty($themesFr) ? json_encode($themesFr) : null,
//                'external_games' => isset($game['external_games']) ? json_decode($game['external_games'], true) : null,
//            ]);
//        }
//    }
//
//    public function translateText($text)
//    {
//        if (empty($text)) {
//            return '';
//        }
//
//        try {
//            // Make the API call to Google Translate
//            $response = Http::withHeaders([
//                'Authorization' => 'Bearer ' . env('GOOGLE_TRANSLATE_API_TOKEN'),
//                'x-goog-user-project' => 'instant-node-453909-b3',
//                'Content-Type' => 'application/json',
//            ])->post('https://translation.googleapis.com/language/translate/v2', [
//                'q' => $text,
//                'source' => 'en',
//                'target' => 'fr',
//                'format' => 'text',
//            ]);
//
//            if ($response->successful()) {
//                $data = $response->json();
//                if (isset($data['data']['translations'][0]['translatedText'])) {
//                    return $data['data']['translations'][0]['translatedText'];
//                }
//            }
//
//            \Log::error('Translation API error', [
//                'text' => $text,
//                'response' => $response->body()
//            ]);
//
//            return $text; // Return original text if translation fails
//        } catch (\Exception $e) {
//            \Log::error('Translation exception', [
//                'text' => $text,
//                'error' => $e->getMessage()
//            ]);
//
//            return $text; // Return original text if exception occurs
//        }
//    }
//}

//Insertion des données, de l'API IGDB, dans la base de données locale

//class GameSeeder extends Seeder {
//    public function run(): void {
//        $response = Http::withHeaders([
//            'Client-ID' => env('IGDB_CLIENT_ID'),
//            'Authorization' => 'Bearer ' . env('IGDB_ACCESS_TOKEN')
//        ])->withBody(
//            'fields
//                name,
//                slug,
//                first_release_date,
//                cover.image_id,
//                total_rating,
//                storyline,
//                summary,
//                artworks.image_id,
//                screenshots.image_id,
//                genres.name,
//                involved_companies.*,
//                involved_companies.company.name,
//                similar_games,
//                videos.video_id,
//                platforms,
//                themes.name,
//                external_games.*,
//                game_type,
//                hypes;
//                where involved_companies.company = 53072 & platforms = (6) & game_type=0 & first_release_date > 1104537600 & external_games.external_game_source = (1);
//                limit 500;',
//            'text/plain'
//        )->post('https://api.igdb.com/v4/games');
//
//        $games = $response->json();
//
//
//        foreach ($games as $game) {
//            Game::updateOrCreate(['game_id' => $game['id']],[
//                'game_id'=> $game['id'] ?? null,
//                'name' => $game['name'] ?? null,
//                'slug' => $game['slug'] ?? null,
//                'release_date' => isset($game['first_release_date'])
//                    ? date('Y-m-d', $game['first_release_date'])
//                    : null,
//                'cover_image_id' => $game['cover']['image_id'] ?? null,
//                'total_rating' => $game['total_rating'] ?? null,
//                'storyline' => $game['storyline'] ?? null,
//                'summary' => $game['summary'] ?? null,
//                'artworks' => json_encode(isset($game['artworks']) ?
//                    array_column($game['artworks'], 'image_id') : []),
//                'screenshots' => json_encode(isset($game['screenshots']) ?
//                    array_column($game['screenshots'], 'image_id') : []),
//                'genres' => json_encode(isset($game['genres']) ?
//                    array_column($game['genres'], 'name') : []),
//                'involved_companies' =>  json_encode($game['involved_companies'] ?? []),
//                'similar_games' => json_encode($game['similar_games'] ?? []),
//                'videos' => json_encode(isset($game['videos']) ?
//                    array_column($game['videos'], 'video_id') : []),
//                'platforms' => json_encode($game['platforms'] ?? []),
//                'themes' => json_encode(isset($game['themes']) ?
//                    array_column($game['themes'], 'name') : []),
//                'external_games' => json_encode($game['external_games'] ?? []),
//                'game_type' => $game['game_type'] ?? null,
//                'hypes'=>$game['hypes']??null
//            ]);
//        }
//    }
//}

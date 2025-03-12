<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;
use App\Models\Game;
use App\Services\GameService;


class GameController extends Controller
{

    protected $gameService;

    // Constructor injection
    public function __construct(GameService $gameService)
    {
        $this->gameService = $gameService;
    }
    public function index()
    {
        $games = Game::paginate(10);
        $genres = $this->gameService->getAllGenres();
        $themes = $this->gameService->getAllThemes();
        $maxPrice = $this->gameService->getMaxPrice();

        return Inertia::render('Boutique', [
            'games' => $games,
            'genres' => $genres,
            'themes' => $themes,
            'maxPrice' => $maxPrice
        ]);
    }



    public function show($id)
    {
        $game = Game::where('game_id', $id)->first(); // ← Vérifie bien ici
        
        if (!$game) {
            abort(404, "Jeu non trouvé");
        }
    
        return inertia('Jeux', [
            'game' => $game,
            'isInWishlist' => auth()->check() ? auth()->user()->wishlist()->where('game_id', $id)->exists() : false,
            'isInCart' => auth()->check() ? auth()->user()->cart()->where('game_id', $id)->exists() : false,
        ]);
    }
    

    public function acceuil(){
        $cheapGames = $this->gameService->getCheapGames();
        $upcomingGames = $this->gameService->getUpcomingGames();
        $bestRatedGames = $this->gameService->getBestRatedGames();
        $wantedGames = $this->gameService->getWantedGames();
        $recentReleases = $this->gameService->getRecentReleases();
        $hiddenGems = $this->gameService->getHiddenGems();

        return Inertia::render('Accueil', [
            'upcomingGames'=>$upcomingGames,
            'bestRatedGames'=>$bestRatedGames,
            'wantedGames'=>$wantedGames,
            'recentReleases'=>$recentReleases,
            'hiddenGems'=>$hiddenGems,
            'cheapGames'=>$cheapGames


    ]);

    }

    public function search(Request $request)
    {
        $query = Game::query();

        if ($request->filled('search')) {
            $query->where('name', 'LIKE', '%' . $request->search . '%');
        }
        $games = $query->paginate(10);
        $genres = $this->gameService->getAllGenres();
        $themes = $this->gameService->getAllThemes();
        $maxPrice = $this->gameService->getMaxPrice();

        return Inertia::render('Boutique', [
            'games' => $games,
            'filters' => $request->only('search'),
              'genres' => $genres,
            'themes' => $themes,
            'maxPrice' => $maxPrice
        ]);
    }


//    public function filter(Request $request)
//    {
//        $selectedGenres = $request->input('genres', []);
//        $selectedThemes = $request->input('themes', []);
//
//        $games = Game::query();
//
//        if (!empty($selectedGenres) && !empty($selectedThemes)) {
//            $games->where(function ($query) use ($selectedGenres) {
//                foreach ($selectedGenres as $genre) {
//
//                    $query->whereRaw("JSON_EXTRACT(genres, '$') LIKE ?", ['%"' . str_replace('"', '\\"', $genre) . '"%']);
//                }
//            });
//        }
//
//        $games = $games->paginate(10);
//
//        $genres = $this->gameService->getAllGenres();
//        $themes = $this->gameService->getAllThemes();
//        $maxPrice = $this->gameService->getMaxPrice();
//
//        return Inertia::render('Boutique', [
//            'games' => $games,
//            'genres' => $genres,
//            'themes' => $themes,
//            'maxPrice' => $maxPrice
//        ]);
//    }

    public function filter(Request $request)
    {
        // Get and format selected filters
        $selectedGenres = is_array($request->input('genres'))
            ? $request->input('genres')
            : explode(',', $request->input('genres', ''));

        $selectedThemes = is_array($request->input('themes'))
            ? $request->input('themes')
            : explode(',', $request->input('themes', ''));

        // Filter out empty values
        $selectedGenres = array_filter($selectedGenres);
        $selectedThemes = array_filter($selectedThemes);

        $games = Game::query();

        // Apply genre filters if any are selected
        if (!empty($selectedGenres)) {
            $games->where(function ($query) use ($selectedGenres) {
                foreach ($selectedGenres as $genre) {
                    $query->whereRaw("JSON_EXTRACT(genres, '$') LIKE ?", ['%"' . str_replace('"', '\\"', $genre) . '"%']);
                }
            });
        }

        // Apply theme filters if any are selected
        if (!empty($selectedThemes)) {
            $games->where(function ($query) use ($selectedThemes) {
                foreach ($selectedThemes as $theme) {
                    $query->whereRaw("JSON_EXTRACT(themes, '$') LIKE ?", ['%"' . str_replace('"', '\\"', $theme) . '"%']);
                }
            });
        }

        $games = $games->paginate(10);

        $genres = $this->gameService->getAllGenres();
        $themes = $this->gameService->getAllThemes();
        $maxPrice = $this->gameService->getMaxPrice();

        return Inertia::render('Boutique', [
            'games' => $games,
            'genres' => $genres,
            'themes' => $themes,
            'maxPrice' => $maxPrice
        ]);
    }

}

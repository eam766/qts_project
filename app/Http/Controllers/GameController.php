<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Http;
use Inertia\Inertia;
use App\Models\Game;
use App\Services\GameService;
use function Pest\Laravel\get;


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
        $games = Game::query()
            ->orderBy('total_rating', 'desc')
            ->paginate(12);

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



    public function show($game_id)
{
    $game = Game::where('game_id', $game_id)->first(); // ← Vérifie que "game_id" est bien la bonne colonne

    if (!$game) {
        abort(404, "Jeu non trouvé");
    }

    $games = Game::all();




    return inertia('Jeux', [

        'game' => $game,
        'games' => $games,
        'isInWishlist' => auth()->check() ? auth()->user()->wishlist()->where('game_id', $game_id)->exists() : false,
        'isInCart' => auth()->check() ? auth()->user()->cart()->where('game_id', $game_id)->exists() : false, // ← Assure-toi que c'est bien carts()
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
            'upcomingGames' => $upcomingGames,
            'bestRatedGames' => $bestRatedGames,
            'wantedGames' => $wantedGames,
            'recentReleases' => $recentReleases,
            'hiddenGems' => $hiddenGems,
            'cheapGames' => $cheapGames


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


    public function filter(Request $request)
    {
        $selectedGenres = $this->getFilteredInput($request, 'genres');
        $selectedThemes = $this->getFilteredInput($request, 'themes');

        $prices = $this->getPrices($request);

        $selectedGenres = array_filter($selectedGenres);
        $selectedThemes = array_filter($selectedThemes);

        $games = Game::query();

        if (!empty($selectedGenres)) {
            $games->where(function ($query) use ($selectedGenres) {
                foreach ($selectedGenres as $genre) {

                    $escapedGenre = json_encode($genre);

                    $escapedGenre = substr($escapedGenre, 1, -1);

                    $escapedGenre = str_replace('"', '\\"', $escapedGenre);

                    $query->whereRaw("JSON_EXTRACT(genres, '$') LIKE ?", ['%' . $escapedGenre . '%']);
                }
            });
        }

        if (!empty($selectedThemes)) {
            $games->where(function ($query) use ($selectedThemes) {
                foreach ($selectedThemes as $theme) {
                    $escapedTheme = json_encode($theme);
                    $escapedTheme = substr($escapedTheme, 1, -1);
                    $escapedTheme = str_replace('"', '\\"', $escapedTheme);

                    $query->whereRaw("JSON_EXTRACT(themes, '$') LIKE ?", ['%' . $escapedTheme . '%']);
                }
            });
        }

        if (count($prices) === 2) {
            $games->whereBetween('price', [$prices[0], $prices[1]]);
        }

        $games = $games->paginate(12);

        $genres = $this->gameService->getAllGenres();
        $themes = $this->gameService->getAllThemes();
        $maxPrice = $this->gameService->getMaxPrice();

        return Inertia::render('Boutique', [
            'games' => $games,
            'genres' => $genres,
            'themes' => $themes,
            'prices' => $prices,
            'maxPrice' => $maxPrice,
            'filters' => [
                'genres' => $selectedGenres,
                'themes' => $selectedThemes,
                'prices' => $prices
            ],
        ]);
    }

    public function getGames()
    {
        $games = Game::select('game_id', 'name', 'cover_image_id')->get(); // ✅ Correct

        return response()->json($games);
    }
    private function getPrices(Request $request)
    {
        $prices = $request->input('prices');

        if (is_string($prices)) {
            return explode(',', $prices);
        }

        return $prices ?: [0, 100];
    }
    private function getFilteredInput(Request $request, $field)
    {
        $input = $request->input($field);
        if (is_array($input)) {
            return $input;
        }

        return $input ? explode(',', $input) : [];
    }



}

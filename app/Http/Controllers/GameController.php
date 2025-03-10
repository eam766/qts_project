<?php

namespace App\Http\Controllers;
use Illuminate\Http\Request;
use Inertia\Inertia;
use App\Http\Controllers\Controller;
use MarcReichel\IGDBLaravel\Models\Game;
use MarcReichel\IGDBLaravel\Models\PopularityPrimitive;
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

        return Inertia::render('Boutique', [
            'games' => $games
        ]);
    }



    public function show($game_id)
    {
        $game = Game::query()->where('game_id', $game_id)->first();

        // Déterminer si le jeu est dans la wishlist de l'utilisateur connecté
        $isInWishlist = false;
        if (auth()->check()) {
            $isInWishlist = auth()->user()
                ->wishlist()
                ->where('game_id', $id)
                ->exists();
        }

        return Inertia::render('Jeux', [
            'game' => $game,
            'isInWishlist' => $isInWishlist,
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


}

<?php

namespace App\Services;
use Illuminate\Http\Request;
use Inertia\Inertia;
use App\Models\Game;


class GameService
{
    public function getUpcomingGames()
    {
        return Game::query()
            ->where('release_date', '>', now())
            ->where('hypes', '>', 0)
            ->orderBy('hypes', 'desc')
            ->limit(9)
            ->get();


    }
    public function getBestRatedGames()
    {
        return Game::query()
            ->orderBy('total_rating', 'desc')
            ->limit(9)
            ->get();
    }
    public function getWantedGames()
    {

        return Game::query()
            ->whereBetween('release_date', [now()->subYear(), now()])
            ->where('hypes', '>', 0)
            ->orderBy('hypes', 'desc')
            ->limit(9)
            ->get();
    }
    public function getRecentReleases()
    {
        return Game::query()
            ->whereBetween('release_date', [now()->subMonths(3), now()])
            ->orderBy('release_date', 'desc')
            ->get();
    }
    public function getHiddenGems()
    {
        return Game::query()
            ->where('total_rating', '>', 80)
            ->where('hypes', '<', 10)
            ->orderBy('total_rating', 'asc')
            ->limit(10)
            ->get();
    }

    public function getCheapGames()
    {
        return Game::query()
            ->whereBetween('price', [5.0, 15.0])
            ->orderBy('price', 'asc')
            ->limit(10)
            ->get();
    }

}

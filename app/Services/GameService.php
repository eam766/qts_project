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
            ->limit(10)
            ->get();
    }
    public function getWantedGames()
    {

        return Game::query()
            ->whereBetween('release_date', [now()->subYear(), now()])
            ->where('hypes', '>', 0)
            ->orderBy('hypes', 'desc')
            ->limit(10)
            ->get();
    }
    public function getRecentReleases()
    {
        return Game::query()
            ->whereBetween('release_date', [now()->subMonths(5), now()])
            ->orderBy('release_date', 'desc')
            ->limit(10)
            ->get();
    }
    public function getHiddenGems()
    {
        return Game::query()
            ->where('total_rating', '>', 80)
            ->where('hypes', '<', 10)
            ->orderBy('total_rating', 'asc')
            ->limit(9)
            ->get();
    }

    // Method to get all unique genres
    public function getAllGenres()
    {

        $games = Game::all();

        $allGenres = [];

        foreach ($games as $game) {

            $genres = json_decode($game->genres, true);


            if (is_array($genres)) {
                foreach ($genres as $genre) {
                    if (!in_array($genre, $allGenres)) {
                        $allGenres[] = $genre;
                    }
                }
            }
        }

        return $allGenres;
    }
    public function getAllThemes()
    {

        $games = Game::all();

        $allThemes = [];

        foreach ($games as $game) {

            $themes = json_decode($game->themes, true);


            if (is_array($themes)) {
                foreach ($themes as $theme) {
                    if (!in_array($theme, $allThemes)) {
                        $allThemes[] = $theme;
                    }
                }
            }
        }

        return $allThemes;
    }
public function getMaxPrice()
{

    return  Game::max('price');

}

    public function getCheapGames()
    {
        return Game::query()
            ->whereBetween('price', [5.0, 15.0])
            ->orderBy('price', 'asc')
            ->limit(9)
            ->get();
    }

}

<?php

namespace App\Http\Controllers;
use Illuminate\Http\Request;
use Inertia\Inertia;
use App\Http\Controllers\Controller; 
use MarcReichel\IGDBLaravel\Models\Game;
use MarcReichel\IGDBLaravel\Models\PopularityPrimitive;


class GameController extends Controller
{
   

    public function index(Request $request)
    {
       /**
        * Platform 6 = PC
        */
        $perPage = $request->get('per_page', 10); 
        $page = $request->get('page', 1); 
    
       
        $games = Game::where('platforms', 6)
            ->with(['cover'])
            ->skip(($page - 1) * $perPage)
            ->take($perPage)
            ->get();
    
    
        $totalGames = Game::where('platforms', 6)
            ->with(['cover'])
            ->count();
    
        
        $totalPages = ceil($totalGames / $perPage);
    
     
        $pageRange = range(max(1, $page - 3), min($totalPages, $page + 3));
    
        return Inertia::render('Boutique', [
            'games' => $games,
            'currentPage' => $page,
            'totalPages' => $totalPages,
            'pageRange' => $pageRange, 
        ]);
    }
    

  
    public function show($id)
    {
        $id = (int) $id;

        $game = Game::where('id', $id)
            ->with(['cover', 'screenshots'])
            ->first();
    
        if (!$game) {
            return abort(404, "Jeu non trouvé");
        }
    
        return Inertia::render('Jeux', ['game' => $game]);
    }
    
    public function showTOP(){
        /* Popularity Type 
            1: Visits (IGDB)
            2: Want to Play (IGDB)
            3: Playing (IGDB)
            4: Played (IGDB)
            5: 24hr Peak Players (Steam)
            6: Postitive Reviews (Steam)
            7: Negative Reviews (Steam)
            8: Total Reviews (Steam)
        
        */
        $mostVisitedIds = PopularityPrimitive::where('popularity_type', 1)
        ->orderBy('value', 'desc')
        ->get()
       
        ->pluck('game_id') 
        ->toArray();

        $wantToPlayIds = PopularityPrimitive::where('popularity_type', 2)
        ->orderBy('value', 'desc')
        ->get()
        ->pluck('game_id')->toArray();

        $playingIds = PopularityPrimitive::where('popularity_type', 6)
        ->orderBy('value', 'desc')
        ->get()
        ->pluck('game_id')->toArray();

        $timestampToday = time(); 
        $oneMonthAgo = strtotime('-1 month', $timestampToday);

        $upcomingGames = Game::where('first_release_date', '>', $timestampToday)
            ->where('hypes', '>', 0) 
            ->orderBy('hypes', 'desc')
            ->with(['cover', 'screenshots', 'artworks']) 
            ->limit(10)
            ->get();

           
            $trendingGames = Game::where('first_release_date', '>=', $oneMonthAgo)
            ->where('first_release_date', '<=', $timestampToday)
            ->where('rating_count', '>', 0) 
            ->orderBy('first_release_date', 'desc') 
            ->orderBy('rating_count', 'desc') 
            ->with(['cover', 'screenshots', 'artworks']) 
            ->limit(10)
            ->get();


        $topGames = Game::where('rating_count', '>', 0) 
        ->orderBy('rating_count', 'desc')
        ->with(['cover', 'screenshots', 'artworks']) 
        ->limit(10)
        ->get();


          
        $mostVisited = Game::whereIn('id', $mostVisitedIds)
        ->with(['cover', 'screenshots', 'artworks'])
        ->get();

        $wantToPlay = Game::whereIn('id', $wantToPlayIds)
        ->with(['cover', 'screenshots', 'artworks'])
        ->get();

        $playing = Game::whereIn('id', $playingIds)
        ->with(['cover', 'screenshots', 'artworks'])
        ->get();

    return Inertia::render('Accueil', [
        'trendingGames'=>$trendingGames,
        'upcomingGames'=>$upcomingGames,
        'mostVisited' => $mostVisited,
        'wantToPlay' => $wantToPlay,
        'playing' => $playing,
        'topGames'=>$topGames
    ]);

    }
    
  
}
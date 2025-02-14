<?php

namespace App\Http\Controllers;
use Illuminate\Http\Request;
use Inertia\Inertia;
use App\Http\Controllers\Controller; 
use MarcReichel\IGDBLaravel\Models\Game;


class GameController extends Controller
{
   

    public function index(Request $request)
    {
       
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
        $id = (int) $id; // Convertit en entier pour éviter l'erreur

        $game = Game::where('id', $id)
            ->with(['cover', 'screenshots'])
            ->first();
    
        if (!$game) {
            return abort(404, "Jeu non trouvé");
        }
    
        return Inertia::render('Jeux', ['game' => $game]);
    }
    
    
  
}
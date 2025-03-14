<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Wishlist;
use Inertia\Inertia;
use App\Models\Game;


class WishlistController extends Controller
{   

     /**
     * Affiche la wishlist de l'utilisateur connecté.
     */
    public function index(Request $request)
    {
        $user = $request->user();
    
        if (!$user) {
            return redirect()->route('connexion');
        }
    
        // Récupérer les game_id des jeux ajoutés à la wishlist
        $gameIds = Wishlist::where('user_id', $user->id)->pluck('game_id');


    
        if (empty($gameIds)) {
            return Inertia::render('ListeSouhaits', [
                'wishlistGames' => [],
            ]);
        }
    
        // Récupérer les jeux depuis la base de données locale
        // Ici, on n'utilise plus l'API IGDB, mais directement notre table "games"
        $wishlistGames = Game::whereIn('id', $gameIds)->get();

    
        return Inertia::render('ListeSouhaits', [
            'wishlistGames' => $wishlistGames,
        ]);
    }
    

    /**
     * Ajoute un jeu dans la wishlist de l'utilisateur connecté.
     */
    public function store(Request $request)
{
    // 1) Validation du champ game_id
    $request->validate([
        'game_id' => 'required|integer',
    ]);

    // 2) Vérifie que le jeu existe bien dans la table games (colonne id)
    $game = Game::find($request->game_id);
    if (!$game) {
        return redirect()->back()->with('error', 'Ce jeu n’existe pas dans la base de données.');
    }

    // 3) Vérifie si le jeu est déjà présent dans la wishlist de l’utilisateur
    if ($request->user()->wishlist()->where('game_id', $request->game_id)->exists()) {
        return redirect()->back()->with('error', 'Le jeu est déjà dans votre wishlist.');
    }

    // 4) Création de l’entrée dans la table wishlists
    $request->user()->wishlist()->create([
        'game_id' => $request->game_id, // stocke l'id du jeu dans wishlists.game_id
    ]);

    return redirect()->back()->with('success', 'Jeu ajouté à la wishlist.');
}

    


    public function destroy(Request $request)
{
    $request->validate([
        'game_id' => 'required|integer'
    ]);

    // Supprime l'entrée correspondant à ce jeu pour l'utilisateur connecté
    $request->user()->wishlist()->where('game_id', $request->game_id)->delete();

    return redirect()->back()->with('success', 'Jeu retiré de la wishlist.');
}

public function getWishlist()
{
    $user = auth()->user();
    $wishlistGames = $user ? $user->wishlist()->pluck('game_id') : collect();

    return response()->json([
        'wishlistGames' => $wishlistGames
    ]);
}

}

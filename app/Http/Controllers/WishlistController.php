<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Wishlist;
use Inertia\Inertia;
use MarcReichel\IGDBLaravel\Models\Game;

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
        $gameIds = Wishlist::where('user_id', $user->id)->pluck('game_id')->toArray();

        if (empty($gameIds)) {
            return Inertia::render('ListeSouhaits', [
                'wishlistGames' => [],
            ]);
        }

        // Récupérer les jeux via l'API IGDB en filtrant par IDs
        $wishlistGames = Game::whereIn('id', $gameIds)
            ->with(['cover'])
            ->get();

        return Inertia::render('ListeSouhaits', [
            'wishlistGames' => $wishlistGames,
        ]);
    }

    /**
     * Ajoute un jeu dans la wishlist de l'utilisateur connecté.
     */
    public function store(Request $request)
    {
        // Validation du champ game_id
        $request->validate([
            'game_id' => 'required|integer'
        ]);

        // Vérifie si le jeu est déjà présent dans la wishlist
        if ($request->user()->wishlist()->where('game_id', $request->game_id)->exists()) {
            return redirect()->back()->with('error', 'Le jeu est déjà dans votre wishlist.');
        }

        // Création de l'entrée dans la table wishlists
        $request->user()->wishlist()->create([
            'game_id' => $request->game_id
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
}

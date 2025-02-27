<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class WishlistController extends Controller
{
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

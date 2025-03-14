<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Cart;
use Inertia\Inertia;
use App\Models\Game;
use Illuminate\Support\Facades\Log;

class CartController extends Controller
{
    /**
     * Afficher les jeux du panier de l'utilisateur connecté.
     */
    public function index(Request $request)
    {
        $user = $request->user();

        if (!$user) {
            return redirect()->route('connexion');
        }

        // Récupérer les game_id des jeux ajoutés au panier
        $gameIds = Cart::where('user_id', $user->id)->pluck('game_id')->toArray();

        if (empty($gameIds)) {
            return Inertia::render('Panier', [
                'cartGames' => [],
            ]);
        }

        // Récupérer les jeux depuis la base de données locale (table `games`)
        $cartGames = Game::whereIn('id', $gameIds)->get();

        return Inertia::render('Panier', [
            'cartGames' => $cartGames,
        ]);
    }

    /**
     * Ajoute un jeu dans le panier de l'utilisateur connecté.
     */
    public function store(Request $request)
    {
        // Validation du champ game_id
        $request->validate([
            'game_id' => 'required|integer'
        ]);

        // Vérifie que le jeu existe bien dans la table `games`
        $game = Game::find($request->game_id);
        if (!$game) {
            return redirect()->back()->with('error', 'Ce jeu n’existe pas dans la base.');
        }

        // Vérifie si le jeu est déjà présent dans le panier
        if ($request->user()->cart()->where('game_id', $request->game_id)->exists()) {
            return redirect()->back()->with('error', 'Le jeu est déjà dans votre panier.');
        }

        // Création de l'entrée dans la table `carts`
        $request->user()->cart()->create([
            'game_id' => $request->game_id
        ]);

        return redirect()->back()->with('success', 'Jeu ajouté au panier.');
    }

    /**
     * Supprimer un jeu du panier.
     */
    public function destroy(Request $request)
    {
        $request->validate([
            'game_id' => 'required|integer'
        ]);

        // Supprime l'entrée correspondant à ce jeu pour l'utilisateur connecté
        $request->user()->cart()->where('game_id', $request->game_id)->delete();

        return redirect()->back()->with('success', 'Jeu retiré du panier.');
    }

    /**
     * Récupère les jeux dans le panier de l'utilisateur (version JSON).
     */
    public function getCart()
    {
        $user = auth()->user();
        // Ici, on renvoie simplement un tableau d’IDs
        $cartGames = $user ? $user->cart()->pluck('game_id') : collect();

        return response()->json([
            'cartGames' => $cartGames
        ]);
    }
}
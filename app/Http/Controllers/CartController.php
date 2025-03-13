<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Cart;
use App\Models\Game;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Log;

class CartController extends Controller
{
    /**
     * Afficher les jeux du panier de l'utilisateur connecté.
     */
    public function index()
    {
        // Récupérer les éléments du panier
        $cartItems = Auth::user()->cart()->get();
        
        // Récupérer les IDs des jeux
        $gameIds = $cartItems->pluck('game_id')->toArray();
        
        // Debug: Loggez les IDs de jeux récupérés
        Log::info('IDs de jeux dans le panier: ' . implode(', ', $gameIds));
        
        // Formater les données pour le frontend
        $formattedCartItems = [];
        $total = 0;
        
        foreach ($cartItems as $cartItem) {
            // Charger le jeu depuis la base de données
            $game = Game::where('game_id', $cartItem->game_id)->first();
            
            if ($game) {
                // Préparer les données de jeu au format attendu par le frontend
                // S'assurer que la structure correspond à votre wishlist
                $gameData = [
                    'id' => $game->game_id,
                    'name' => $game->name,
                    'price' => $game->price,
                    'rating' => $game->rating ?? $game->total_rating,
                    'first_release_date' => $game->first_release_date,
                ];
                
                // Adapter le format de cover pour qu'il corresponde à votre structure IGDB
                if ($game->cover) {
                    // Si cover est une chaîne JSON, la décoder
                    if (is_string($game->cover) && $this->isJson($game->cover)) {
                        $gameData['cover'] = json_decode($game->cover, true);
                    } 
                    // Si cover est déjà un objet/tableau
                    else if (is_array($game->cover) || is_object($game->cover)) {
                        $gameData['cover'] = $game->cover;
                    }
                    // Si c'est une autre structure, créer une structure compatible IGDB
                    else {
                        // Créer un objet compatible avec la structure IGDB
                        $gameData['cover'] = [
                            'image_id' => $game->cover_image_id ?? $game->cover
                        ];
                    }
                }
                
                $formattedCartItems[] = [
                    'id' => $cartItem->id,
                    'game_id' => $cartItem->game_id,
                    'added_at' => $cartItem->created_at->format('d/m/Y H:i'),
                    'game' => $gameData
                ];
                
                $total += $game->price ?? 0;
            } else {
                Log::warning('Jeu non trouvé dans la base de données: ' . $cartItem->game_id);
            }
        }
        
        // Debug: Loggez les données formatées
        Log::info('Données formatées pour le panier: ' . json_encode($formattedCartItems));
        
        return inertia('Panier', [
            'cartItems' => $formattedCartItems,
            'total' => $total
        ]);
    }
    
    /**
     * Vérifier si une chaîne est du JSON valide
     */
    private function isJson($string) {
        json_decode($string);
        return json_last_error() === JSON_ERROR_NONE;
    }

    /**
     * Ajouter un jeu au panier (une seule fois max).
     */
    public function store(Request $request)
    {
        $request->validate([
            'game_id' => 'required|integer',
        ]);

        // Vérifie si le jeu est déjà dans le panier
        $exists = Cart::where('user_id', Auth::id())
            ->where('game_id', $request->game_id)
            ->exists();

        if ($exists) {
            return redirect()->back()->with('error', 'Ce jeu est déjà dans votre panier.');
        }

        // Ajoute le jeu au panier
        Cart::create([
            'user_id' => Auth::id(),
            'game_id' => $request->game_id,
        ]);

        return redirect()->back()->with('success', 'Jeu ajouté au panier.');
    }

    /**
     * Supprimer un jeu du panier.
     */
    public function destroy(Request $request)
    {
        $request->validate([
            'game_id' => 'required|integer',
        ]);
    
        $cartItem = Cart::where('user_id', Auth::id())
            ->where('game_id', $request->game_id)
            ->first();
    
        if (!$cartItem) {
            return redirect()->back()->with('error', 'Jeu pas dans le panier');
        }
    
        $cartItem->delete();
    
        return redirect()->back()->with('success', 'Jeu retiré du panier.');
    }
    
    /**
     * Récupérer les jeux du panier (API)
     */
    public function getCart()
    {
        $user = auth()->user();
    
        return response()->json([
            'cartGames' => $user ? $user->cart()->pluck('game_id')->toArray() : [],
        ]);
    }
}
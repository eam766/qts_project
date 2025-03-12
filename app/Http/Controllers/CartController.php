<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Cart;
use Illuminate\Support\Facades\Auth;

class CartController extends Controller
{
    /**
     * Afficher les jeux du panier de l'utilisateur connecté.
     */
    public function index()
    {
        $cartItems = Auth::user()->cart()
            ->get()
            ->map(function ($item) {
                return [
                    'id' => $item->game_id,
                    'added_at' => $item->created_at->format('d/m/Y H:i'),
                ];
            });
    
        return inertia('Panier', [
            'cartItems' => $cartItems,
        ]);
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
    
        return redirect()->back()->with('success', 'Jeu retirer au panier.');
    }
    

    
    public function getCart()
    {
        $user = auth()->user();
    
        return response()->json([
            'cartGames' => $user ? $user->cart()->pluck('game_id')->toArray() : [],
        ]);
    }
    
}

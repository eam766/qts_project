<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Log;
use Stripe\Stripe;
use Stripe\Checkout\Session;
use App\Models\Order;
use App\Models\OrderItem;
use App\Models\Cart;
use App\Models\Game;
use Inertia\Inertia;

class CheckoutController extends Controller
{
    /**
     * Afficher la page de checkout
     */
    public function index()
    {
        // Récupérer les éléments du panier
        $cartItems = Auth::user()->cart()->get();
        
        // Formater les données pour le frontend
        $formattedCartItems = [];
        $total = 0;
        
        foreach ($cartItems as $cartItem) {
            // Charger le jeu depuis la base de données locale
            $game = Game::where('game_id', $cartItem->game_id)->first();
            
            if ($game) {
                $formattedCartItems[] = [
                    'id' => $cartItem->id,
                    'game_id' => $cartItem->game_id,
                    'added_at' => $cartItem->created_at->format('d/m/Y H:i'),
                    'game' => $game
                ];
                
                $total += $game->price ?? 0;
            } else {
                Log::warning('Jeu non trouvé dans la base de données: ' . $cartItem->game_id);
            }
        }

        return Inertia::render('Checkout', [
            'cartItems' => $formattedCartItems,
            'total' => $total
        ]);
    }

    /**
     * Créer une session de paiement Stripe
     */
    public function createCheckoutSession(Request $request)
    {
        try {
            // Configurer la clé secrète Stripe
            Stripe::setApiKey(config('services.stripe.secret'));
            
            // Configurer l'API version (important pour éviter les erreurs de version)
            Stripe::setApiVersion('2022-11-15');

            // Enregistrer un log pour le débogage
            Log::info('Démarrage création session Stripe');

            // Récupérer les éléments du panier
            $cartItems = Auth::user()->cart()->get();
            
            if ($cartItems->isEmpty()) {
                return response()->json(['error' => 'Votre panier est vide'], 400);
            }
            
            // Préparer les éléments pour Stripe
            $lineItems = [];
            $totalAmount = 0;
            
            foreach ($cartItems as $cartItem) {
                // Charger le jeu depuis la base de données locale
                $game = Game::where('game_id', $cartItem->game_id)->first();
                
                if (!$game) {
                    Log::warning('Jeu non trouvé pour Stripe: ' . $cartItem->game_id);
                    continue;
                }
                
                $price = $game->price ?? 49.99;
                $totalAmount += $price;
                
                // Créer un élément de ligne pour Stripe
                $lineItems[] = [
                    'price_data' => [
                        'currency' => 'eur',
                        'product_data' => [
                            'name' => $game->name ?? ('Jeu #' . $cartItem->game_id),
                            // Images et description peuvent causer des problèmes - simplifions
                            'description' => substr($game->summary ?? '', 0, 255),
                        ],
                        'unit_amount' => (int)(round($price * 100)), // Convertir en centimes et s'assurer que c'est un entier
                    ],
                    'quantity' => 1,
                ];
            }
            
            if (empty($lineItems)) {
                return response()->json(['error' => 'Impossible de créer la commande'], 400);
            }

            Log::info('Création session Stripe pour ' . count($lineItems) . ' articles, total: ' . $totalAmount . '€');

            // Paramètres simplifiés pour la session Stripe
            $params = [
                'payment_method_types' => ['card'],
                'line_items' => $lineItems,
                'mode' => 'payment',
                'success_url' => route('checkout.success') . '?session_id={CHECKOUT_SESSION_ID}',
                'cancel_url' => route('checkout.cancel'),
            ];

            // Journaliser les paramètres pour le débogage (sans informations sensibles)
            Log::info('Paramètres session Stripe: ' . json_encode([
                'item_count' => count($lineItems),
                'success_url' => $params['success_url'],
                'cancel_url' => $params['cancel_url'],
                'mode' => $params['mode'],
            ]));

            // Créer la session Stripe
            $checkoutSession = Session::create($params);
            
            // Pour le debug, loggez l'ID de session
            Log::info('Session Stripe créée avec succès: ' . $checkoutSession->id);

            // Retourner l'ID de session
            return response()->json(['id' => $checkoutSession->id]);
            
        } catch (\Exception $e) {
            // Logger l'erreur pour le débogage
            Log::error('Erreur Stripe: ' . $e->getMessage());
            Log::error('Trace: ' . $e->getTraceAsString());
            
            // Retourner un message d'erreur plus clair
            return response()->json([
                'error' => 'Erreur lors de la création de la session de paiement: ' . $e->getMessage()
            ], 500);
        }
    }

    /**
     * Gérer le succès du paiement
     */
    public function success(Request $request)
    {
        $sessionId = $request->query('session_id');
        
        if (!$sessionId) {
            return redirect()->route('cart.index')
                ->with('error', 'Session de paiement non valide');
        }
        
        try {
            // Vérifier la session Stripe
            Stripe::setApiKey(config('services.stripe.secret'));
            $session = Session::retrieve($sessionId);
            
            if ($session->payment_status === 'paid') {
                // Récupérer les éléments du panier
                $cartItems = Auth::user()->cart()->get();
                
                // Calculer le montant total
                $total = 0;
                foreach ($cartItems as $cartItem) {
                    $game = Game::where('game_id', $cartItem->game_id)->first();
                    if ($game) {
                        $total += $game->price ?? 0;
                    }
                }
                
                // Créer une commande
                $order = Order::create([
                    'user_id' => Auth::id(),
                    'amount' => $total,
                    'status' => 'completed',
                    'stripe_session_id' => $sessionId,
                ]);

                // Ajouter les jeux à la commande
                foreach ($cartItems as $cartItem) {
                    $game = Game::where('game_id', $cartItem->game_id)->first();
                    
                    if ($game) {
                        OrderItem::create([
                            'order_id' => $order->id,
                            'game_id' => $cartItem->game_id,
                            'price' => $game->price ?? 0,
                        ]);
                    }
                }

                // Vider le panier
                Auth::user()->cart()->delete();

                // Rediriger vers une page de confirmation
                return Inertia::render('OrderConfirmation', [
                    'order' => $order->load('orderItems'),
                    'success' => 'Votre commande a été traitée avec succès!'
                ]);
            }

            return redirect()->route('cart.index')
                ->with('error', 'Le paiement a échoué. Veuillez réessayer.');
                
        } catch (\Exception $e) {
            Log::error('Erreur lors de la validation du paiement: ' . $e->getMessage());
            return redirect()->route('cart.index')
                ->with('error', 'Une erreur est survenue lors de la validation de votre paiement.');
        }
    }

    /**
     * Gérer l'annulation du paiement
     */
    public function cancel()
    {
        return redirect()->route('cart.index')
            ->with('info', 'Votre paiement a été annulé');
    }
}
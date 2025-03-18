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
            // (relation Eloquent: $cartItem->game)
            $game = $cartItem->game;

            if ($game) {
                $formattedCartItems[] = [
                    'id'       => $cartItem->id,
                    'game_id'  => $game->id,
                    'added_at' => $cartItem->created_at->format('d/m/Y H:i'),
                    'game'     => $game,
                ];

                $total += $game->price ?? 0;
            } else {
                Log::warning('Jeu non trouvé dans la base de données: ' . $cartItem->game_id);
            }
        }

        return Inertia::render('Checkout', [
            'cartItems' => $formattedCartItems,
            'total'     => $total,
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
            $lineItems   = [];
            $totalAmount = 0;

            foreach ($cartItems as $cartItem) {
                // Charger le jeu via la relation Eloquent
                $game = $cartItem->game;

                if (!$game) {
                    Log::warning('Jeu non trouvé pour Stripe: ' . $cartItem->game_id);
                    continue;
                }

                $price       = $game->price ?? 49.99;
                $totalAmount += $price;

                // Créer un élément de ligne pour Stripe
                $lineItems[] = [
                    'price_data' => [
                        'currency'     => 'cad',
                        'product_data' => [
                            'name'        => $game->name ?? ('Jeu #' . $cartItem->id),
                            'description' => substr($game->summary ?? '', 0, 255),
                        ],
                        'unit_amount' => (int) round($price * 100), // Convertir en centimes
                    ],
                    'quantity' => 1,
                ];
            }

            if (empty($lineItems)) {
                return response()->json(['error' => 'Impossible de créer la commande'], 400);
            }

            Log::info('Création session Stripe pour ' . count($lineItems) . ' articles, total: ' . $totalAmount . '$');

            // Construire les URLs
            $successUrl = url(route('checkout.success', [], false)) . '?session_id={CHECKOUT_SESSION_ID}';
            $cancelUrl  = url(route('checkout.cancel', [], false));

            // Paramètres simplifiés pour la session Stripe
            $params = [
                'payment_method_types' => ['card'],
                'line_items'           => $lineItems,
                'mode'                 => 'payment',
                'success_url'          => $successUrl,
                'cancel_url'           => $cancelUrl,
            ];

            // Journaliser les paramètres
            Log::info('Paramètres session Stripe: ' . json_encode([
                'item_count'  => count($lineItems),
                'success_url' => $params['success_url'],
                'cancel_url'  => $params['cancel_url'],
                'mode'        => $params['mode'],
            ]));

            // Créer la session Stripe
            $checkoutSession = Session::create($params);

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
        Log::info('Entrée dans checkout.success avec session_id: ' . $request->query('session_id'));

        $sessionId = $request->query('session_id');

        if (!$sessionId) {
            Log::error('Pas de session_id dans la requête');
            return redirect()->route('cart.index')
                ->with('error', 'Session de paiement non valide');
        }

        try {
            // Configurer la clé secrète Stripe
            Stripe::setApiKey(config('services.stripe.secret'));
            Stripe::setApiVersion('2022-11-15');

            Log::info('Récupération de la session Stripe: ' . $sessionId);

            // Vérifier la session Stripe
            $session = Session::retrieve($sessionId);

            Log::info('Session Stripe récupérée. Statut de paiement: ' . $session->payment_status);

            if ($session->payment_status === 'paid') {
                Log::info('Paiement validé, création de la commande');

                // Récupérer les éléments du panier
                $user      = Auth::user();
                $cartItems = $user->cart()->get();

                Log::info('Nombre d\'articles dans le panier: ' . $cartItems->count());

                // Calculer le montant total
                $total = 0;
                foreach ($cartItems as $cartItem) {
                    $game = $cartItem->game; // ou Game::find($cartItem->game_id);
                    if ($game) {
                        $total += $game->price ?? 0;
                    }
                }

                Log::info('Montant total de la commande: ' . $total);

                // Créer une commande
                $order = Order::create([
                    'user_id'           => $user->id,
                    'amount'            => $total,
                    'status'            => 'completed',
                    'stripe_session_id' => $sessionId,
                ]);

                Log::info('Commande créée avec ID: ' . $order->id);

                // Tableau pour stocker les articles avec infos complètes
                $orderItemsWithGames = [];

                // Ajouter les jeux à la commande
                foreach ($cartItems as $cartItem) {
                    try {
                        // Récupère le jeu localement
                        $game = $cartItem->game; 
                        // ou $game = Game::find($cartItem->game_id);

                        if ($game) {
                            $orderItem = OrderItem::create([
                                'order_id' => $order->id,
                                // On stocke le local ID du jeu
                                'game_id'  => $game->id,
                                'price'    => $game->price ?? 0,
                            ]);

                             // Création de l'entrée dans library
            \App\Models\Library::create([
                'user_id' => $user->id,
                'game_id' => $game->id,
            ]);

                            $orderItemsWithGames[] = [
                                'id'        => $orderItem->id,
                                'order_id'  => $orderItem->order_id,
                                'game_id'   => $orderItem->game_id,
                                'price'     => $orderItem->price,
                                'created_at'=> $orderItem->created_at,
                                'updated_at'=> $orderItem->updated_at,
                                'game' => [
                                    'id'      => $game->id,
                                    'game_id' => $game->game_id, // si tu as une colonne game_id distincte
                                    'name'    => $game->name,
                                    'price'   => $game->price,
                                ],
                            ];

                            Log::info('Article ajouté à la commande: ' . $game->name);
                        } else {
                            Log::warning('Jeu non trouvé pour l\'article: ' . $cartItem->game_id);

                            // Même si le jeu n'est pas trouvé, créer l'élément de commande
                            $orderItem = OrderItem::create([
                                'order_id' => $order->id,
                                'game_id'  => 0,
                                'price'    => 0,
                            ]);

                            $orderItemsWithGames[] = [
                                'id'        => $orderItem->id,
                                'order_id'  => $orderItem->order_id,
                                'game_id'   => $orderItem->game_id,
                                'price'     => $orderItem->price,
                                'created_at'=> $orderItem->created_at,
                                'updated_at'=> $orderItem->updated_at,
                                'game'      => null,
                            ];
                        }
                    } catch (\Exception $e) {
                        Log::error('Erreur lors de l\'ajout de l\'article ' . $cartItem->game_id . ': ' . $e->getMessage());
                    }
                }

                foreach ($cartItems as $cartItem) {
                    $user->wishlist()->where('game_id', $cartItem->game_id)->delete();
                }

                // Vider le panier
                try {
                    $deleteCount = $user->cart()->delete();
                    Log::info('Panier vidé, nombre d\'articles supprimés: ' . $deleteCount);
                } catch (\Exception $e) {
                    Log::error('Erreur lors de la suppression du panier: ' . $e->getMessage());
                }

                // Préparer les données pour Inertia
                $orderData = $order->toArray();
                // Ajouter les order items
                $orderData['order_items'] = $orderItemsWithGames;
                $orderData['orderItems']  = $orderItemsWithGames;

                Log::info('Redirection vers OrderConfirmation avec ' . count($orderItemsWithGames) . ' articles');

                // Log pour débogage
                Log::info('Données envoyées à Inertia: ' . json_encode([
                    'order_id'           => $orderData['id'],
                    'order_items_count'  => count($orderItemsWithGames),
                    'first_item'         => !empty($orderItemsWithGames) ? json_encode($orderItemsWithGames[0]) : 'aucun',
                ]));

                // Rediriger vers une page de confirmation
                return Inertia::render('OrderConfirmation', [
                    'order'   => $orderData,
                    'success' => 'Votre commande a été traitée avec succès!',
                ]);
            }

            return redirect()->route('cart.index')
                ->with('error', 'Le paiement a échoué. Veuillez réessayer.');

        } catch (\Exception $e) {
            Log::error('Erreur lors de la validation du paiement: ' . $e->getMessage());
            Log::error('Trace complète: ' . $e->getTraceAsString());

            return redirect()->route('cart.index')
                ->with('error', 'Une erreur est survenue lors de la validation de votre paiement: ' . $e->getMessage());
        }
    }

    /**
     * Gérer l'annulation du paiement
     */
    public function cancel()
    {
        Log::info('Paiement annulé, redirection vers le panier');
        return redirect()->route('cart.index')
            ->with('info', 'Votre paiement a été annulé');
    }
}

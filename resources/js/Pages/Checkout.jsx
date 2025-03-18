import React, { useState, useEffect } from "react";
import { Head, usePage } from "@inertiajs/react";
import axios from "axios";
import { loadStripe } from "@stripe/stripe-js";

// Clé publique Stripe
const stripePromise = loadStripe(
    "pk_test_51QV2rvDCcgnFwKl5Gtp6o9IedkC9tj0un1ZbralDLFBRjHJpu4ytuzaNm531CVqL5blF0gMbv7uZzMCVhsIOJ9VF00Jj3WiUkg"
);

export default function Checkout({ cartItems, total }) {
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);
    const { csrf_token } = usePage().props;

    // Configurer Axios avec le token CSRF
    useEffect(() => {
        axios.defaults.headers.common["X-CSRF-TOKEN"] = csrf_token;
    }, [csrf_token]);

    const handlePayment = async () => {
        try {
            setIsLoading(true);
            setError(null);


            // Créer une session de checkout Stripe en utilisant le chemin relatif complet
            const response = await axios.post(
                "/create-checkout-session",
                {},
                {
                    headers: {
                        "Content-Type": "application/json",
                        Accept: "application/json",
                        "X-CSRF-TOKEN": csrf_token,
                    },
                }
            );



            // Vérifier si la réponse contient un ID de session
            if (response.data && response.data.id) {


                // Charger Stripe et rediriger vers la page de paiement
                const stripe = await stripePromise;
                const { error } = await stripe.redirectToCheckout({
                    sessionId: response.data.id,
                });

                if (error) {
                    console.error("Erreur de redirection Stripe:", error);
                    setError(
                        "Erreur lors de la redirection vers la page de paiement."
                    );
                    setIsLoading(false);
                }
            } else if (response.data && response.data.error) {
                // Si le serveur renvoie une erreur spécifique
                setError(response.data.error);
                setIsLoading(false);
            } else {
                // Si la réponse n'est pas au format attendu
                setError("Réponse invalide du serveur. Veuillez réessayer.");
                setIsLoading(false);
            }
        } catch (error) {
            console.error(
                "Erreur lors de la création de la session Stripe:",
                error
            );

            // Afficher un message d'erreur plus détaillé
            if (error.response) {
                console.error("Réponse d'erreur:", error.response.data);
                setError(
                    error.response.data.error ||
                        "Erreur du serveur. Veuillez réessayer."
                );
            } else if (error.request) {
                setError(
                    "Aucune réponse du serveur. Vérifiez votre connexion."
                );
            } else {
                setError(
                    "Erreur lors de la préparation du paiement: " +
                        error.message
                );
            }

            setIsLoading(false);
        }
    };

    return (
        <>
            <Head title="Finaliser votre commande" />

            <div className="max-w-4xl mx-auto py-8 px-4 bg-[#333333]/70 text-white">
                <h1 className="text-3xl font-bold mb-6 AudioWideBlue">
                    Finaliser votre commande
                </h1>

                {/* Afficher les erreurs */}
                {error && (
                    <div className="bg-red-100 border-l-4 border-red-500 text-red-700 px-4 py-3 rounded mb-4 shadow">
                        <p>
                            <strong>Erreur:</strong> {error}
                        </p>
                    </div>
                )}

                {/* Résumé du panier */}
                <div className="bg-[#191919] p-6 rounded-lg mb-6 shadow-sm  border-[#817D7D] border-2">
                    <h2 className="text-xl font-bold mb-4 text-white border-b border-gray-200 pb-2">
                        Résumé de votre commande
                    </h2>

                    {!cartItems || cartItems.length === 0 ? (
                        <p className="text-gray-600 italic">
                            Votre panier est vide
                        </p>
                    ) : (
                        <>
                            {cartItems.map((item) => (
                                <div
                                    key={item.id || item.game_id}
                                    className="flex justify-between py-3 border-b border-gray-200"
                                >
                                    <span className="font-medium">
                                        {item.game
                                            ? item.game.name ||
                                              "Jeu #" + item.game_id
                                            : "Jeu #" + item.game_id}
                                    </span>
                                    <span className="font-semibold text-[#02d7f2]">
                                        {item.game && item.game.price
                                            ? parseFloat(
                                                  item.game.price
                                              ).toFixed(2) + " $"
                                            : "49.99 $"}
                                    </span>
                                </div>
                            ))}

                            <div className="flex justify-between py-4 font-bold mt-3 text-lg bg-[#191919] px-3 rounded">
                                <span>Total</span>
                                <span className="text-[#02d7f2]">
                                    {parseFloat(total || 0).toFixed(2)} $
                                </span>
                            </div>
                        </>
                    )}
                </div>

                {/* Section de paiement */}
                <div className="bg-[#191919] p-6 rounded-lg shadow border-[#817D7D] border-2">
                    <h2 className="text-xl font-bold mb-4 text-white border-b pb-2">
                        Paiement
                    </h2>

                    <button
                        className="w-full py-4 px-4 bg-[#02d7f2] hover:bg-[#01acc1] text-white font-bold rounded-lg shadow-md transition duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 text-lg"
                        onClick={handlePayment}
                        disabled={
                            isLoading || !cartItems || cartItems.length === 0
                        }
                    >
                        {isLoading ? (
                            <span className="flex items-center justify-center">
                                <svg
                                    className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                >
                                    <circle
                                        className="opacity-25"
                                        cx="12"
                                        cy="12"
                                        r="10"
                                        stroke="currentColor"
                                        strokeWidth="4"
                                    ></circle>
                                    <path
                                        className="opacity-75"
                                        fill="currentColor"
                                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                                    ></path>
                                </svg>
                                Traitement en cours...
                            </span>
                        ) : (
                            "Payer maintenant"
                        )}
                    </button>

                    <div className="flex items-center mt-4 bg-[#5b5b5b] p-3 rounded border border-gray-200">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-5 w-5 text-[#c7c7c7] mr-2"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                            />
                        </svg>
                        <p className="text-sm text-[#c7c7c7]">
                            Votre paiement sera traité en toute sécurité par
                            Stripe. Aucune information de carte bancaire n'est
                            stockée sur notre serveur.
                        </p>
                    </div>
                </div>
            </div>
        </>
    );
}

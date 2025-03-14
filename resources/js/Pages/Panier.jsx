import {usePage, router, Head} from "@inertiajs/react";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import carte from "../assets/img/CartePanier.png"; // Image du panier
import bouton from "../assets/img/Bouton_Inscription.png";
import axios from "axios";

export default function Panier() {
    const { auth, cartGames } = usePage().props;
    const user = auth.user;

    const [cart, setCart] = useState(cartGames || []);
    const [showEmptyMessage, setShowEmptyMessage] = useState(false);
    const [removingGameId, setRemovingGameId] = useState(null);
    const [confirmDelete, setConfirmDelete] = useState(null);
    const [isProcessingCheckout, setIsProcessingCheckout] = useState(false);

    // Calcul du total
    const totalPrice = cart.reduce((sum, game) => sum + (game.price || 0), 0);

    // Fonction de suppression
    const removeFromCart = (gameId) => {
        setRemovingGameId(gameId);

        router.delete(route("cart.destroy"), {
            data: { game_id: gameId },
            preserveState: true,
            preserveScroll: true,
            onSuccess: () => {
                setCart((prevCart) => {
                    const updatedCart = prevCart.filter((g) => g.id !== gameId);

                    if (updatedCart.length === 0) {
                        setTimeout(() => {
                            setShowEmptyMessage(true);
                        }, 300);
                    }
                    return updatedCart;
                });

                setRemovingGameId(null);
            },
            onError: () => {
                console.error("Erreur lors de la suppression du jeu.");
                setRemovingGameId(null);
            },
        });
    };

    // Fonction pour passer au paiement
    const proceedToCheckout = () => {
        setIsProcessingCheckout(true);

        // Redirection vers la page de checkout
        router.get(
            route("checkout.index"),
            {},
            {
                onError: (errors) => {
                    console.error(
                        "Erreur lors de la redirection vers le paiement:",
                        errors
                    );
                    setIsProcessingCheckout(false);
                },
            }
        );
    };

    return (
        <div
            className="flex flex-col items-start"
            style={{ fontFamily: "Audiowide" }}
        >
            <Head title={"Panier"}/>
            <p className="AudioWideBlue mb-8" style={{ fontSize: 30 }}>
                Votre panier
            </p>

            <AnimatePresence>
                {cart.length === 0 ? (
                    <motion.p
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.3 }}
                    >
                        Votre panier est vide.
                    </motion.p>
                ) : (
                    cart.map((game) => (
                        <motion.div
                            key={game.id}
                            initial={{ opacity: 0, x: -50 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: -100 }}
                            transition={{ duration: 0.3 }}
                            style={{
                                backgroundImage: `url(${carte})`,
                                backgroundRepeat: "no-repeat",
                                backgroundPosition: "center",
                                backgroundSize: "100% 100%",
                                minHeight: "230px",
                                width: "100%",
                                maxWidth: "1150px",
                                overflow: "hidden",
                                padding: "10px",
                                paddingLeft: "40px",
                                paddingRight: "80px",
                                paddingTop: "30px",
                                display: "flex",
                                flexDirection: "row",
                                marginBottom: "20px",
                            }}
                        >
                            {/* Image du jeu */}
                            {game.cover_image_id ? (
                                <img
                                    src={`https://images.igdb.com/igdb/image/upload/t_cover_big/${game.cover_image_id}.jpg`}
                                    alt={game.name}
                                    className="w-32 h-auto ml-3"
                                    style={{
                                        width: "120px",
                                        height: "170px",
                                        borderWidth: 3,
                                        borderColor: "black",
                                        borderRadius: 10,
                                    }}
                                />
                            ) : (
                                <div
                                    className="bg-gray-500 w-32 h-auto flex items-center justify-center"
                                    style={{
                                        width: "120px",
                                        height: "170px",
                                        borderWidth: 3,
                                        borderColor: "black",
                                        borderRadius: 10,
                                        marginLeft: "12px",
                                    }}
                                >
                                    <p>Image non dispo</p>
                                </div>
                            )}

                            {/* Infos du jeu */}
                            <div className="flex flex-col justify-between pb-12">
                                <p className="ml-5 text-lg font-bold">
                                    {game.name}
                                </p>
                                <p className="ml-5 text-yellow-400">
                                    Prix:{" "}
                                    {game.price
                                        ? `${game.price.toFixed(2)} $`
                                        : "N/A"}
                                </p>
                                <p className="ml-5">
                                    Note:{" "}
                                    {game.total_rating
                                        ? game.total_rating.toFixed(1)
                                        : "N/A"}
                                </p>

                                <p className="ml-5">
                                    Sortie:{" "}
                                    {game.release_date
                                        ? new Date(
                                              game.release_date
                                          ).toLocaleDateString("fr-FR", {
                                              year: "numeric",
                                              month: "long",
                                              day: "numeric",
                                          })
                                        : "N/A"}
                                </p>
                            </div>

                            {/* Bouton Supprimer */}
                            <div
                                className="flex flex-col self-center ml-auto"
                                style={{ width: "220px" }}
                            >
                                {confirmDelete === game.id ? (
                                    <div
                                        style={{
                                            display: "flex",
                                            gap: "10px",
                                            justifyContent: "center",
                                        }}
                                    >
                                        <button
                                            className="bg-red-600 text-white px-4 py-2 rounded"
                                            onClick={() =>
                                                removeFromCart(game.id)
                                            }
                                            disabled={
                                                removingGameId === game.id
                                            }
                                        >
                                            {removingGameId === game.id
                                                ? "Suppression en cours..."
                                                : "Confirmer"}
                                        </button>
                                        <button
                                            className="bg-gray-500 text-white px-4 py-2 rounded"
                                            onClick={() =>
                                                setConfirmDelete(null)
                                            }
                                        >
                                            Annuler
                                        </button>
                                    </div>
                                ) : (
                                    <button
                                        className="AudioWideBlue"
                                        style={{
                                            backgroundImage: `url(${bouton})`,
                                            backgroundRepeat: "no-repeat",
                                            backgroundPosition: "center",
                                            backgroundSize: "cover",
                                            border: "none",
                                            display: "flex",
                                            justifyContent: "center",
                                            alignItems: "center",
                                            height: "50px",
                                            width: "203px",
                                            marginTop: "16px",
                                            margin: "0 auto",
                                        }}
                                        onClick={() =>
                                            setConfirmDelete(game.id)
                                        }
                                    >
                                        Supprimer de la liste
                                    </button>
                                )}
                            </div>
                        </motion.div>
                    ))
                )}
            </AnimatePresence>

            {/* Affichage du total + bouton "Passer au paiement" */}
            {cart.length > 0 && (
                <div className="w-full flex flex-col items-start mt-4">
                    <p className="text-xl font-bold mb-2">
                        Total du panier : {totalPrice.toFixed(2)} $
                    </p>
                    <button
                        className="AudioWideBlue"
                        style={{
                            backgroundImage: `url(${bouton})`,
                            backgroundRepeat: "no-repeat",
                            backgroundPosition: "center",
                            backgroundSize: "cover",
                            border: "none",
                            display: "flex",
                            justifyContent: "center",
                            alignItems: "center",
                            height: "45px",
                            width: "180px",
                            margin: "0",
                            cursor: isProcessingCheckout ? "wait" : "pointer",
                            opacity: isProcessingCheckout ? 0.7 : 1,
                        }}
                        onClick={proceedToCheckout}
                        disabled={isProcessingCheckout}
                    >
                        {isProcessingCheckout
                            ? "Chargement..."
                            : "Passer au paiement"}
                    </button>
                </div>
            )}
        </div>
    );
}

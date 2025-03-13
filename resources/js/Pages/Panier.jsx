import React, { useState, useEffect } from "react";
import { router } from "@inertiajs/react";
import Carte from "../Components/Panier/Carte";
import Total from "../Components/Panier/Total";

export default function Panier({ cartItems, total = 0 }) {
    const [isLoading, setIsLoading] = useState(false);

    // Log des données reçues pour débogage
    useEffect(() => {
        console.log("Données du panier reçues:", cartItems);
    }, [cartItems]);

    // Gérer la suppression d'un élément du panier
    const handleRemoveItem = (gameId) => {
        setIsLoading(true);

        router.delete(
            "/cart/remove",
            {
                game_id: gameId,
            },
            {
                preserveState: true,
                preserveScroll: true,
                onSuccess: () => {
                    setIsLoading(false);
                },
                onError: () => {
                    console.error(
                        "Erreur lors de la suppression du jeu du panier"
                    );
                    setIsLoading(false);
                },
            }
        );
    };

    return (
        <div
            className="flex flex-col items-start"
            style={{ fontFamily: "Audiowide" }}
        >
            <p className="AudioWideBlue mb-8" style={{ fontSize: 30 }}>
                Votre panier
            </p>

            {isLoading ? (
                <p>Chargement...</p>
            ) : !cartItems || cartItems.length === 0 ? (
                <p>Votre panier est vide</p>
            ) : (
                <>
                    {cartItems.map((item) => (
                        <React.Fragment key={item.id || item.game_id}>
                            <Carte
                                item={item}
                                onRemove={() => handleRemoveItem(item.game_id)}
                            />
                            <br />
                        </React.Fragment>
                    ))}
                    <Total cartItems={cartItems} total={total} />
                </>
            )}
        </div>
    );
}

import React, { useEffect } from "react";
import "./Carte.css";

export default function Carte({ item, onRemove }) {
    const game = item.game || {};

    // Formatage de la date sécurisé
    const formatReleaseDate = (timestamp) => {
        if (!timestamp) return "Date inconnue";

        try {
            const date = new Date(timestamp * 1000);
            return date.toLocaleDateString("fr-FR", {
                year: "numeric",
                month: "long",
                day: "numeric",
            });
        } catch (error) {
            return "Date invalide";
        }
    };

    // Fonction pour rendre sécurisée la gestion de l'image
    const renderGameImage = () => {
        // Si cover existe et a une propriété image_id
        if (game.cover && game.cover.image_id) {
            return (
                <img
                    src={`https://images.igdb.com/igdb/image/upload/t_cover_big/${game.cover.image_id}.jpg`}
                    alt={game.name || "Jeu"}
                    className="w-full h-full object-cover"
                    onError={(e) => {
                        e.target.style.display = "none";
                        e.target.parentNode.innerHTML =
                            '<div class="flex items-center justify-center h-full"><p>Image non disponible</p></div>';
                    }}
                />
            );
        } else {
            return (
                <div className="flex items-center justify-center h-full">
                    <p>Image non disponible</p>
                </div>
            );
        }
    };

    return (
        <div className="container-cart">
            {/* Image du jeu */}
            <div className="bg-gray-500 jeu">{renderGameImage()}</div>

            {/* Informations du jeu */}
            <div className="flex flex-col justify-between pb-12">
                <p className="ml-5 text-lg font-bold">
                    {game.name || `Jeu #${item.game_id}`}
                </p>
                <p className="ml-5">
                    Prix:{" "}
                    {game.price
                        ? parseFloat(game.price).toFixed(2) + " $"
                        : "39.99 €"}
                </p>
            </div>

            {/* Bouton de suppression */}
            <div className="flex flex-col justify-end ml-auto">
                <button
                    className="AudioWideBlue buttonDelete"
                    onClick={onRemove}
                >
                    Supprimer du panier
                </button>
            </div>
        </div>
    );
}

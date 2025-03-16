import { Head, usePage } from "@inertiajs/react";
import { useState } from "react";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { OrderList } from "primereact/orderlist";

export default function Library() {
    // Récupérer l’utilisateur et la liste envoyée par le contrôleur
    const { auth, libraryEntries } = usePage().props;
    const user = auth.user;

    // Mettre la liste dans un state (optionnel si tu veux la modifier)
    const [library, setLibrary] = useState(libraryEntries || []);

    // Fonction d’affichage d’un item dans OrderList
    const itemTemplate = (entry) => {
        // entry.game => objet Game associé
        const game = entry.game;
        if (!game) {
            // Si le jeu n’existe pas ou n’a pas été chargé
            return (
                <div className="p-2">Jeu introuvable (ID: {entry.game_id})</div>
            );
        }

        // Construire l’URL de la cover
        const coverUrl = game.cover_image_id
            ? `https://images.igdb.com/igdb/image/upload/t_cover_big/${game.cover_image_id}.jpg`
            : null;

        return (
            <div className="flex flex-row bg-gray-700 p-2 my-2 items-center rounded-md">
                {/* Image du jeu */}
                {coverUrl ? (
                    <img
                        src={coverUrl}
                        alt={game.name}
                        style={{
                            width: "120px",
                            height: "170px",
                            borderWidth: 3,
                            borderColor: "black",
                            borderRadius: 10,
                        }}
                        className="mr-4"
                    />
                ) : (
                    <div
                        className="bg-gray-500 flex items-center justify-center mr-4"
                        style={{
                            width: "120px",
                            height: "170px",
                            borderWidth: 3,
                            borderColor: "black",
                            borderRadius: 10,
                        }}
                    >
                        <p>Image non dispo</p>
                    </div>
                )}

                {/* Infos du jeu */}
                <div className="flex flex-col">
                    <span className="font-bold text-white text-lg">
                        {game.name}
                    </span>
                    <span className="text-yellow-300">
                        Prix:{" "}
                        {game.price ? `${game.price.toFixed(2)} $` : "N/A"}
                    </span>
                    <span>
                        Note:{" "}
                        {game.total_rating
                            ? game.total_rating.toFixed(1)
                            : "N/A"}
                    </span>
                    <span>
                        Sortie:{" "}
                        {game.release_date
                            ? new Date(game.release_date).toLocaleDateString(
                                  "fr-FR",
                                  {
                                      year: "numeric",
                                      month: "long",
                                      day: "numeric",
                                  }
                              )
                            : "N/A"}
                    </span>
                </div>

                {/* Bouton Installer (exemple) */}
                <button className="buttonRight ml-auto">Installer</button>
            </div>
        );
    };

    return (
        <AuthenticatedLayout
            header={
                <h2 className="text-xl leading-tight text-white">
                    Ma bibliothèque
                </h2>
            }
        >
            <Head title="Bibliothèque" />
            <div className="py-12">
                <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
                    <div className="overflow-hidden bg-[#1A1A1A] p-6 text-white rounded-md">
                        {library.length === 0 ? (
                            <p>
                                Vous n’avez pas encore de jeux dans votre
                                bibliothèque.
                            </p>
                        ) : (
                            <OrderList
                                value={library}
                                itemTemplate={itemTemplate}
                                header="Mes jeux"
                                filter
                                filterBy="game.name"
                            />
                        )}
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}

import { Head, usePage } from "@inertiajs/react";
import { useState } from "react";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { OrderList } from "primereact/orderlist";
import { parseJson } from "../../../utils/utils.js";
import Stack from "@mui/material/Stack";
import Chip from "@mui/material/Chip";

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

        const themes = parseJson(game.themes);
        const genres = parseJson(game.genres);

        // Construire l’URL de la cover
        const coverUrl = game.cover_image_id
            ? `https://images.igdb.com/igdb/image/upload/t_cover_big/${game.cover_image_id}.jpg`
            : null;

        return (
            <div className="flex flex-row p-2 my-2 items-center rounded-md">
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
                        className=" flex items-center justify-center mr-4"
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
                    <span className="font-bold text-[#02d7f2] text-lg">
                        {game.name}
                    </span>

                    <span>
                        Note:{" "}
                        {game.total_rating
                            ? game.total_rating.toFixed(1)
                            : "N/A"}
                    </span>
                    {genres.length !== 0 ? (
                        <div className="mt-1 ">
                            <Stack direction="row" spacing={1}>
                                {genres.map((genre) => (
                                    <Chip
                                        label={genre}
                                        variant="outlined"
                                        style={{
                                            color: "white",
                                        }}
                                    />
                                ))}
                            </Stack>{" "}
                        </div>
                    ) : null}
                    {themes.length !== 0 ? (
                        <div className="mt-2 mb-1">
                            <Stack direction="row" spacing={1}>
                                {themes.map((theme) => (
                                    <Chip
                                        label={theme}
                                        variant="outlined"
                                        style={{
                                            color: "white",
                                        }}
                                    />
                                ))}
                            </Stack>{" "}
                        </div>
                    ) : null}
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
                <button className="buttonRight ml-auto AudioWideBlue text-lg">
                    Installer
                </button>
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
                                filter
                                filterBy="game.name"
                                className="custom-orderlist"
                                reorderable={false}
                            />
                        )}
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}

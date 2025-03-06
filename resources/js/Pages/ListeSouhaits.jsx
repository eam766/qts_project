import carte from "../assets/img/CartePanier.png";
import bouton from "../assets/img/Bouton_Inscription.png";
import { usePage } from "@inertiajs/react";

export default function ListeSouhait() {
    const { auth, wishlistGames } = usePage().props;
    const user = auth.user;

    console.log("User ID:", user.id);
    console.log("Wishlist games:", wishlistGames);

    return (
        <div
            className="flex flex-col items-start"
            style={{ fontFamily: "Audiowide" }}
        >
            <p className="AudioWideBlue mb-8" style={{ fontSize: 30 }}>
                Liste de souhaits de {user.username}
            </p>

            {wishlistGames.length === 0 ? (
                <p>Aucun jeu dans la liste de souhaits.</p>
            ) : (
                wishlistGames.map((game) => (
                    <div
                        key={game.id}
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
                        }}
                    >
                        {/* Afficher l'image du jeu */}
                        {game.cover ? (
                            <img
                                src={`https://images.igdb.com/igdb/image/upload/t_cover_big/${game.cover.image_id}.jpg`}
                                alt={game.name}
                                className="w-32 h-auto"
                            />
                        ) : (
                            <div className="bg-gray-500 w-32 h-auto flex items-center justify-center">
                                <p>Image non dispo</p>
                            </div>
                        )}

                        {/* Infos du jeu */}
                        <div className="flex flex-col justify-between pb-12">
                            <p className="ml-5 text-lg font-bold">
                                {game.name}
                            </p>
                            <p className="ml-5">
                                Note:{" "}
                                {game.rating ? game.rating.toFixed(1) : "N/A"}
                            </p>
                            <p className="ml-5">
                                Sortie:{" "}
                                {game.first_release_date
                                    ? new Date(
                                          game.first_release_date
                                      ).toLocaleDateString("fr-FR", {
                                          year: "numeric",
                                          month: "long",
                                          day: "numeric",
                                      })
                                    : "N/A"}
                            </p>
                        </div>

                        {/* Boutons d'action */}
                        <div className="flex flex-col self-center ml-auto">
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
                                }}
                            >
                                Ajouter au panier
                            </button>
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
                                }}
                            >
                                Supprimer de la liste
                            </button>
                        </div>
                    </div>
                ))
            )}
        </div>
    );
}

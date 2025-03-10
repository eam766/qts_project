//import Carte from "../Components/ListeSouhaits/Carte";
import { usePage, router } from "@inertiajs/react";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import carte from "../assets/img/CarteListeSouhait.png";
import bouton from "../assets/img/Bouton_Inscription.png";

export default function ListeSouhait() {
    const { auth, wishlistGames } = usePage().props;
    const user = auth.user;

    const [wishlist, setWishlist] = useState(wishlistGames);
    const [showEmptyMessage, setShowEmptyMessage] = useState(false);
    const [removingGameId, setRemovingGameId] = useState(null); // 🔥 ID du jeu en cours de suppression
    const [confirmDelete, setConfirmDelete] = useState(null); // 🔥 ID du jeu à confirmer

    console.log("User ID:", user.id);
    console.log("Wishlist games:", wishlist);

    // ✅ Supprime le jeu avec animation et délai
    const removeFromWishlist = (gameId) => {
        setRemovingGameId(gameId); // 🔥 Active l'état "Suppression en cours"

        router.delete(route("wishlist.destroy"), {
            data: { game_id: gameId },
            preserveState: true,
            preserveScroll: true,
            onSuccess: () => {
                setWishlist((prevWishlist) => {
                    const updatedWishlist = prevWishlist.filter(
                        (game) => game.id !== gameId
                    );

                    if (updatedWishlist.length === 0) {
                        setTimeout(() => {
                            setShowEmptyMessage(true);
                        }, 300);
                    }

                    return updatedWishlist;
                });

                setRemovingGameId(null); // 🔥 Désactive l'état de suppression
            },
            onError: () => {
                console.error("Erreur lors de la suppression du jeu.");
                setRemovingGameId(null); // 🔥 Désactive l'état même en cas d'erreur
            },
        });
    };

    return (
        <div
            className="flex flex-col items-start"
            style={{ fontFamily: "Audiowide" }}
        >
            <p className="AudioWideBlue mb-8" style={{ fontSize: 30 }}>
                Liste de souhaits de {user.username}
            </p>

            <AnimatePresence>
                {wishlist.length === 0
                    ? showEmptyMessage && (
                          <motion.p
                              initial={{ opacity: 0 }}
                              animate={{ opacity: 1 }}
                              exit={{ opacity: 0 }}
                              transition={{ duration: 0.3 }}
                          >
                              Aucun jeu dans la liste de souhaits.
                          </motion.p>
                      )
                    : wishlist.map((game) => (
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
                              }}
                          >
                              {/* Image du jeu */}
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
                                      {game.rating
                                          ? game.rating.toFixed(1)
                                          : "N/A"}
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

                              {/* Conteneur des boutons d’action */}
                              <div
                                  className="flex flex-col self-center ml-auto"
                                  style={{ width: "220px" }}
                              >
                                  {/* Section "Ajouter au panier" (reste fixe) */}
                                  <div
                                      style={{
                                          textAlign: "center",
                                          marginBottom: "10px",
                                      }}
                                  >
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
                                              margin: "0 auto", // 🔥 Centre le bouton horizontalement
                                          }}
                                      >
                                          Ajouter au panier
                                      </button>
                                  </div>

                                  {/* Section "Supprimer de la liste" avec confirmation */}
                                  <div
                                      style={{
                                          minHeight: "60px",
                                          display: "flex",
                                          alignItems: "center",
                                          justifyContent: "center",
                                      }}
                                  >
                                      {confirmDelete === game.id ? (
                                          <div className="flex gap-2">
                                              <button
                                                  className="bg-red-600 text-white px-4 py-2 rounded"
                                                  onClick={() =>
                                                      removeFromWishlist(
                                                          game.id
                                                      )
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
                                                  margin: "0 auto", // 🔥 Centre le bouton horizontalement
                                              }}
                                              onClick={() =>
                                                  setConfirmDelete(game.id)
                                              }
                                          >
                                              Supprimer de la liste
                                          </button>
                                      )}
                                  </div>
                              </div>
                          </motion.div>
                      ))}
            </AnimatePresence>
        </div>
    );
}

import { usePage, router, Head } from "@inertiajs/react";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import carte from "../assets/img/CarteListeSouhait.png";
import bouton from "../assets/img/Bouton_Inscription.png";
import axios from "axios";

export default function ListeSouhait() {
    const { auth, wishlistGames, cartGames } = usePage().props;
    const user = auth.user;

    const [wishlist, setWishlist] = useState(wishlistGames || []);
    const [cart, setCart] = useState(cartGames || []);
    const [showEmptyMessage, setShowEmptyMessage] = useState(false);
    const [removingGameId, setRemovingGameId] = useState(null);
    const [confirmDelete, setConfirmDelete] = useState(null);

    // Nouvel état pour gérer l’ajout au panier
    const [addingToCartId, setAddingToCartId] = useState(null);

    useEffect(() => {
        if (user) {
            axios
                .get(route("cart.data"))
                .then((response) => setCart(response.data.cartGames || []))
                .catch((error) =>
                    console.error("Erreur chargement panier:", error)
                );
        }
    }, [user]);

    // Vérifie si un jeu est déjà dans le panier
    const isGameInCart = (gameId) =>
        Array.isArray(cart) && cart.includes(gameId);

    const moveToCart = (gameId) => {
        // On indique qu’on ajoute ce jeu
        setAddingToCartId(gameId);

        router.post(
            route("cart.store"),
            { game_id: gameId },
            {
                preserveState: true,
                preserveScroll: true,
                onSuccess: () => {
                    // Ajoute localement l’ID du jeu
                    setCart((prevCart) =>
                        Array.isArray(prevCart)
                            ? [...prevCart, gameId]
                            : [gameId]
                    );

                    // On remet l’état à null
                    setAddingToCartId(null);

                    // Recharger le panier après une courte attente
                    setTimeout(() => {
                        axios
                            .get(route("cart.data"))
                            .then((response) =>
                                setCart(response.data.cartGames || [])
                            )
                            .catch((error) =>
                                console.error(
                                    "Erreur rechargement panier:",
                                    error
                                )
                            );
                    }, 500);
                },
                onError: () => {
                    console.error("Erreur lors de l'ajout au panier.");
                    // On réinitialise l’état en cas d’erreur
                    setAddingToCartId(null);
                },
            }
        );
    };

    const removeFromWishlist = (gameId) => {
        setRemovingGameId(gameId);

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

                setRemovingGameId(null);
            },
            onError: () => {
                console.error("Erreur lors de la suppression du jeu.");
                setRemovingGameId(null);
            },
        });
    };

    return (
        <div
            className="flex flex-col items-start"
            style={{ fontFamily: "Audiowide" }}
        >
            <Head title={"Liste de souhaits"} />
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
                                  <div className="bg-gray-500 w-32 h-auto flex items-center justify-center">
                                      <p>Image non dispo</p>
                                  </div>
                              )}

                              {/* Infos du jeu */}
                              <div className="flex flex-col justify-between pb-12">
                                  <p className="ml-5 text-lg font-bold">
                                      {game.name}
                                  </p>
                                  <p className="ml-5 text-[#F0F14E]">
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

                              {/* Conteneur des boutons d’action */}
                              <div
                                  className="flex flex-col self-center ml-auto"
                                  style={{ width: "220px" }}
                              >
                                  {/* Bouton Ajouter au panier avec changement d’état */}
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
                                              width: "184px",
                                              margin: "0 auto",
                                          }}
                                          onClick={() => {
                                              if (isGameInCart(game.id)) {
                                                  router.visit(
                                                      route("cart.index")
                                                  );
                                              } else {
                                                  moveToCart(game.id);
                                              }
                                          }}
                                      >
                                          {isGameInCart(game.id)
                                              ? "Dans le panier"
                                              : addingToCartId === game.id
                                              ? "Ajout en cours..."
                                              : "Ajouter au panier"}
                                      </button>
                                  </div>

                                  {/* Bouton Supprimer de la liste */}
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
                              </div>
                          </motion.div>
                      ))}
            </AnimatePresence>
        </div>
    );
}

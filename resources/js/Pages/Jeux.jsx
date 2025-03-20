import BordureCover from "@/Components/JeuxVideo/BordureCover";
import { Head, router, usePage } from "@inertiajs/react";
import React, { useEffect, useState } from "react";
import BoutonAjouter from "@/Components/PageProduit/BoutonAjouter";
import BoutonListe from "@/Components/PageProduit/BoutonListe";
import axios from "axios";
import { parseJson } from "../../../utils/utils.js";
import Rating from "@mui/material/Rating";
import Stack from "@mui/material/Stack";
import { styled } from "@mui/material";
import StarOutlineIcon from "@mui/icons-material/StarOutline";
import { Galleria } from "primereact/galleria";
import WindowIcon from "@mui/icons-material/Window";
import StyledAccordion from "@/Components/Boutique/Filtre/StyledFilter.jsx";
import Chip from "@mui/material/Chip";
import ListeJeux from "@/Components/Accueil/ListeJeux.jsx";
import { Accordion, AccordionTab } from "primereact/accordion";
import { Tooltip } from "@mui/material";

export default function Jeux({ game, games }) {
    const { auth } = usePage().props;
    const user = auth.user;
    const [wishlist, setWishlist] = useState([]);
    const [cart, setCart] = useState([]);
    const [library, setLibrary] = useState([]);
    const [loadingWishlist, setLoadingWishlist] = useState(false);
    const [loadingCart, setLoadingCart] = useState(false);
    const themes = parseJson(game.themes);
    const genres = parseJson(game.genres);
    const developer = parseJson(game.involved_companies).find(
        (c) => c.developer === true
    )?.company?.name;
    const publisher = parseJson(game.involved_companies).find(
        (c) => c.publisher === true
    )?.company?.name;
    const similarGames = parseJson(game.similar_games);

    const commonGames = games.filter((game) =>
        similarGames.includes(game.game_id)
    );

    // Charger l'état de la wishlist et du panier depuis le backend
    useEffect(() => {
        if (user) {
            axios
                .get(route("wishlist.data"))
                .then((response) => setWishlist(response.data.wishlistGames))
                .catch((error) =>
                    console.error("Erreur chargement wishlist:", error)
                );

            axios
                .get(route("cart.data"))
                .then((response) => setCart(response.data.cartGames))
                .catch((error) =>
                    console.error("Erreur chargement panier:", error)
                );
            axios
                .get(route("library.data"))
                .then((res) => {
                    console.log("Library data:", res.data.libraryEntries);
                    setLibrary(res.data.libraryEntries);
                })
                .catch((err) => console.error("Erreur library:", err));
        }
    }, [user]);

    // Vérifier si le jeu est dans la liste de souhaits / panier
    const isInWishlist = wishlist.includes(game.id);
    const isInCart = cart.includes(game.id);
    const isInLibrary = library.includes(game.id);

    // Fonction pour gérer la wishlist
    const toggleWishlist = () => {
        if (!user) {
            router.visit("/connexion");
            return;
        }

        setLoadingWishlist(true);
        if (isInWishlist) {
            router.delete(route("wishlist.destroy"), {
                data: { game_id: game.id },
                preserveState: true,
                preserveScroll: true,
                onSuccess: () => {
                    setWishlist((prev) => prev.filter((id) => id !== game.id));
                    setLoadingWishlist(false);
                },
                onError: () => {
                    console.error("Erreur suppression wishlist.");
                    setLoadingWishlist(false);
                },
            });
        } else {
            router.post(
                route("wishlist.store"),
                { game_id: game.id },
                {
                    preserveState: true,
                    preserveScroll: true,
                    onSuccess: () => {
                        setWishlist((prev) => [...prev, game.id]);
                        setLoadingWishlist(false);
                    },
                    onError: () => {
                        console.error("Erreur ajout wishlist.");
                        setLoadingWishlist(false);
                    },
                }
            );
        }
    };

    // Fonction pour gérer le panier
    const toggleCart = () => {
        if (!user) {
            router.visit("/connexion");
            return;
        }

        setLoadingCart(true);
        if (isInCart) {
            router.delete(route("cart.destroy"), {
                data: { game_id: game.id },
                preserveState: true,
                preserveScroll: true,
                onSuccess: () => {
                    setCart((prev) => prev.filter((id) => id !== game.id));
                    setLoadingCart(false);
                },
                onError: () => {
                    console.error("Erreur suppression panier.");
                    setLoadingCart(false);
                },
            });
        } else {
            router.post(
                route("cart.store"),
                { game_id: game.id },
                {
                    preserveState: true,
                    preserveScroll: true,
                    onSuccess: () => {
                        setCart((prev) => [...prev, game.id]);
                        setLoadingCart(false);
                    },
                    onError: () => {
                        console.error("Erreur ajout panier.");
                        setLoadingCart(false);
                    },
                }
            );
        }
    };

    const StyledRating = styled(Rating)({
        "& .MuiRating-iconFilled": {
            color: "#F0F14E",
        },
    });

    const StyledGalleria = styled(Galleria)({
        ".p-galleria-thumbnail-prev-icon, .p-galleria-thumbnail-next-icon": {
            display: "none",
        },
        ".p-galleria-thumbnail-item": {
            borderRadius: 15,
        },
        ".p-galleria-thumbnail-item-content": {
            borderRadius: 15,

            maxHeight: 125,
            aspectRatio: 16 / 9,
        },
        ".p-galleria-item-next-icon, .p-galleria-item-prev-icon": {
            fontSize: "2rem",
        },
        ".p-galleria-item > img": {
            borderRadius: 15,
        },

        ".p-galleria-thumbnail-container": {
            marginTop: "10px",
        },
        ".p-galleria-item": {
            marginBottom: "20px",
        },
    });

    const itemTemplate = (screenshot) => {
        return (
            <img
                src={`https://images.igdb.com/igdb/image/upload/t_screenshot_big/${screenshot}.jpg`}
                alt={screenshot}
                style={{ width: "100%" }}
            />
        );
    };

    const thumbnailTemplate = (screenshot) => {
        return (
            <img
                src={`https://images.igdb.com/igdb/image/upload/t_screenshot_med/${screenshot}.jpg`}
                alt={screenshot}
                style={{ width: "100%" }}
            />
        );
    };

    return (
        <div className="container mx-auto p-10 flex-col">
            <div className=" mx-auto p-10 flex ">
                <div className="w-2/3 flex flex-col items-center ">
                    <div className="flex flex-wrap gap-2 items-start justify-center">
                        <StyledGalleria
                            value={parseJson(game.screenshots)}
                            numVisible={5}
                            style={{ maxWidth: "40vw" }}
                            showItemNavigators
                            item={itemTemplate}
                            thumbnail={thumbnailTemplate}
                            circular
                            autoPlay
                            transitionInterval={5000}
                        />
                    </div>
                    <br />
                    <StyledAccordion>
                        <Accordion
                            className="top-accordion"
                            activeIndex={0}
                            style={{
                                position: "relative",
                                maxWidth: "100%",
                                minWidth: "100%",
                                borderRadius: 0,
                                overflow: "hidden",
                            }}
                        >
                            {/* Affiche l'onglet "Résumé" seulement si game.summary existe et n'est pas vide */}
                            {game.summary && (
                                <AccordionTab header="Résumé">
                                    {game.summary}
                                </AccordionTab>
                            )}

                            {/* Affiche l'onglet "Histoire" seulement si game.storyline existe et n'est pas vide */}
                            {game.storyline && (
                                <AccordionTab header="Histoire">
                                    {game.storyline}
                                </AccordionTab>
                            )}
                        </Accordion>
                    </StyledAccordion>
                    <br />


                    <div
                        className="border-2  p-4 shadow-md  text-white"
                        style={{
                            color: "white",
                            borderColor: "#02D7F2",
                            borderSize: 2,
                            minWidth: "100%",
                            maxWidth: "100%",
                        }}
                    >
                        {genres && genres.length > 0 ? (
                            <div>
                                <p className="font-bold pb-5">Genres</p>
                                <Stack direction="row" spacing={1}>
                                    {genres.map((genre) => (
                                        <Chip
                                            label={genre}
                                            key={genre}
                                            variant="outlined"
                                            style={{ color: "white" }}
                                        />
                                    ))}
                                </Stack>{" "}
                            </div>
                        ) : null}
                        <hr className="my-2 border-gray-600" />
                        {themes && themes.length > 0 ? (
                            <div>
                                <p className="font-bold pb-5">Themes</p>
                                <Stack direction="row" spacing={1}>
                                    {themes.map((theme) => (
                                        <Chip
                                            label={theme}
                                            key={theme}
                                            variant="outlined"
                                            style={{ color: "white" }}
                                        />
                                    ))}
                                </Stack>
                            </div>
                        ) : null}
                    </div>
                </div>

                <div className="w-1/3 flex flex-col items-center">
                    <Head title={game.name} />

                    <BordureCover>
                        <img
                            src={`https://images.igdb.com/igdb/image/upload/t_cover_big/${game.cover_image_id}.jpg`}
                            alt={game.name}
                            className="w-64 h-auto"
                        />
                    </BordureCover>

                    <div className="flex flex-col items-center mt-12 w-100">
                        <h1 className="text-3xl font-bold text-center AudioWideBlue">
                            {game.name}
                        </h1>

                        {game.total_rating !== null ? (
                            <Tooltip title={`${game.total_rating.toFixed(1)}%`}>
                                <Stack spacing={1}>
                                    <StyledRating
                                        name="game-rating"
                                        emptyIcon={
                                            <StarOutlineIcon
                                                style={{ color: "#F0F14E" }}
                                                fontSize="inherit"
                                            />
                                        }
                                        readOnly
                                        defaultValue={game.total_rating / 20}
                                        precision={0.1}
                                        size={"large"}
                                    />
                                </Stack>
                            </Tooltip>
                        ) : (
                            <div style={{ fontSize: 18 }}>
                                Aucune Évaluation
                            </div>
                        )}
                        <br />
                        <p style={{ fontSize: 22 }}>C$ {game.price}</p>

                        <br />

                        {isInLibrary ? (
                            // S’il est dans la library, tu affiches un bouton “Dans la bibliothèque” (ou rien)
                            <button
                                className="AudioWideBlue buttonAdd"
                                onClick={() =>
                                    router.visit(route("bibliotheque"))
                                }
                                style={{ marginTop: "8px" }}
                            >
                                <p className="text-xl ">Dans la bibliothèque</p>
                            </button>
                        ) : (
                            <>
                                {/* Bouton Ajouter au Panier */}
                                <BoutonAjouter
                                    inCart={isInCart}
                                    cartLoading={loadingCart}
                                    onPress={toggleCart}
                                />

                                {/* Bouton Ajouter à la liste de souhaits */}
                                <BoutonListe
                                    inWishlist={isInWishlist}
                                    onPress={toggleWishlist}
                                    wishlistLoading={loadingWishlist}
                                />
                            </>
                        )}

                        <br />
                        <div
                            className="border-2  p-4 shadow-md  text-white"
                            style={{
                                color: "#02D7F2",
                                borderColor: "#02D7F2",
                                width: "100%",
                            }}
                        >
                            <p className="text-lg font-semibold">
                                Développeur:{" "}
                                <span className="text-white">{developer}</span>
                            </p>
                            <hr className="my-2 border-gray-600" />
                            <p className="text-lg font-semibold">
                                Éditeur:{" "}
                                <span className="text-white">{publisher}</span>
                            </p>
                            <hr className="my-2 border-gray-600" />
                            <p className="text-lg font-semibold">
                                Date de sortie:{" "}
                                <span className="text-white">
                                    {game.release_date}
                                </span>
                            </p>
                            <hr className="my-2 border-gray-600" />
                            <p className="text-lg font-semibold flex items-center gap-2">
                                Plateforme :{" "}
                                <WindowIcon className="w-5 h-5 text-gray-300" />
                            </p>
                        </div>
                    </div>
                </div>
            </div>

            {commonGames.length !== 0 ? (
                <div className="flex flex-col   mx-auto p-10">
                    <hr />
                    <br />
                    <p style={{ width: 200, fontSize: 25, fontWeight: "bold" }}>
                        Jeux Similaire
                    </p>
                    <br />

                    <ListeJeux
                        numScroll={1}
                        visibleCount={5}
                        couvertures={commonGames}
                    ></ListeJeux>
                </div>
            ) : null}
        </div>
    );
}

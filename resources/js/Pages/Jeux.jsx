import BordureCover from "@/Components/JeuxVideo/BordureCover";
import { Head, router, usePage } from "@inertiajs/react";
import React, { useEffect, useState } from "react";
import BoutonAjouter from "@/Components/PageProduit/BoutonAjouter";
import BoutonListe from "@/Components/PageProduit/BoutonListe";
import axios from "axios"; // ✅ Import axios pour fetch backend
import { parseJson } from "../../../utils/utils.js";
import Rating from '@mui/material/Rating';
import Stack from '@mui/material/Stack';
import {styled} from "@mui/material";
import StarOutlineIcon from '@mui/icons-material/StarOutline';
export default function Jeux({ game }) {
    const { auth } = usePage().props;
    const user = auth.user;

    const [mainScreenshot, setMainScreenshot] = useState(
        parseJson(game.screenshots)?.[0]
    );
    const [wishlist, setWishlist] = useState([]);
    const [cart, setCart] = useState([]);
    const [loadingWishlist, setLoadingWishlist] = useState(false);
    const [loadingCart, setLoadingCart] = useState(false);

    // ✅ Charger l'état de la wishlist et du panier depuis le backend
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
        }
    }, [user]);

    // ✅ Vérifier si le jeu est dans la liste de souhaits / panier
    const isInWishlist = wishlist.includes(game.id);
    const isInCart = cart.includes(game.id);

    // ✅ Fonction pour gérer la wishlist
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

    // ✅ Fonction pour gérer le panier
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
        '& .MuiRating-iconFilled': {
            color: '#F0F14E',
        },

    });


    return (
        <div className="container mx-auto p-10 flex">
            <div className="w-2/3 flex flex-col items-center mr-8">
                {mainScreenshot && (
                    <img
                        src={`https://images.igdb.com/igdb/image/upload/t_screenshot_big/${mainScreenshot}.jpg`}
                        alt="Main Screenshot"
                        className="mb-4"
                        style={{ height: "500px", width: "800px" }}
                    />
                )}
                <div className="flex flex-wrap gap-2 items-start justify-center">
                    {parseJson(game.screenshots).map((screenshot, index) => (
                        <img
                            key={index}
                            src={`https://images.igdb.com/igdb/image/upload/t_screenshot_med/${screenshot}.jpg`}
                            alt={`${game.name} screenshot`}
                            className="w-24 h-auto cursor-pointer hover:opacity-75"
                            onClick={() => setMainScreenshot(screenshot)}
                        />
                    ))}
                </div>
                {game.summary && (
                    <div className="mt-9 w-full text-left">
                        <p className="text-start">{game.summary}</p>
                    </div>
                )}
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

                <div className="flex flex-col items-center mt-12 w-96">
                    <h1 className="text-3xl font-bold text-center AudioWideBlue">
                        {game.name}
                    </h1>
                    <Stack spacing={1}>
                        <StyledRating name="game-rating" emptyIcon={<StarOutlineIcon style={{ color:"F0F14E"}} fontSize="inherit"/>} readOnly defaultValue={game.total_rating/20} precision={0.1} size={"large"}/>

                    </Stack>
                    <br />
                    <p>{game.price}$</p>

                    <br />

                    {/* ✅ Bouton Ajouter au Panier avec couleur jaune et message dynamique */}
                    <BoutonAjouter
                        inCart={isInCart}
                        cartLoading={loadingCart}
                        onPress={toggleCart}
                    />

                    {/* ✅ Bouton Ajouter à la liste de souhaits avec message dynamique */}
                    <BoutonListe
                        inWishlist={isInWishlist}
                        onPress={toggleWishlist}
                        wishlistLoading={loadingWishlist}
                    />
                </div>
            </div>
        </div>
    );
}

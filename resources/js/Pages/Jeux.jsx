import BordureCover from "@/Components/JeuxVideo/BordureCover";
import { Head, router } from "@inertiajs/react";
import React, { useState } from "react";
import BoutonAjouter from "@/Components/PageProduit/BoutonAjouter";
import BoutonListe from "@/Components/PageProduit/BoutonListe";
import { usePage } from "@inertiajs/react";

export default function Jeux({
    game,
    isInWishlist: initialIsInWishlist,
    isInCart: initialIsInCart,
}) {
    const [mainScreenshot, setMainScreenshot] = useState(game.screenshots?.[0]);
    const [inWishlist, setInWishlist] = useState(initialIsInWishlist);
    const [inCart, setInCart] = useState(initialIsInCart);
    const [cartLoading, setCartLoading] = useState(false);
    const { auth } = usePage().props;
    const user = auth.user;

    const toggleWishlist = () => {
        if (!user) {
            router.visit("/connexion");
            return;
        }

        if (inWishlist) {
            router.delete(route("wishlist.destroy"), {
                data: { game_id: game.id },
                preserveState: true,
                preserveScroll: true,
                onSuccess: () => setInWishlist(false),
                onError: () => console.error("Erreur lors de la suppression."),
            });
        } else {
            router.post(
                route("wishlist.store"),
                { game_id: game.id },
                {
                    preserveState: true,
                    preserveScroll: true,
                    onSuccess: () => setInWishlist(true),
                    onError: () => console.error("Erreur lors de l'ajout."),
                }
            );
        }
    };

    const toggleCart = () => {
        if (!user) {
            router.visit("/connexion");
            return;
        }

        setCartLoading(true);
        if (inCart) {
            router.delete(route("cart.destroy"), {
                data: { game_id: game.id },
                preserveState: true,
                preserveScroll: true,
                onSuccess: () => {
                    setInCart(false);
                    setCartLoading(false);
                },
                onError: () => setCartLoading(false),
            });
        } else {
            router.post(
                route("cart.store"),
                { game_id: game.id },
                {
                    preserveState: true,
                    preserveScroll: true,
                    onSuccess: () => {
                        setInCart(true);
                        setCartLoading(false);
                    },
                    onError: () => setCartLoading(false),
                }
            );
        }
    };

    return (
        <div className="container mx-auto p-10 flex">
            <div className="w-2/3 flex flex-col items-center mr-8">
                {mainScreenshot && (
                    <img
                        src={`https://images.igdb.com/igdb/image/upload/t_screenshot_big/${mainScreenshot.image_id}.jpg`}
                        alt="Main Screenshot"
                        className="mb-4"
                        style={{ height: "500px", width: "800px" }}
                    />
                )}
                <div className="flex flex-wrap gap-2 items-start justify-center">
                    {game.screenshots?.map((screenshot) => (
                        <img
                            key={screenshot.id}
                            src={`https://images.igdb.com/igdb/image/upload/t_screenshot_med/${screenshot.image_id}.jpg`}
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
                {game.cover && (
                    <BordureCover>
                        <img
                            src={`https://images.igdb.com/igdb/image/upload/t_cover_big/${game.cover.image_id}.jpg`}
                            alt={game.name}
                            className="w-64 h-auto"
                        />
                    </BordureCover>
                )}
                <div className="flex flex-col items-center mt-12 w-96">
                    <h1 className="text-3xl font-bold text-center AudioWideBlue">
                        {game.name}
                    </h1>
                    <br />
                    <p>CA$ 0,99</p>
                    <br />
                    <BoutonAjouter
                        inCart={inCart}
                        cartLoading={cartLoading}
                        onPress={toggleCart}
                    />

                    <BoutonListe
                        inWishlist={inWishlist}
                        onPress={toggleWishlist}
                    />
                </div>
            </div>
        </div>
    );
}

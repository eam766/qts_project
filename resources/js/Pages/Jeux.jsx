import ButtonCyber from "@/Components/Buttons/ButtonCyber";
import BordureCover from "@/Components/JeuxVideo/BordureCover";
import BoutonAjouter from "../assets/img/Bouton_Ajouter.png";
import { Head, router } from "@inertiajs/react";
import React, { useState } from "react";
import { LuHeart } from "react-icons/lu";
import { FaCartArrowDown } from "react-icons/fa";

export default function Jeux({ game, isInWishlist: initialIsInWishlist }) {
    const [mainScreenshot, setMainScreenshot] = useState(game.screenshots?.[0]);
    // État local pour gérer instantanément si le jeu est dans la wishlist
    const [inWishlist, setInWishlist] = useState(initialIsInWishlist);

    const toggleWishlist = () => {
        if (inWishlist) {
            // Si déjà dans la wishlist, on le retire
            router.delete(route("wishlist.destroy"), {
                data: { game_id: game.id },
                preserveState: true,
                preserveScroll: true,
                onSuccess: () => {
                    setInWishlist(false);
                },
                onError: () => {
                    console.error(
                        "Erreur lors de la suppression de la wishlist."
                    );
                },
            });
        } else {
            // Sinon, on l'ajoute
            router.post(
                route("wishlist.store"),
                { game_id: game.id },
                {
                    preserveState: true,
                    preserveScroll: true,
                    onSuccess: () => {
                        setInWishlist(true);
                    },
                    onError: () => {
                        console.error("Erreur lors de l'ajout à la wishlist.");
                    },
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
                    <button
                        className="AudioWideBlue text-lg"
                        style={{
                            backgroundImage: `url(${BoutonAjouter})`,
                            backgroundRepeat: "no-repeat",
                            backgroundPosition: "center",
                            backgroundSize: "cover",
                            border: "none",
                            display: "flex",
                            justifyContent: "center",
                            alignItems: "center",
                            height: 40,
                            width: 272,
                        }}
                    >
                        <FaCartArrowDown className="mr-4" />
                        Ajouter au panier
                    </button>
                    <button
                        className="AudioWideBlue text-lg mt-2"
                        style={{
                            backgroundImage: `url(${BoutonAjouter})`,
                            backgroundRepeat: "no-repeat",
                            backgroundPosition: "center",
                            backgroundSize: "cover",
                            border: "none",
                            display: "flex",
                            justifyContent: "center",
                            alignItems: "center",
                            height: 40,
                            width: 272,
                        }}
                        onClick={toggleWishlist}
                    >
                        <LuHeart
                            className={`mr-4 ${
                                inWishlist ? "text-red-500" : ""
                            }`}
                        />
                        {inWishlist
                            ? "Dans la liste de souhaits"
                            : "Ajouter à la liste de souhaits"}
                    </button>
                </div>
            </div>
        </div>
    );
}

import React from "react";
import { Link } from "@inertiajs/react";
import JeuxBordure from "@/Components/JeuxVideo/JeuxBordure";

let colors = [
    "#8A2BE2",
    "#FF007F",
    " #FF00FF",
    "#FF4632",
    "#81EC86",
    "#3C3CE8",
    "#FD0130",
    "#00FFB2",
];
export default function CarteProduit({ index, game }) {
    return (
        <JeuxBordure color={colors[index % colors.length]}>
            <Link href={`/jeux/${game.game_id}`}>
                <div
                    style={{
                        width: 300,
                        height: 400,
                        display: "flex",
                        flexDirection: "column",
                    }}
                >
                    {
                        <img
                            src={`https://images.igdb.com/igdb/image/upload/t_cover_big/${game.cover_image_id}.jpg`}
                            alt={game.name}
                            style={{
                                width: 250,
                                aspectRatio: 3 / 4,
                            }}
                        />
                    }
                    <br />
                    <h1>{game.name}</h1>
                    <p
                        className="text-m font-semibold"
                        style={{
                            color: "white",
                            textAlign: "left",
                        }}
                    >
                        C$ {game.price}
                    </p>
                </div>
            </Link>
        </JeuxBordure>
    );
}

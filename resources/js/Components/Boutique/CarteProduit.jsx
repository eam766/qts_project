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
export default function CarteProduit({ index, jeu }) {
    return (
        <JeuxBordure color={colors[index % colors.length]}>
            <Link href={`/jeux/${jeu.id}`}>
                <div
                    style={{
                        width: 300,
                        height: 400,
                        display: "flex",
                        flexDirection: "column",
                    }}
                >
                    {jeu.cover && jeu.cover.url && (
                        <img
                            src={`https://images.igdb.com/igdb/image/upload/t_cover_big/${jeu.cover.image_id}.jpg`}
                            alt={jeu.name}
                            key={jeu.cover.image_id} // Ici c'est OK car React gère une liste d'images.
                            style={{
                                width: 250,
                                aspectRatio: 3 / 4,
                            }}
                        />
                    )}
                    <br />
                    <h1>{jeu.name}</h1>
                    <p
                        className="text-m font-semibold"
                        style={{
                            color: "white",
                            textAlign: "left",
                        }}
                    >
                        0.99$
                    </p>
                </div>
            </Link>
        </JeuxBordure>
    );
}

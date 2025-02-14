import React from "react";
import { Head, Link } from "@inertiajs/react";
import JeuxBordure from "@/Components/JeuxVideo/JeuxBordure";

//#8A2BE2, #FF007F, #FF00FF, #FF4632, #81EC86,#3C3CE8 ,#FD0130,#00FFB2
export default function Boutique({
    games,
    currentPage,
    totalPages,
    pageRange,
}) {
    console.log(games);
    if (!games) {
        return <div>Chargement des jeux...</div>;
    }
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

    return (
        <div className="container mx-auto m-14">
            <Head title={"Boutique"} />
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-11">
                {games
                    .filter((jeu) => jeu.cover)
                    .map((jeu, index) => (
                        <JeuxBordure color={colors[index % colors.length]}>
                            <Link href={`/jeux/${jeu.id}`}>
                                <div
                                    key={jeu.id}
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
                    ))}
            </div>
            <br />
            <div className="flex justify-center mt-4">
                {currentPage > 1 && (
                    <Link href={`?page=1`} className="mx-2 p-2 border rounded">
                        Première page
                    </Link>
                )}

                {currentPage > 1 && (
                    <Link
                        href={`?page=${currentPage - 1}`}
                        className="mx-2 p-2 border rounded"
                    >
                        Précédent
                    </Link>
                )}

                {pageRange.map((pageNum) => (
                    <Link
                        key={pageNum}
                        href={`?page=${pageNum}`}
                        className={`mx-2 p-2 border rounded ${
                            currentPage == pageNum
                                ? "bg-gray-800 text-white"
                                : ""
                        }`}
                    >
                        {pageNum}
                    </Link>
                ))}

                {currentPage < totalPages && (
                    <Link
                        href={`?page=${parseInt(currentPage) + 1}`}
                        className="mx-2 p-2 border rounded"
                    >
                        Suivant
                    </Link>
                )}

                {currentPage < totalPages && (
                    <Link
                        href={`?page=${totalPages}`}
                        className="mx-2 p-2 border rounded"
                    >
                        Dernière page
                    </Link>
                )}
            </div>
        </div>
    );
}

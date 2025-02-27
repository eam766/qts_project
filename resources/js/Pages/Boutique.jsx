import React from "react";
import { Head, Link } from "@inertiajs/react";

import CarteProduit from "@/Components/Boutique/CarteProduit";
import Pagination from "@/Components/Boutique/Pagination";
import Filtre from "@/Components/Boutique/Filtre";

export default function Boutique({
    games,
    currentPage,
    totalPages,
    pageRange,
}) {
    return (
        <div className="container mx-auto m-14" style={{ display: "flex" }}>
            <Head title={"Boutique"} />
            <div>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-11">
                    {games
                        .filter((jeu) => jeu.cover)
                        .map((jeu, index) => (
                            <CarteProduit
                                key={jeu.id}
                                jeu={jeu}
                                index={index}
                            />
                        ))}
                </div>
                <br />
                <Pagination
                    currentPage={currentPage}
                    totalPages={totalPages}
                    pageRange={pageRange}
                />
            </div>

            <div style={{ paddingLeft: 15 }}>
                <p>Filtre</p>
                <hr
                    style={{
                        borderTop: "5px solid #02D7F2",
                        width: "100%",
                        padding: 15,
                    }}
                />
                <Filtre />
            </div>
        </div>
    );
}

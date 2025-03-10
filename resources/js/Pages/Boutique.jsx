import React from "react";
import {Head, Link} from "@inertiajs/react";

import CarteProduit from "@/Components/Boutique/CarteProduit";
import Filtre from "@/Components/Boutique/Filtre/Filtre.jsx";
import Pagination from "@/Components/Boutique/Pagination.jsx";



export default function Boutique({games, genres, themes, maxPrice}) {

console.log(games);
    return (

        <div className="container mx-auto m-14"
             style={{display: "flex", flexDirection: 'column', alignItems: 'center'}}>
            <Head title={"Boutique"}/>
            <div style={{display: "flex", flexDirection: 'row'}}>
                <div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-11">
                        {games.data && games.data.map((game, index) => (
                            <CarteProduit
                                key={game.id}
                                game={game}
                                index={index}
                            />
                        ))}
                    </div>
                    <br/>

                </div>

                <div style={{paddingLeft: 15}}>
                    <p>Filtre</p>
                    <hr
                        style={{
                            borderTop: "5px solid #02D7F2",
                            width: "100%",
                            padding: 15,
                        }}
                    />
                    {<Filtre genres={genres} themes={themes} maxPrice={maxPrice}/>}
                </div>
            </div>
            <div>
                <hr/>
                <Pagination links={games.links}/>
            </div>
        </div>
    );
}

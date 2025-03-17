import React from "react";
import {Head} from "@inertiajs/react";
import CarteProduit from "@/Components/Boutique/CarteProduit";
import Filtre from "@/Components/Boutique/Filtre/Filtre.jsx";
import Pagination from "@/Components/Boutique/Pagination.jsx";

export default function Boutique({games, genres, themes, maxPrice}) {


    const params = new URLSearchParams(window.location.search);
    const initialGenres = params.get('genres') ? params.get('genres').split(',') : [];
    const initialThemes = params.get('themes') ? params.get('themes').split(',') : [];
    const search = params.get('search') ? params.get('search'): [];


    return (

        <div className="container mx-auto m-14"
             style={{display: "flex", flexDirection: 'column', alignItems: 'center'}}>
            <Head title={"Boutique"}/>
            <div style={{display: "flex", flexDirection: 'column'}}>

                <Filtre genres={genres} themes={themes} maxPrice={maxPrice} />
                <br/>

                <div>
                    {games.path.includes("recherche")?  <div>
                     <h1> Recherche:  {search}</h1>

                    </div> : null}{




                    games.data.length !== 0 ?
                        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-11">
                        {games.data && games.data.map((game, index) => (
                            <CarteProduit
                                key={game.id}
                                game={game}
                                index={index}
                            />
                        ))}
                    </div> :
                        games.path.includes("recherche")?
                        <div>
                            Aucun jeux avec {search} dans le nom!

                        </div>


                            : <div> <h1 className="font-bold size-18">Aucun jeu avec ce/ces paramètre(s) :</h1>   <ul>{


                                <ul>
                                    {initialGenres.concat(initialThemes).map((parametre, index) => (
                                        <li key={index}>{parametre}</li>
                                    ))}
                                </ul>


                            }
                            </ul></div>


                }
                    <br/>
                    <hr/>
                    <Pagination games={games}/>
                </div>



            </div>

        </div>
    );
}

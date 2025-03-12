import "./ListeJeux.css";
import { Carousel } from "primereact/carousel";
import { Link } from "@inertiajs/react";

export default function ListeJeux({ couvertures, visibleCount = 5 }) {
    const itemTemplate = (couverture) => {
        return (
            <div
                style={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                }}
            >
                <Link href={`/jeux/${couverture.game_id}`} className="jeu-card">

                    <img
                        src={`https://images.igdb.com/igdb/image/upload/t_cover_big/${couverture.cover_image_id}.png`}
                        alt="Jeu"
                        className="jeux-cover"
                    />
                        <div className="jeu-titre-prix">
                           <p className="text-titre" >{couverture.name}</p>
                            <br/>
                            <p className="text-titre">C$ {couverture.price}</p>
                        </div>

                </Link>

            </div>
        );
    };

    return (
        <div className="liste-jeux">
            <Carousel
                value={couvertures}
                itemTemplate={itemTemplate}
                numVisible={visibleCount}
                numScroll={visibleCount}
                circular
            />
        </div>
    );
}

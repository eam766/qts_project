import "./ListeJeux.css";
import { Carousel } from "primereact/carousel";
import "primereact/resources/themes/lara-light-indigo/theme.css";
import "primereact/resources/primereact.min.css";
import "primeicons/primeicons.css";
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
                <Link href={`/jeux/${couverture.id}`}>
                    <img
                        src={`https://images.igdb.com/igdb/image/upload/t_cover_big/${couverture.cover.image_id}.jpg`}
                        alt="Jeu"
                        className="jeux-cover"
                    />
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

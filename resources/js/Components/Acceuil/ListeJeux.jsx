import "./ListeJeux.css";

import { useState } from "react";

import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import { Link } from "@inertiajs/react";

export default function ListeJeux({ couvertures, visibleCount = 5 }) {
    const [index, setIndex] = useState(0);

    function toTheLeft() {
        setIndex((prevIndex) => (prevIndex + 1) % couvertures.length);
    }

    function toTheRight() {
        setIndex(
            (prevIndex) =>
                (prevIndex - 1 + couvertures.length) % couvertures.length
        );
    }

    let imagesAffichees = couvertures.slice(index, index + visibleCount);

    if (imagesAffichees.length < visibleCount) {
        imagesAffichees = imagesAffichees.concat(
            couvertures.slice(0, visibleCount - imagesAffichees.length)
        );
    }

    return (
        <div className="liste-jeux">
            <button onClick={toTheLeft}>
                <ArrowBackIosIcon />
            </button>
            <div className="jeux-container">
                {imagesAffichees.map((couverture, i) => (
                    <Link href={`/jeux/${couverture.id}`}>
                        <img
                            key={i}
                            src={`https://images.igdb.com/igdb/image/upload/t_cover_big/${couverture.cover.image_id}.jpg`}
                            alt="image"
                            className="jeux-cover"
                        />
                    </Link>
                ))}
            </div>

            <button onClick={toTheRight}>
                <ArrowForwardIosIcon />
            </button>
        </div>
    );
}

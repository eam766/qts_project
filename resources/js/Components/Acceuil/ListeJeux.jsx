import "./ListeJeux.css";
import { useState, useEffect } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { Link } from "@inertiajs/react";

import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";

export default function ListeJeux({ couvertures, visibleCount = 5 }) {
    const [index, setIndex] = useState(0);
    const totalImages = couvertures.length;

    // Fonction pour faire défiler vers la gauche
    function toTheLeft() {
        setIndex((prevIndex) =>
            prevIndex - visibleCount < 0
                ? totalImages - visibleCount // Reviens à la fin si trop à gauche
                : prevIndex - visibleCount
        );
    }

    // Fonction pour faire défiler vers la droite
    function toTheRight() {
        setIndex((prevIndex) =>
            prevIndex + visibleCount >= totalImages
                ? 0 // Reviens au début si trop à droite
                : prevIndex + visibleCount
        );
    }
    const imagesAffichees = [
        ...couvertures,
        ...couvertures, // Permet un effet de continuité
    ].slice(index, index + visibleCount);
    return (
        <div className="liste-jeux">
            <button onClick={toTheLeft} className="nav-button">
                <ArrowBackIosIcon />
            </button>

            <div className="jeux-container">
                {imagesAffichees.map((couverture) => (
                    <Link key={couverture.id} href={`/jeux/${couverture.id}`}>
                        <img
                            src={`https://images.igdb.com/igdb/image/upload/t_cover_big/${couverture.cover.image_id}.jpg`}
                            alt={couverture.name}
                            className="jeux-cover"
                        />
                    </Link>
                ))}
            </div>

            <button onClick={toTheRight} className="nav-button">
                <ArrowForwardIosIcon />
            </button>
        </div>
    );
}

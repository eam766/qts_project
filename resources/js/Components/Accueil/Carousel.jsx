import { useEffect, useState } from "react";
import { Link } from "@inertiajs/react";
import "./Carousel.css";
import { parseJson } from "../../../../utils/utils.js";

export default function Carousel({ temps, galleryImage }) {
    const [indexes, setIndexes] = useState([0, 1, 2]);
    const [centerIndex, setCenterIndex] = useState(1);
    const classes = ["left", "center", "right"];

    function changeImages() {
        setIndexes(([left, center, right]) => {
            const next = (right + 1) % galleryImage.length;
            setCenterIndex(right);
            return [center, right, next];
        });
    }

    useEffect(() => {
        const intervalID = setInterval(() => {
            changeImages();
        }, temps);
        return () => clearInterval(intervalID);
    }, [temps]);

    // Jeu "center" pour l’image de fond
    const bgGame = galleryImage[centerIndex];
    const bgArtworks = parseJson(bgGame.artworks) || [];
    const bgImage = bgArtworks.length > 0 ? bgArtworks[0] : null;

    return (
        <Link
            className="carousel-container"
            style={{
                backgroundImage: bgImage
                    ? `url("https://images.igdb.com/igdb/image/upload/t_1080p/${bgImage}.webp")`
                    : "none",
                opacity: 0.9,
            }}
            href={`/jeux/${bgGame.game_id}`}
        >
            {indexes.map((i, j) => {
                const game = galleryImage[i];
                const screenshots = parseJson(game.screenshots) || [];
                const images = screenshots.slice(0, 5);

                // État local pour l’image active (celle en grand)
                const [activeImage, setActiveImage] = useState(images[0]);

                // On NE dépend que de "game.id" pour réinitialiser
                //    Ainsi, tant que c’est le même jeu, le hover n’est pas écrasé.
                useEffect(() => {
                    setActiveImage(images[0]);
                }, [game.id]);

                return (
                    <div className={`card-container ${classes[j]}`} key={i}>
                        <img
                            src={`https://images.igdb.com/igdb/image/upload/t_cover_big/${game.cover_image_id}.webp`}
                            alt={game.slug}
                            className="card-img"
                        />
                        <div className="card-description">
                            <p className="card-text">{game.name}</p>
                            <div className="gallery-container">
                                <img
                                    src={
                                        activeImage
                                            ? `https://images.igdb.com/igdb/image/upload/t_1080p/${activeImage}.webp`
                                            : ""
                                    }
                                    alt="Image principale"
                                    className="main-image"
                                />
                                <div className="thumbnail-container">
                                    {images.map((image, idx) => (
                                        <img
                                            key={idx}
                                            src={`https://images.igdb.com/igdb/image/upload/t_screenshot_med/${image}.jpg`}
                                            alt={image}
                                            className="thumbnail"
                                            onMouseEnter={() =>
                                                setActiveImage(image)
                                            }
                                        />
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                );
            })}
        </Link>
    );
}

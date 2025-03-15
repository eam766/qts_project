import { useEffect, useState } from "react";
import { Link } from "@inertiajs/react";
import "./Carousel.css";
import { parseJson } from "../../../../utils/utils.js";

export default function Carousel({ temps, galleryImage }) {
    const [indexes, setIndexes] = useState([0, 1, 2]);
    const [centerIndex, setCenterIndex] = useState(1);
    const classes = ["left", "center", "right"];

    function changeImages() {
        setIndexes((prevIndexes) => {
            const newIndexes = prevIndexes.map(
                (index) => (index + 1) % galleryImage.length
            );
            setCenterIndex(newIndexes[1]);
            return newIndexes;
        });
    }

    useEffect(() => {
        const intervalID = setInterval(() => {
            changeImages();
        }, temps);

        return () => {
            clearInterval(intervalID);
        };
    }, [temps]);

    return (
        <Link
            className="carousel-container"
            style={{
                backgroundImage: `url("https://images.igdb.com/igdb/image/upload/t_1080p/${
                    parseJson(galleryImage[centerIndex].artworks)[0]
                }.webp")`,
                opacity: 0.9,
            }}
            href={`/jeux/${galleryImage[centerIndex].game_id}`}
        >
            {indexes.map((i, j) => {
                const images = parseJson(galleryImage[i].screenshots).slice(
                    0,
                    5
                );
                const [activeImage, setActiveImage] = useState(images[0]);

                useEffect(() => {
                    setActiveImage(images[0]);
                }, [i]);

                return (
                    <div className={`card-container ${classes[j]}`} key={j}>
                        <img
                            key={galleryImage[i].id}
                            src={`https://images.igdb.com/igdb/image/upload/t_cover_big/${galleryImage[i].cover_image_id}.webp`}
                            alt={galleryImage[i].slug}
                            className="card-img"
                        />
                        <div className="card-description">
                            <p className="card-text">{galleryImage[i].name}</p>
                            <div className="gallery-container">
                                <img
                                    src={`https://images.igdb.com/igdb/image/upload/t_1080p/${activeImage}.webp`}
                                    alt="Image principale"
                                    className="main-image"
                                />
                                <div className="thumbnail-container">
                                    {images.map((image, index) => (
                                        <img
                                            key={index}
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

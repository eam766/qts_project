import { useEffect, useState } from "react";
import { Link } from "@inertiajs/react";
import "./Carousel.css";
import {parseJson} from "../../../../utils/utils.js";
import { Galleria } from 'primereact/galleria';
export default function Carousel({ temps, galleryImage }) {
    const [indexes, setIndexes] = useState([0, 1, 2]);
    const classes = ["left", "center", "right"];

    function changeImages() {
        setIndexes((prevIndexes) =>
            prevIndexes.map((index) => (index + 1) % galleryImage.length)
        );
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
                    parseJson(galleryImage[indexes[1]].artworks)[0]
                }.webp")`,
            }}
            href={`/jeux/${galleryImage[indexes[1]].game_id}`}
        >
            {indexes.map((i, j) => {
                const images = parseJson(galleryImage[i].screenshots).slice(0, 4);
                const [activeImage, setActiveImage] = useState(images[0]);
                // Réinitialisation de l'image active à chaque changement de jeu
                useEffect(() => {
                    setActiveImage(images[0]);
                }, [i]);

                const itemTemplate = (image) => (
                    <img
                        src={`https://images.igdb.com/igdb/image/upload/t_1080p/${image}.webp`}
                        alt={image}
                        className="main-image"

                    />
                );

                const thumbnailTemplate = (image) => (
                    <img
                        src={`https://images.igdb.com/igdb/image/upload/t_screenshot_med/${image}.jpg`}
                        alt={image}

                        onMouseEnter={() => setActiveImage(image)}
                    />
                );

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
                            <Galleria
                                value={images}
                                numVisible={4}
                                showThumbnails
                                showItemNavigators={false}
                                showIndicators={false}
                                item={() => itemTemplate(activeImage)}
                                thumbnail={thumbnailTemplate}



                            />
                        </div>
                    </div>
                );
            })}
        </Link>
    );
}

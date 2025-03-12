import { useEffect, useState } from "react";
import { Link } from "@inertiajs/react";
import "./Carousel.css";
import {parseJson} from "../../../../utils/utils.js";
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
    });




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
            {indexes.map((i, j) => (
                <div className={`card-container ${classes[j]}`} key={j}>
                <img
                    key={galleryImage[i].id}
                    src={`https://images.igdb.com/igdb/image/upload/t_cover_big/${galleryImage[i].cover_image_id}.webp`}
                    alt={galleryImage[i].slug}
                    className="card-img"
                />
                    <div className="card-description" >
                        <p  className="card-text">
                            {galleryImage[i].name}
                        </p>

                        <p  className="card-text">
                            $CA {galleryImage[i].price}
                        </p>
                        <br/>
                        <p className="card-text">{galleryImage[i].summary}</p>



                    </div>

                </div>
            ))}
        </Link>
    );
}

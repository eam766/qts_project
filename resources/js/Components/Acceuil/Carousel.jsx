import { useEffect, useState } from "react";
import { Link } from "@inertiajs/react";
import "./Carousel.css";

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

    console.log(galleryImage);

    return (
        <div
            className="carousel-container"
            style={{
                backgroundImage: `url("https://images.igdb.com/igdb/image/upload/t_720p/ar2gn5.webp")`,
            }}
        >
            {indexes.map((i, j) => (
                <img
                    key={galleryImage[i].id}
                    src={`https://images.igdb.com/igdb/image/upload/t_cover_big/${galleryImage[i].cover.image_id}.jpg`}
                    alt={galleryImage[i].slug}
                    className={`carousel-image ${classes[j]}`}
                />
            ))}
        </div>
    );
}

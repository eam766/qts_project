import Carousel from "@/Components/Acceuil/Carousel";
import ListeJeux from "@/Components/Acceuil/ListeJeux";
import separation from "../assets/img/SeparationCarrousel3.png";
import titre_1 from "../assets/img/TitreCarrousel1.png";
import titre_2 from "../assets/img/TitreCarrousel2.png";
import Tableau from "@/Components/Acceuil/Tableau";

export default function Accueil({
    mostVisited,
    wantToPlay,
    playing,
    upcomingGames,
    topGames,
    trendingGames,
}) {
    let array = [
        "https://placehold.co/600x400/green/white",
        "https://placehold.co/600x400/red/white",
        "https://placehold.co/600x400/orange/white",
    ];

    let array1 = [
        "https://placehold.co/200x300/green/white",
        "https://placehold.co/200x300/red/white",
        "https://placehold.co/200x300/orange/white",
        "https://placehold.co/200x300/blue/white",
        "https://placehold.co/200x300/pink/white",
        "https://placehold.co/200x300/purple/white",
        "https://placehold.co/200x300/black/white",
        "https://placehold.co/200x300/grey/white",
        "https://placehold.co/200x300/brown/white",
    ];

    return (
        <div
            style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                position: "relative",
            }}
        >
            <Carousel temps={5000} galleryImage={trendingGames} />
            <div className="flex flex-col items-start">
                <img
                    className=" mt-10"
                    src={titre_2}
                    alt=""
                    width={440}
                    height={440}
                />
                <br />
                <ListeJeux couvertures={wantToPlay} />
            </div>
            <img
                className="m-6"
                src={separation}
                alt=""
                style={{ width: "auto", height: "auto" }}
            />
            <div className="flex flex-col items-start">
                <img
                    className="mb-4"
                    src={titre_1}
                    alt=""
                    width={500}
                    height={500}
                />
                <ListeJeux couvertures={playing} />
            </div>
            <div>
                <Tableau
                    upcomingGames={upcomingGames}
                    playing={playing}
                    topGames={topGames}
                />
            </div>
        </div>
    );
}

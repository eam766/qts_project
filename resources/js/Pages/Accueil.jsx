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
    console.log("Données reçues pour les visite:", mostVisited);
    console.log("Données reçues pour le want to play:", wantToPlay);
    console.log("Données reçues pour playing:", playing);
    console.log("Upcoming Games:", upcomingGames);
    console.log("Top Games", topGames);

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
                    className="m-4"
                    src={titre_2}
                    alt=""
                    width={440}
                    height={440}
                    style={{ width: 600, height: "auto" }}
                />{" "}
                <br />
                <ListeJeux couvertures={wantToPlay} />
            </div>
            <img
                className="m-4"
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
                    style={{ width: 600, height: "auto" }}
                />
                <ListeJeux couvertures={playing} />
            </div>
            <br />
            <div style={{ display: "flex", gap: 50 }}>
                <Tableau jeux={upcomingGames} />
                <Tableau jeux={playing} />
                <Tableau jeux={topGames} />
            </div>
        </div>
    );
}

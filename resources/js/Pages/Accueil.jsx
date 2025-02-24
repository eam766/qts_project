import Carousel from "@/Components/Acceuil/Carousel";
import ListeJeux from "@/Components/Acceuil/ListeJeux";
import separation from "../assets/img/SeparationCarrousel3.png";
import titre_1 from "../assets/img/TitreCarrousel1.png";
import titre_2 from "../assets/img/TitreCarrousel2.png";
import Tableau from "@/Components/Acceuil/Tableau";

export default function Accueil({
    wantToPlay,
    playing,
    upcomingGames,
    topGames,
    trendingGames,
}) {
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

                <Tableau jeux={topGames} />
            </div>
        </div>
    );
}

import Carousel from "@/Components/Acceuil/Carousel";
import ListeJeux from "@/Components/Acceuil/ListeJeux";
import separation from "../assets/img/SeparationCarrousel3.png";
import titre_1 from "../assets/img/TitreCarrousel1.png";
import titre_2 from "../assets/img/TitreCarrousel2.png";
import Tableau from "@/Components/Acceuil/Tableau";

export default function Accueil({

    upcomingGames, bestRatedGames,wantedGames, recentReleases,hiddenGems, cheapGames

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
            <Carousel temps={5000} galleryImage={bestRatedGames} />
            <div className="flex flex-col items-start">
                <img
                    className=" mt-10"
                    src={titre_2}
                    alt=""
                    width={440}
                    height={440}
                />
                <br />
                <ListeJeux couvertures={wantedGames} />
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
                <ListeJeux couvertures={recentReleases} />
            </div>
            <div>
                <Tableau
                    upcomingGames={upcomingGames}
                    playing={cheapGames}
                    topGames={hiddenGems}
                />
            </div>
        </div>
    );
}

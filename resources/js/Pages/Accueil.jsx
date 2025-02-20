import Carousel from "@/Components/Acceuil/Carousel";
import ListeJeux from "@/Components/Acceuil/ListeJeux";

export default function Accueil({ mostVisited, wantToPlay, playing }) {
    console.log("Données reçues pour les visite:", mostVisited);
    console.log("Données reçues pour le want to play:", wantToPlay);
    console.log("Données reçues pour playing:", playing);

    let uri =
        "https://letsenhance.io/static/73136da51c245e80edc6ccfe44888a99/1015f/MainBefore.jpg";

    return (
        <div
            style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                position: "relative",
            }}
        >
            <Carousel temps={5000} galleryImage={mostVisited} />

            <ListeJeux couvertures={wantToPlay} />
        </div>
    );
}

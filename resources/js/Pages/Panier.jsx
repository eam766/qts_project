import Carte from "../Components/Panier/Carte";
import Total from "../Components/Panier/Total";

export default function Panier() {
    return (
        <div
            className="flex flex-col items-start"
            style={{ fontFamily: "Audiowide" }}
        >
            <p className="AudioWideBlue mb-8" style={{ fontSize: 30 }}>
                Votre panier
            </p>
            <Carte></Carte>
            <br />
            <Carte></Carte>
            <br />
            <Carte></Carte>
            <br />
            <Total></Total>
        </div>
    );
}

import Carte from "../Components/ListeSouhaits/Carte";

export default function ListeSouhait() {
    return (
        <div
            className="flex flex-col items-start"
            style={{ fontFamily: "Audiowide" }}
        >
            <p className="AudioWideBlue mb-8" style={{ fontSize: 30 }}>
                'Identifiant' liste de souhaits
            </p>
            <Carte></Carte>
            <br />
            <Carte></Carte>
            <br />
            <Carte></Carte>
        </div>
    );
}

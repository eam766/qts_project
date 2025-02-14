import { Link } from "@inertiajs/react";
import bouton_inscription from "../../assets/img/Bouton_Inscription.png";
export default function ButtonCyber({ nomButton, chemin }) {
    return (
        <Link
            href={`/${chemin}`}
            className="mr-1"
            style={{
                backgroundImage: `url(${bouton_inscription})`,
                backgroundRepeat: "no-repeat",
                backgroundPosition: "center",
                backgroundSize: "cover",
                border: "none",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                width: "170px",
                height: "40px",
                textDecoration: "none", // Ensure it looks like a button
                color: "white", // Set text color
                fontWeight: "bold",
            }}
        >
            {nomButton}
        </Link>
    );
}

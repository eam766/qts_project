import { Link } from "@inertiajs/react";
import bouton_connexion from "../assets/img/Bouton_Connexion4.png";
export default function ConnectionLink() {
    return (
        <Link
            style={{
                backgroundImage: `url(${bouton_connexion})`,
                backgroundRepeat: "no-repeat",
                backgroundPosition: "center",
                backgroundSize: "cover",
                border: "none",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                height: "40px",
                width: "170px",
            }}
            href="/connexion"
        >
            Connexion
        </Link>
    );
}

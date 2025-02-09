import { Link } from "@inertiajs/react";
import bouton_inscription from "../assets/img/Bouton_Inscription.png";
export default function RegistrationLink() {
    return (
        <Link
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
            }}
            className="mr-1"
            href="/inscription"
        >
            Inscription
        </Link>
    );
}

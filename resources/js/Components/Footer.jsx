import footer_corner from "../assets/img/Footer_Corner3.png";
import { Link } from "@inertiajs/react";

export default function Footer() {
    return (
        <>
            <footer
                className="ml-5 mt-6"
                style={{
                    width: "100%",

                    position: "relative",
                }}
            >
                <img
                    src={footer_corner}
                    alt=""
                    width={500}
                    height={300}
                    style={{ width: 400, height: "auto" }}
                />

                <span
                    style={{
                        position: "absolute",
                        top: "50%", // Centre verticalement
                        left: "50%", // Centre horizontalement
                        transform: "translate(-50%, -50%)", // Ajuste pour centrer exactement
                        display: "flex",
                        gap: "20px", // Ajoute de l'espace entre les liens
                        fontSize: "20px",
                        justifyContent: "space-evenly",
                        padding: "10px 20px",
                        borderRadius: "10px",
                    }}
                >
                    <Link style={{ color: "white", textDecoration: "none" }}>
                        Contact
                    </Link>
                    <Link style={{ color: "white", textDecoration: "none" }}>
                        Notre Équipe
                    </Link>
                    <Link style={{ color: "white", textDecoration: "none" }}>
                        À propos
                    </Link>
                    <Link style={{ color: "white", textDecoration: "none" }}>
                        Préférences cookies
                    </Link>
                </span>

                <p className="text-xs text-center mb-5">
                    @ QTS Montréal. Tous droits réservés. Toutes les marques
                    commerciales et déposées sont la propriété de leurs
                    propriétaires respectifs.
                </p>
            </footer>
        </>
    );
}

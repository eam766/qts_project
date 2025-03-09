import footer_corner from "../../assets/img/Footer_Corner3.png";
import fleches from "../../assets/img/Fleches.png";
import logo from "../../assets/img/FrogLogo.png";
import { BsTwitterX } from "react-icons/bs";
import { FaFacebookF } from "react-icons/fa";
import { FaDiscord } from "react-icons/fa";
import { FaInstagram } from "react-icons/fa";
import { FaYoutube } from "react-icons/fa";
import { Link } from "@inertiajs/react";

export default function Footer() {
    return (
        <>
            <footer className="flex items-center justify-center relative w-full h-[180px] overflow-hidden">
                <img
                    src={footer_corner}
                    alt=""
                    height={300}
                    width={300}
                    className="absolute left-2"
                />

                <div className="flex flex-col self-end w-full mx-auto items-center text-center mb-3">
                    <div className="flex flex-row items-center">
                        <img
                            src={logo}
                            alt=""
                            className="mr-12"
                            style={{ height: "50px", width: "50px" }}
                        />
                        <p className="text-sm tracking-widest">
                            <Link className="footer-link" href="/">
                                Accueil
                            </Link>{" "}
                            |{" "}
                            <Link className="footer-link" href="/boutique">
                                Boutique
                            </Link>{" "}
                            |{" "}
                            <Link className="footer-link" href="/inscription">
                                Inscription
                            </Link>{" "}
                            |{" "}
                            <Link className="footer-link" href="/connexion">
                                Connexion
                            </Link>
                            <p className="mt-3">
                                <Link className="footer-link" href="/a_propos">
                                    À propos
                                </Link>{" "}
                                |{" "}
                                <Link className="footer-link" href="/contact">
                                    Contact
                                </Link>{" "}
                                |{" "}
                                <Link className="footer-link" href="/equipe">
                                    Notre Équipe
                                </Link>{" "}
                                |{" "}
                                <Link
                                    className="footer-link"
                                    href="/politique_cookies"
                                >
                                    Politique cookies
                                </Link>
                            </p>
                        </p>
                    </div>
                    <p className="text-xs mt-4">
                        @ QTS Montréal. Tous droits réservés. Toutes les marques
                        commerciales et déposées sont la propriété de leurs
                        propriétaires respectifs.
                    </p>
                </div>

                <div className="absolute right-2 bottom-2 flex gap-10 items-center">
                    <div className="flex flex-row gap-2 mt-5">
                        <Link className="footer-link">
                            <FaFacebookF
                                style={{ height: "17px", width: "17px" }}
                            />
                        </Link>
                        <Link className="footer-link">
                            <BsTwitterX
                                style={{ height: "17px", width: "17px" }}
                            />
                        </Link>
                        <Link className="footer-link">
                            <FaDiscord
                                style={{ height: "20px", width: "20px" }}
                            />
                        </Link>
                        <Link className="footer-link">
                            <FaInstagram
                                style={{ height: "20px", width: "20px" }}
                            />
                        </Link>
                        <Link className="footer-link">
                            <FaYoutube
                                style={{ height: "20px", width: "20px" }}
                            />
                        </Link>
                    </div>
                    <img
                        src={fleches}
                        alt=""
                        style={{
                            height: "110px",
                            width: "45px",
                        }}
                    />
                </div>
            </footer>
        </>
    );
}

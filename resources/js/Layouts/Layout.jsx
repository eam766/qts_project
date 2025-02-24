import { Link } from "@inertiajs/react";
import main_border from "../assets/img/Main_Bordure17.png";

import Logo from "@/Components/Logo";
import SearchBar from "@/Components/SearchBar";
import CookieBanner from "@/Components/CookieBanner";
import Footer from "@/Components/Footer";
import { StrictMode } from "react";

export default function Layout({ children }) {
    return (
        <>
            <StrictMode>
                <header className="flex flex-row items-center ">
                    <Logo />
                    <nav className="flex flex-row items-center">
                        <div className="flex justify-evenly basis-1/3 text-lg">
                            <Link href="/">Accueil</Link>
                            <Link href="/boutique">Boutique</Link>
                            <Link href="/a_propos">À propos</Link>
                        </div>
                        <SearchBar />
                        <div className="flex justify-center basis-1/3">
                            <Link
                                className="buttonLeft mr-1"
                                href="/inscription"
                            >
                                Inscription
                            </Link>
                            <Link className="buttonRight" href="/connexion">
                                Connexion
                            </Link>
                        </div>
                    </nav>
                </header>

                <main className="flex justify-center mt-10 min-h-screen">
                    <div
                        style={{
                            backgroundImage: `url(${main_border})`,
                            backgroundRepeat: "no-repeat",
                            backgroundSize: "100% 100%",
                            backgroundPosition: "center",
                            width: "98%",
                            height: "auto",
                            padding: "20px",
                            paddingTop: "130px",
                        }}
                    >
                        {children}
                    </div>
                </main>
                <Footer />
                <CookieBanner />
            </StrictMode>
        </>
    );
}

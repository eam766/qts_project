import { Link } from "@inertiajs/react";
import main_border from "../assets/img/Main_Bordure20.png";
import Logo from "@/Components/LayoutC/Logo";
import SearchBar from "@/Components/LayoutC/SearchBar";
import CookieBanner from "@/Components/LayoutC/CookieBanner";
import Footer from "@/Components/LayoutC/Footer";
import { StrictMode } from "react";

export default function Layout({ children }) {
    return (
        <>
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
                        <Link className="buttonLeft mr-1" href="/inscription">
                            Inscription
                        </Link>
                        <Link className="buttonRight" href="/connexion">
                            Connexion
                        </Link>
                    </div>
                </nav>
            </header>

            <main className="flex justify-center min-h-screen">
                <div className="main-container">{children}</div>
            </main>

            <CookieBanner />
            <Footer></Footer>
        </>
    );
}

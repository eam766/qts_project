import { usePage, router, Link } from "@inertiajs/react";
import main_border from "../assets/img/Main_Bordure20.png";

import Logo from "@/Components/Logo";
import SearchBar from "@/Components/SearchBar";
import CookieBanner from "@/Components/CookieBanner";
import Footer from "@/Components/Footer";
import { StrictMode } from "react";
import { FaHeart, FaShoppingCart } from "react-icons/fa";

export default function Layout({ children }) {
    const { auth } = usePage().props;
    const user = auth.user; // Récupérer l'utilisateur connecté

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
                        {user ? (
                            <>
                                <div className="flex justify-center basis-1/3 gap-4">
                                    {" "}
                                    <Link
                                        href="/listeSouhaits"
                                        className="text-xl"
                                    >
                                        <FaHeart
                                            className="text-white hover:text-red-500"
                                            size={28}
                                        />
                                    </Link>
                                    <Link href="/panier" className="text-xl">
                                        <FaShoppingCart
                                            className="text-white hover:text-yellow-500"
                                            size={28}
                                        />
                                    </Link>
                                </div>

                                <Link
                                    className="buttonLeft mr-1"
                                    href="/profile"
                                >
                                    Profil
                                </Link>
                                <button
                                    className="buttonRight"
                                    onClick={() => router.post(route("logout"))}
                                >
                                    Déconnexion
                                </button>
                            </>
                        ) : (
                            <>
                                <Link
                                    className="buttonLeft mr-1"
                                    href="/inscription"
                                >
                                    Inscription
                                </Link>
                                <Link className="buttonRight" href="/connexion">
                                    Connexion
                                </Link>
                            </>
                        )}
                    </div>
                </nav>
            </header>

            <main className="flex justify-center min-h-screen">
                <div className="main-container">{children}</div>
            </main>
            <Footer></Footer>
            <CookieBanner />
        </>
    );
}

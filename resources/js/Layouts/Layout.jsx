import { Link } from "@inertiajs/react";
import main_border from "../assets/img/Main_Bordure18.png";
import footer_corner from "../assets/img/Footer_Corner3.png";
import Logo from "@/Components/Logo";
import SearchBar from "@/Components/SearchBar";
import CookieBanner from "@/Components/CookieBanner";

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
            <footer className=" ml-5 mt-6" style={{ position: "absolute" }}>
                <img src={footer_corner} alt="" height={300} width={300} />
                <p className="text-xs text-center mb-5">
                    @ QTS Montréal. Tout droit réservés. Toutes les marques
                    commerciales et marques déposées sont la propriété de leurs
                    propriétaires respectifs.
                </p>
            </footer>
            <CookieBanner></CookieBanner>
        </>
    );
}

import { Link } from "@inertiajs/react";
import main_border from "../assets/img/Main_Bordure17.png";
import footer_corner from "../assets/img/Footer_Corner3.png";
import Logo from "@/Components/Logo";
import SearchBar from "@/Components/SearchBar";
import RegistrationLink from "@/Components/RegistrationLink";
import ConnectionLink from "@/Components/ConnectionLink";

export default function Layout({ children }) {
    return (
        <>
            <header className="flex flex-row items-center ">
                <Logo />
                <nav className="flex flex-row items-center">
                    <div className="flex justify-evenly basis-1/3">
                        <Link href="/">Accueil</Link>
                        <Link href="/boutique">Boutique</Link>
                        <Link href="/a_propos">À propos</Link>
                    </div>
                    <SearchBar />
                    <div className="flex justify-center basis-1/3">
                        <RegistrationLink />
                        <ConnectionLink />
                    </div>
                </nav>
            </header>

            <main className="flex justify-center mt-10 ">
                <div
                    style={{
                        backgroundImage: `url(${main_border})`,
                        backgroundRepeat: "no-repeat",
                        backgroundSize: "100% 100%",
                        backgroundPosition: "center",
                        width: "98%",
                        minHeight: "300px",
                        aspectRatio: "16 / 9",
                        padding: "20px",
                        paddingTop: "130px",
                    }}
                >
                    {children}
                </div>
            </main>
            <footer className=" ml-5 mt-6">
                <img src={footer_corner} alt="" height={300} width={300} />
                <p className="text-xs text-center mb-5">
                    @ QTS Montréal. Tout droit réservés. Toutes les marques
                    commerciales et marques déposées sont la propriété de leurs
                    propriétaires respectifs.
                </p>
            </footer>
        </>
    );
}

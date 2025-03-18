import { usePage, router, Link } from "@inertiajs/react";
import Logo from "@/Components/LayoutC/Logo";
import SearchBar from "@/Components/LayoutC/SearchBar";
import CookieBanner from "@/Components/LayoutC/CookieBanner";
import Footer from "@/Components/LayoutC/Footer";
import { FaHeart, FaShoppingCart } from "react-icons/fa";
import { useEffect, useState } from "react";
import axios from "axios";

export default function Layout({ children, games }) {
    const { auth } = usePage().props;
    const user = auth.user;
    // Récupérer l'utilisateur connecté
    const [wishlistGames, setWishlistGames] = useState([]);
    const [cartGames, setCartGames] = useState([]);


    useEffect(() => {
        if (user) {
            axios
                .get(route("wishlist.data"))
                .then((response) => {
                    setWishlistGames(response.data.wishlistGames);
                })
                .catch((error) =>
                    console.error("Erreur chargement wishlist:", error)
                );
            axios
                .get(route("cart.data"))
                .then((response) => {
                    setCartGames(response.data.cartGames);
                })
                .catch((error) =>
                    console.error("Erreur chargement cart:", error)
                );
        }
    }, [user]);

    const wishlistCount = wishlistGames.length;
    const cartCount = cartGames.length;


    return (
        <>
            <header className="flex flex-row items-center ">
                <Logo />
                <nav className="flex flex-row items-center">
                    <div className="flex justify-evenly basis-1/5 text-lg">
                        <Link href="/">Accueil</Link>
                        <Link href="/boutique">Boutique</Link>
                    </div>
                    <SearchBar />
                    <div className="flex ml-auto mr-2">
                        {user ? (
                            <>
                                <div className="flex justify-center ">
                                    <div className="flex justify-center">
                                        <div className="flex flex-row gap-4 mr-5">
                                            {/* Wishlist */}
                                            <Link
                                                href="/listeSouhaits"
                                                className="text-xl relative"
                                            >
                                                <FaHeart
                                                    className="text-white hover:text-red-500"
                                                    size={28}
                                                />
                                                {wishlistCount > 0 && (
                                                    <span className=" absolute top-0 right-0 transform translate-x-2 -translate-y-2 bg-[#02d7f2] text-black text-xs rounded-full px-2">
                                                        {wishlistCount}
                                                    </span>
                                                )}
                                            </Link>

                                            {/* Panier */}
                                            <Link
                                                href="/panier"
                                                className="text-xl relative"
                                            >
                                                <FaShoppingCart
                                                    className="text-white hover:text-yellow-500"
                                                    size={28}
                                                />
                                                {cartCount > 0 && (
                                                    <span className="absolute top-0 right-0 transform translate-x-2 -translate-y-2 bg-[#02d7f2] text-black text-xs rounded-full px-2">
                                                        {cartCount}
                                                    </span>
                                                )}
                                            </Link>
                                        </div>
                                    </div>

                                    <Link
                                        className="buttonLeft mr-1"
                                        href="/profil"
                                    >
                                        Profil
                                    </Link>
                                    <button
                                        className="buttonRight"
                                        onClick={() =>
                                            router.post(route("logout"))
                                        }
                                    >
                                        Déconnexion
                                    </button>
                                </div>
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
            <CookieBanner />
            <Footer></Footer>
        </>
    );
}

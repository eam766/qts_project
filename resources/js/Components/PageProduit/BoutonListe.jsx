import "./Bouton.css";
import { LuHeart } from "react-icons/lu";

export default function BoutonListe({ inWishlist, wishlistLoading, onPress }) {
    return (
        <button
            className={`AudioWideBlue text-xl mt-2 buttonAdd ${
                wishlistLoading ? "opacity-50 cursor-not-allowed" : ""
            }`}
            onClick={onPress}
            disabled={wishlistLoading} // ✅ Désactive temporairement
        >
            <LuHeart
                className={`mr-4 transition-colors duration-300 pl-1 ${
                    inWishlist ? "text-red-500" : "AudioWideBlue"
                }`}
            />
            {wishlistLoading
                ? inWishlist
                    ? "Retrait en cours..."
                    : "Ajout en cours..."
                : inWishlist
                ? "Dans votre liste de souhaits"
                : "Ajouter à votre liste de souhaits"}
        </button>
    );
}

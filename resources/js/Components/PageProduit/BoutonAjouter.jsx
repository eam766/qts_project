import { FaCartArrowDown } from "react-icons/fa";
import "./Bouton.css";

export default function BoutonAjouter({ inCart, cartLoading, onPress }) {
    return (
        <button
            className={`AudioWideBlue text-xl buttonAdd ${
                cartLoading ? "opacity-50 cursor-not-allowed" : ""
            }`}
            onClick={onPress}
            disabled={cartLoading}
        >
            <FaCartArrowDown
                className={`mr-4 transition-colors duration-300 ${
                    inCart ? "text-yellow-500" : "AudioWideBlue"
                }`}
            />
            {cartLoading
                ? inCart
                    ? "Retrait en cours..."
                    : "Ajout en cours..."
                : inCart
                ? "Ajouter au panier"
                : "Dans votre panier"}
        </button>
    );
}

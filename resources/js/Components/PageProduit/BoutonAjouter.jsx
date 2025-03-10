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
            <FaCartArrowDown className="mr-4" />
            {cartLoading
                ? "Ajout en cours..."
                : inCart
                ? "Dans le panier"
                : "Ajouter au panier"}
        </button>
    );
}

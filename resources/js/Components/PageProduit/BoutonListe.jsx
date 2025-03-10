import "./Bouton.css";
import { LuHeart } from "react-icons/lu";
export default function BoutonListe({ inWishlist, onPress }) {
    return (
        <button
            className="AudioWideBlue text-xl mt-2 buttonAdd"
            onClick={onPress}
        >
            <LuHeart className={`mr-4 ${inWishlist ? "text-red-500" : ""}`} />
            {inWishlist
                ? "Dans la liste de souhaits"
                : "Ajouter à la liste de souhaits"}
        </button>
    );
}

import { FaCartArrowDown } from "react-icons/fa";
import "./Bouton.css";
export default function BoutonAjouter() {
    return (
        <button className="AudioWideBlue text-xl buttonAdd">
            <FaCartArrowDown className="mr-4" />
            Ajouter au panier
        </button>
    );
}

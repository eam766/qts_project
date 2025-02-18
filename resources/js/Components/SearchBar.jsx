import barre_recherche from "../assets/img/Barre_de_Recherche3.png";
import { FaSearch } from "react-icons/fa";

export default function SearchBar() {
    return (
        <div className="relative flex basis-1/3 justify-end">
            <input
                style={{
                    backgroundImage: `url(${barre_recherche})`,
                    backgroundRepeat: "no-repeat",
                    backgroundPosition: "center",
                    backgroundSize: "cover",
                    border: "none",
                    height: "40px",
                    width: "250px",
                    paddingRight: "40px",
                }}
                className="bg-transparent text-white w-100"
                type="text"
                placeholder="Recherche"
            />
            <FaSearch
                className="absolute right-3 top-1/2 transform -translate-y-1/2 mr-3 "
                style={{ color: "#02d7f2" }}
            />
        </div>
    );
}

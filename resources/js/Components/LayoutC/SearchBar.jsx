import barre_recherche from "../../assets/img/Barre_de_Recherche3.png";
import { FaSearch } from "react-icons/fa";

export default function SearchBar() {
    return (
        <div className="relative flex items-center w-[250px]">
            <input
                style={{
                    backgroundImage: `url(${barre_recherche})`,
                    backgroundRepeat: "no-repeat",
                    backgroundPosition: "center",
                    backgroundSize: "cover",
                    border: "none",
                    height: "40px",
                    width: "100%",
                    paddingRight: "40px",
                }}
                className="bg-transparent text-white"
                type="text"
                placeholder="Recherche"
            />
            <FaSearch
                className="absolute right-4 top-1/2 transform -translate-y-1/2"
                style={{ color: "#02d7f2" }}
            />
        </div>
    );
}

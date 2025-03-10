import barre_recherche from "../../assets/img/Barre_de_Recherche3.png";
import { FaSearch } from "react-icons/fa";
import { router } from "@inertiajs/react";
import {useState} from "react";
//AJouter Autocomplete
export default function SearchBar(filters) {
    const [search, setSearch] = useState(filters.search || "");

    const handleSearch = (e) => {
        e.preventDefault();
        router.get(route("games.search"), { search }, { preserveState: true });
    };

    return (
        <form onSubmit={handleSearch} className="relative flex basis-1/3 justify-end">
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
                value={search}
                onChange={(e) => setSearch(e.target.value)}
            />
            <FaSearch
                className="absolute right-3 top-1/2 transform -translate-y-1/2 mr-3 "
                style={{ color: "#02d7f2" }}
            />
        </form>
    );
}

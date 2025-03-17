import barre_recherche from "../../assets/img/Barre_de_Recherche3.png";
import { FaSearch } from "react-icons/fa";
import { router } from "@inertiajs/react";
import { useState } from "react";
import { Button } from "@mui/material";
import IconButton from "@mui/material/IconButton";
export default function SearchBar(filters) {
    const [search, setSearch] = useState(filters.search || "");

    const handleSearch = (e) => {
        e.preventDefault();
        router.get(route("games.search"), { search }, { preserveState: true });
    };

    return (
        <form
            onSubmit={handleSearch}
            className="relative flex items-center w-[250px]"
        >
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
                value={search}
                onChange={(e) => setSearch(e.target.value)}
            />
            <IconButton
                color="primary"
                onClick={handleSearch}
                disableRipple={true}
            >
                <FaSearch
                    className="absolute right-9 top-1/2 transform -translate-y-1/2 hover:scale-95 "
                    style={{ color: "#02d7f2" }}
                />
            </IconButton>
        </form>
    );
}

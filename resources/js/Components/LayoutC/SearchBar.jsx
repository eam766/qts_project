
import { FaSearch } from "react-icons/fa";
import {Link, router} from "@inertiajs/react";
import { useEffect, useState } from "react";
import { AutoComplete } from 'primereact/autocomplete';
import IconButton from "@mui/material/IconButton";
import "./SearchBar.css"

export default function SearchBar({  }) {

    const [value, setValue] = useState('');
    const [games, setGames] = useState([]); // Stocke les jeux récupérés
    const [filteredGames, setFilteredGames] = useState([]); // Stocke les jeux filtrés

    useEffect(() => {
        fetch("/games-data")
            .then(res => res.json())
            .then(data => {
                setGames(data);
                setFilteredGames(data);
            })
            .catch(err => console.error("Erreur :", err));
    }, []);

    const search = (event) => {

        setTimeout(() => {
            let _filteredGames;

            if (!event.query.trim().length) {
                _filteredGames = [...games];
            } else {
                _filteredGames = games.filter((game) => {
                    return game.name.toLowerCase().includes(event.query.toLowerCase());
                });
            }

            setFilteredGames(_filteredGames.slice(0, 30));
        }, 250);
    };

    const handleSearch = (e) => {
        e.preventDefault();
        router.get(route("games.search"), { search: value }, { preserveState: true });
        setValue("")
    };

    const itemTemplate = (item) => {
        return (
            <Link style={{ minWidth: 200, height: 100 }} href={`/jeux/${item.game_id}`}>
                <div className="game-suggestions">
                    <img src={`https://images.igdb.com/igdb/image/upload/t_cover_small/${item.cover_image_id}.jpg`} style={{ width: 40, height: "auto", marginRight: 20 }} alt={item.cover_image_id} />{item.name}
                </div>
            </Link>
        );
    };


    return (
        <form onSubmit={handleSearch} className="relative flex items-center w-[250px]">
            <AutoComplete
                value={value}
                suggestions={filteredGames}
                completeMethod={search}
                onChange={(e) => setValue(e.value)}
                placeholder="Recherche"
                itemTemplate={itemTemplate}
                field="name"


            />
            <IconButton color="primary" onClick={handleSearch} disableRipple={true}>
                <FaSearch
                    className="absolute right-9 top-1/2 transform -translate-y-1/2 hover:scale-95"
                    style={{ color: "#02d7f2" }}
                />
            </IconButton>
        </form>
    );
}

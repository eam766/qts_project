import "./Tableau.css";
import { DataView, DataViewLayoutOptions } from "primereact/dataview";
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";
import IconButton from "@mui/material/IconButton";
import { Link } from "@inertiajs/react";
import { Tooltip } from "@mui/material";
import PlaylistAddIcon from "@mui/icons-material/PlaylistAdd";

export default function Tableau({ jeux }) {
    const itemTemplate = (jeu, index) => {
        return (
            <div key={jeu.id}>
                <div className="card">
                    <Link className="card-link" href={`/jeux/${jeu.id}`}>
                        <img
                            src={`https://images.igdb.com/igdb/image/upload/t_cover_small/${jeu.cover.image_id}.webp`}
                            loading="lazy"
                            alt={jeu.name}
                        />
                        <div>
                            <h1>{jeu.name}</h1>
                            <div>19.99</div>
                        </div>
                    </Link>
                    <div>
                        <Tooltip title="Ajoute à la liste de souhait">
                            <IconButton>
                                <PlaylistAddIcon className="icons" />
                            </IconButton>
                        </Tooltip>
                        <Tooltip title="Ajouter au panier">
                            <IconButton
                                aria-label="Ajouter au panier"
                                className="icon-button"
                            >
                                <AddShoppingCartIcon className="icons" />
                            </IconButton>
                        </Tooltip>
                    </div>
                </div>
            </div>
        );
    };

    const listTemplate = (items) => {
        if (!items || items.length === 0) return null;

        let list = items.map((jeux, index) => {
            return itemTemplate(jeux, index);
        });

        return <div className="grid grid-nogutter">{list}</div>;
    };
    return (
        <div>
            <DataView
                value={jeux}
                listTemplate={listTemplate}
                className="custom-dataview-container"
            ></DataView>
        </div>
    );
}

// Dans Tableau.jsx (exemple complet)
import React from "react";
import PropTypes from "prop-types";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Box from "@mui/material/Box";
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";
import IconButton from "@mui/material/IconButton";
import { Link } from "@inertiajs/react";
import { Tooltip } from "@mui/material";
import PlaylistAddIcon from "@mui/icons-material/PlaylistAdd";
import "./Tableau.css";

// Composant pour le contenu d'un onglet
function CustomTabPanel(props) {
    const { children, value, index, ...other } = props;

    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`simple-tabpanel-${index}`}
            aria-labelledby={`simple-tab-${index}`}
            {...other}
        >
            {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
        </div>
    );
}

CustomTabPanel.propTypes = {
    children: PropTypes.node,
    index: PropTypes.number.isRequired,
    value: PropTypes.number.isRequired,
};

function a11yProps(index) {
    return {
        id: `simple-tab-${index}`,
        "aria-controls": `simple-tabpanel-${index}`,
    };
}

function JeuxList({ jeux }) {
    return (
        <div className="jeux-grid">
            {jeux &&
                jeux.map((jeu) => (
                    <div key={jeu.id} className="card">
                        <Link className="card-link" href={`/jeux/${jeu.id}`}>
                            <img
                                src={`https://images.igdb.com/igdb/image/upload/t_cover_big/${jeu.cover.image_id}.jpg`}
                                alt={jeu.name}
                                style={{
                                    width: 100,
                                    height: "auto",
                                    padding: 10,
                                }}
                            />
                            <div>
                                <h1>{jeu.name}</h1>
                                <div>19.99$</div>
                            </div>
                        </Link>
                        <div>
                            <Tooltip title="Ajouter à la liste de souhaits">
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
                ))}
        </div>
    );
}

JeuxList.propTypes = {
    jeux: PropTypes.array.isRequired,
};

export default function Tableau({ upcomingGames, playing, topGames }) {
    const [value, setValue] = React.useState(0);

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    return (
        <Box sx={{ width: "100%", marginTop: "20px" }}>
            <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
                <Tabs
                    value={value}
                    onChange={handleChange}
                    aria-label="Jeux par catégories"
                    TabIndicatorProps={{
                        style: { backgroundColor: "#02d7f2" },
                    }}
                    sx={{
                        "& .MuiTab-root": { color: "#383636" },
                        "& .MuiTab-root.Mui-selected": { color: "#02d7f2" },
                    }}
                >
                    <Tab
                        label="Les sorties les plus attendues"
                        {...a11yProps(0)}
                    />
                    <Tab label="Les succès du moment" {...a11yProps(1)} />
                    <Tab label="Les mieux notés" {...a11yProps(2)} />
                </Tabs>
            </Box>
            <CustomTabPanel value={value} index={0}>
                <JeuxList jeux={upcomingGames} />
            </CustomTabPanel>
            <CustomTabPanel value={value} index={1}>
                <JeuxList jeux={playing} />
            </CustomTabPanel>
            <CustomTabPanel value={value} index={2}>
                <JeuxList jeux={topGames} />
            </CustomTabPanel>
        </Box>
    );
}

Tableau.propTypes = {
    upcomingGames: PropTypes.array.isRequired,
    playing: PropTypes.array.isRequired,
    topGames: PropTypes.array.isRequired,
};

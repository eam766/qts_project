// Dans Tableau.jsx (exemple complet)
import React, { useState } from "react";
import PropTypes from "prop-types";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Box from "@mui/material/Box";
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";
import IconButton from "@mui/material/IconButton";
import { Link, usePage, router } from "@inertiajs/react";
import { Tooltip } from "@mui/material";
import PlaylistAddIcon from "@mui/icons-material/PlaylistAdd";
import "./Tableau.css";
import { motion } from "framer-motion";
import { parseJson } from "../../../../utils/utils.js";

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
    const { auth, wishlistGames } = usePage().props;
    const user = auth.user;
    const [wishlist, setWishlist] = useState(wishlistGames || []);

    const toggleWishlist = (gameId) => {
        if (!user) {
            router.visit("/connexion");
            return;
        }

        const isInWishlist = wishlist.includes(gameId);

        if (isInWishlist) {
            router.delete(route("wishlist.destroy"), {
                data: { game_id: gameId },
                preserveState: true,
                preserveScroll: true,
                onSuccess: () => {
                    setWishlist((prev) => prev.filter((id) => id !== gameId));
                },
                onError: () => {
                    console.error("Erreur lors de la suppression du jeu.");
                },
            });
        } else {
            router.post(
                route("wishlist.store"),
                { game_id: gameId },
                {
                    preserveState: true,
                    preserveScroll: true,
                    onSuccess: () => {
                        setWishlist((prev) => [...prev, gameId]);
                    },
                    onError: () => {
                        console.error("Erreur lors de l'ajout à la wishlist.");
                    },
                }
            );
        }
    };

    return (
        <div className="jeux-grid">
            {jeux &&
                jeux.map((jeu) => {
                    const isInWishlist = wishlist.includes(jeu.game_id);
                    return (
                        <div key={jeu.game_id} className="card">
                            <Link
                                className="card-link"
                                href={`/jeux/${jeu.game_id}`}
                            >
                                <img
                                    src={`https://images.igdb.com/igdb/image/upload/t_cover_big/${jeu.cover_image_id}.jpg`}
                                    alt={jeu.name}
                                    style={{
                                        width: 100,
                                        height: "auto",
                                        padding: 10,
                                    }}
                                />
                                <div>
                                    <h1>{jeu.name}</h1>
                                    <div>{jeu.price}</div>
                                </div>
                            </Link>
                            <div>
                                <Tooltip title="Ajouter à la liste de souhaits">
                                    <motion.div
                                        whileTap={{ scale: 0.8 }} // 🔥 Effet de "pouls" au clic
                                        animate={{
                                            rotate: wishlist.includes(jeu.id)
                                                ? 360
                                                : 0,
                                        }} // 🔥 Tourne à 360° quand ajouté
                                        transition={{
                                            type: "spring",
                                            stiffness: 200,
                                            damping: 10,
                                        }}
                                    >
                                        <IconButton
                                            onClick={() =>
                                                toggleWishlist(jeu.game_id)
                                            }
                                        >
                                            <PlaylistAddIcon
                                                className="icons"
                                                style={{
                                                    color: wishlist.includes(
                                                        jeu.game_id
                                                    )
                                                        ? "#FF007F"
                                                        : "#02d7f2",
                                                }}
                                            />
                                        </IconButton>
                                    </motion.div>
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
                    );
                })}
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
                    <Tab label="Sorties les plus attendues" {...a11yProps(0)} />
                    <Tab label="Le fun sans se ruiner" {...a11yProps(1)} />
                    <Tab label="Sous le radar" {...a11yProps(2)} />
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

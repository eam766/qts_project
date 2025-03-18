import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Box from "@mui/material/Box";
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";
import IconButton from "@mui/material/IconButton";
import { Link, usePage, router } from "@inertiajs/react";
import { Tooltip } from "@mui/material";
import PlaylistAddIcon from "@mui/icons-material/PlaylistAdd";
import { motion } from "framer-motion";
import axios from "axios";
import "./Tableau.css";

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
    const { auth } = usePage().props;
    const user = auth.user;

    const [wishlist, setWishlist] = useState([]);
    const [cart, setCart] = useState([]);
    const [library, setLibrary] = useState([]);

    // Charger les données depuis le backend au chargement
    useEffect(() => {
        if (user) {
            // Charger la wishlist
            axios
                .get(route("wishlist.data"))
                .then((res) => setWishlist(res.data.wishlistGames))
                .catch((err) => console.error("Erreur wishlist:", err));

            // Charger le panier
            axios
                .get(route("cart.data"))
                .then((res) => setCart(res.data.cartGames))
                .catch((err) => console.error("Erreur cart:", err));

            // Charger la library
            axios
                .get(route("library.data"))
                .then((res) => {
                    console.log(
                        "ALLO libraryEntries =>",
                        res.data.libraryEntries
                    );
                    setLibrary(res.data.libraryEntries);
                })
                .catch((err) => console.error("Erreur library:", err));
        }
    }, [user]);

    const isInLibrary = (gameId) =>
        Array.isArray(library) && library.includes(gameId);

    // Fonction pour gérer la liste de souhaits
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
                onSuccess: () =>
                    setWishlist((prev) => prev.filter((id) => id !== gameId)),
                onError: () => console.error("Erreur suppression wishlist."),
            });
        } else {
            router.post(
                route("wishlist.store"),
                { game_id: gameId },
                {
                    preserveState: true,
                    preserveScroll: true,
                    onSuccess: () => setWishlist((prev) => [...prev, gameId]),
                    onError: () => console.error("Erreur ajout wishlist."),
                }
            );
        }
    };

    // Fonction pour gérer le panier
    const toggleCart = (gameId) => {
        if (!user) {
            router.visit("/connexion");
            return;
        }

        const isInCart = cart.includes(gameId);

        if (isInCart) {
            router.delete(route("cart.destroy"), {
                data: { game_id: gameId },
                preserveState: true,
                preserveScroll: true,
                onSuccess: () =>
                    setCart((prev) => prev.filter((id) => id !== gameId)),
                onError: () => console.error("Erreur suppression panier."),
            });
        } else {
            router.post(
                route("cart.store"),
                { game_id: gameId },
                {
                    preserveState: true,
                    preserveScroll: true,
                    onSuccess: () => setCart((prev) => [...prev, gameId]),
                    onError: () => console.error("Erreur ajout panier."),
                }
            );
        }
    };
    console.log(route("bibliotheque"));
    return (
        <div className="jeux-grid">
            {jeux.map((jeu) => {
                const isInWishlist = wishlist.includes(jeu.id);
                const isInCart = cart.includes(jeu.id);
                const inLibrary = isInLibrary(jeu.id); // <-- Vérifie si le user possède déjà ce jeu

                return (
                    <div key={jeu.id} className="card">
                        {/* Lien vers la page détail */}
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
                                <div>C$ {jeu.price}</div>
                            </div>
                        </Link>

                        {/* Zone des boutons */}
                        <div style={{ display: "flex", gap: "8px" }}>
                            {/* --- WishList --- */}
                            {inLibrary ? (
                                /* Si le jeu est dans la library, on n'affiche pas "Ajouter à la wishlist" */
                                <Tooltip title="Vous possédez déjà ce jeu">
                                    <IconButton
                                        onClick={() =>
                                            router.visit(route("bibliotheque"))
                                        }
                                    >
                                        {/* Icône grisée ou autre */}
                                        <PlaylistAddIcon
                                            style={{ color: "gray" }}
                                        />
                                    </IconButton>
                                </Tooltip>
                            ) : (
                                /* Sinon, logique habituelle */
                                <Tooltip title="Ajouter à la liste de souhaits">
                                    <motion.div
                                        whileTap={{ scale: 0.8 }}
                                        animate={{
                                            rotate: isInWishlist ? 360 : 0,
                                        }}
                                        transition={{
                                            type: "spring",
                                            stiffness: 200,
                                            damping: 10,
                                        }}
                                    >
                                        <IconButton
                                            onClick={() =>
                                                toggleWishlist(jeu.id)
                                            }
                                        >
                                            <PlaylistAddIcon
                                                className="icons"
                                                style={{
                                                    color: isInWishlist
                                                        ? "#FF007F"
                                                        : "#02d7f2",
                                                }}
                                            />
                                        </IconButton>
                                    </motion.div>
                                </Tooltip>
                            )}

                            {/* --- Panier --- */}
                            {inLibrary ? (
                                /* Si le jeu est déjà possédé, on désactive ou on met un bouton "Dans la bibliothèque" */
                                <Tooltip title="Vous possédez déjà ce jeu">
                                    <IconButton
                                        onClick={() =>
                                            router.visit(route("bibliotheque"))
                                        }
                                    >
                                        <AddShoppingCartIcon
                                            style={{ color: "gray" }}
                                        />
                                    </IconButton>
                                </Tooltip>
                            ) : (
                                /* Sinon, on affiche le bouton habituel du panier */
                                <Tooltip
                                    title={
                                        isInCart
                                            ? "Retirer du panier"
                                            : "Ajouter au panier"
                                    }
                                >
                                    <motion.div
                                        whileTap={{ scale: 0.8 }}
                                        animate={{ rotate: isInCart ? 720 : 0 }}
                                        transition={{
                                            type: "spring",
                                            stiffness: 200,
                                            damping: 10,
                                        }}
                                    >
                                        <IconButton
                                            onClick={() => toggleCart(jeu.id)}
                                        >
                                            <AddShoppingCartIcon
                                                className="icons"
                                                style={{
                                                    color: isInCart
                                                        ? "#FFA500"
                                                        : "#02d7f2",
                                                }}
                                            />
                                        </IconButton>
                                    </motion.div>
                                </Tooltip>
                            )}
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

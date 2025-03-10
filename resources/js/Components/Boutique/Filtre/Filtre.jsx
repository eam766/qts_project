import { useState, useEffect } from "react";
import Accordion from "@mui/material/Accordion";
import AccordionDetails from "@mui/material/AccordionDetails";
import AccordionSummary from "@mui/material/AccordionSummary";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import Typography from "@mui/material/Typography";
import Curseur from "@/Components/Boutique/Filtre/Components/Curseur.jsx";
import Checkboxes from "@/Components/Boutique/Filtre/Components/Checkboxes.jsx";
import { Button } from "@/Components/ui/button.jsx";
import { router } from '@inertiajs/react';

export default function Filtre({ genres, themes, maxPrice }) {
    const [filterState, setFilterState] = useState({
        genres: [],
        themes: [],
        price: [0, maxPrice]
    });

    useEffect(() => {
        const params = new URLSearchParams(window.location.search);

        const initialGenres = params.get('genres')?.split(',') || [];
        const initialThemes = params.get('themes')?.split(',') || [];
        const minPrice = Number(params.get('min_price')) || 0;
        const maxPriceParam = Number(params.get('max_price')) || maxPrice;

        setFilterState({
            genres: initialGenres,
            themes: initialThemes,
            price: [minPrice, maxPriceParam]
        });
    }, []);

    const handleFilterChange = (filterType, newValue) => {
        setFilterState(prevState => ({
            ...prevState,
            [filterType]: newValue
        }));
    };


    const handlePriceChange = (newPriceRange) => {
        handleFilterChange('price', newPriceRange);
    };


    const applyFilters = () => {
        const params = new URLSearchParams(window.location.search);


        if (filterState.genres.length > 0) {
            params.set('genres', filterState.genres.join(','));
        } else {
            params.delete('genres');
        }

        if (filterState.themes.length > 0) {
            params.set('themes', filterState.themes.join(','));
        } else {
            params.delete('themes');
        }

        if (filterState.price[0] > 0) {
            params.set('min_price', filterState.price[0]);
        } else {
            params.delete('min_price');
        }

        if (filterState.price[1] < maxPrice) {
            params.set('max_price', filterState.price[1]);
        } else {
            params.delete('max_price');
        }

        // Navigate with the new filter parameters
        router.get(route('games.filter'), Object.fromEntries(params));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        applyFilters();
    };

    return (
        <form
            style={{ display: "flex", flexDirection: "column", width: 400 }}
            onSubmit={handleSubmit}
        >
            <Accordion
                sx={{
                    background: "#121214",
                    border: 1,
                    borderColor: "#02D7F2",
                    color: "#02D7F2",
                    fontFamily: "Audiowide",
                }}
            >
                <AccordionSummary
                    expandIcon={<ExpandMoreIcon style={{ color: "#02D7F2" }} />}
                    aria-controls="panel1-content"
                    id="panel1-header"
                    style={{ height: 50 }}
                >
                    <Typography component="span">Prix</Typography>
                </AccordionSummary>
                <AccordionDetails>
                    <Curseur
                        maxPrice={maxPrice}
                        priceRange={filterState.price}
                        onPriceChange={handlePriceChange}
                    />
                </AccordionDetails>
            </Accordion>

            <Accordion
                sx={{
                    background: "#121214",
                    border: 1,
                    borderColor: "#02D7F2",
                    color: "#02D7F2",
                    fontFamily: "Audiowide",
                }}
            >
                <AccordionSummary
                    expandIcon={<ExpandMoreIcon style={{ color: "#02D7F2" }} />}
                    aria-controls="panel2-content"
                    id="panel2-header"
                    style={{ height: 50 }}
                >
                    <Typography component="span">Genres</Typography>
                </AccordionSummary>
                <AccordionDetails>
                    <Checkboxes
                        filters={genres}
                        filterType="genres"
                        selectedFilters={filterState.genres}
                        onFilterChange={handleFilterChange}
                    />
                </AccordionDetails>
            </Accordion>

            <Accordion
                sx={{
                    background: "#121214",
                    border: 1,
                    borderColor: "#02D7F2",
                    color: "#02D7F2",
                    fontFamily: "Audiowide",
                }}
            >
                <AccordionSummary
                    expandIcon={<ExpandMoreIcon style={{ color: "#02D7F2" }} />}
                    aria-controls="panel3-content"
                    id="panel3-header"
                    style={{ height: 50 }}
                >
                    <Typography component="span">Thèmes</Typography>
                </AccordionSummary>
                <AccordionDetails>
                    <Checkboxes
                        filters={themes}
                        filterType="themes"
                        selectedFilters={filterState.themes}
                        onFilterChange={handleFilterChange}
                    />
                </AccordionDetails>
            </Accordion>

            <Button
                variant="outlined"
                type="button"
                onClick={applyFilters}
                style={{
                    marginTop: '20px',
                    color: "#02D7F2",
                    border:"#02D7F2 1px solid"
                }}
            >
                Filtrer
            </Button>
        </form>
    );
}

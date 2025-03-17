import { useState, useEffect } from "react";
import Curseur from "@/Components/Boutique/Filtre/Components/Curseur.jsx";
import Checkboxes from "@/Components/Boutique/Filtre/Components/Checkboxes.jsx";
import { Button } from "@/Components/ui/button.jsx";
import { router } from "@inertiajs/react";
import StyledAccordion from "@/Components/Boutique/Filtre/StyledFilter.jsx";
import { Accordion, AccordionTab } from "primereact/accordion";

export default function Filtre({ genres, themes, maxPrice }) {
    const [filterState, setFilterState] = useState({
        genres: [],
        themes: [],
        prices: [0, Math.round(maxPrice)],
    });
    const [activeIndex, setActiveIndex] = useState([]);

    useEffect(() => {
        const params = new URLSearchParams(window.location.search);

        const initialGenres = params.get("genres")
            ? params.get("genres").split(",")
            : [];
        const initialThemes = params.get("themes")
            ? params.get("themes").split(",")
            : [];
        const initialPrices = params.get("prices")
            ? params.get("prices").split(",").map(Number)
            : [0, maxPrice];

        setFilterState({
            genres: initialGenres,
            themes: initialThemes,
            prices:
                initialPrices.length === 2
                    ? initialPrices
                    : [0, Math.round(maxPrice)],
        });
    }, [maxPrice]);

    const handleFilterChange = (filterType, newValue) => {
        setFilterState((prevState) => ({
            ...prevState,
            [filterType]: newValue,
        }));
    };

    const applyFilters = () => {
        const params = {};

        if (filterState.genres.length > 0) {
            params.genres = filterState.genres.join(",");
        }

        if (filterState.themes.length > 0) {
            params.themes = filterState.themes.join(",");
        }

        if (filterState.prices.length === 2) {
            params.prices = filterState.prices.join(",");
        }

        router.get(route("games.filter"), params, { preserveState: true });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        applyFilters();

        setActiveIndex([]);
    };

    const emptyArray = () => {
        setFilterState({
            genres: [],
            themes: [],
            prices: [0, Math.round(maxPrice)],
        });

        router.get(route("games.filter"), {}, { preserveState: true });
    };

    return (
        <StyledAccordion>
            <form
                onSubmit={handleSubmit}
                style={{ position: "relative", height: 100, width: "80vw" }}
            >
                <Accordion
                    multiple
                    className="top-accordion"
                    activeIndex={activeIndex}
                    onTabChange={(e) => setActiveIndex(e.index)}
                >
                    <AccordionTab header="Filtre">
                        <Accordion multiple>
                            <AccordionTab header="Prix">
                                <Curseur
                                    maxPrice={maxPrice}
                                    selectedFilters={filterState.prices}
                                    onPriceChange={handleFilterChange}
                                />
                            </AccordionTab>

                            <AccordionTab header="Genres">
                                <Checkboxes
                                    filters={genres}
                                    filterType="genres"
                                    selectedFilters={filterState.genres}
                                    onFilterChange={handleFilterChange}
                                />
                            </AccordionTab>

                            <AccordionTab header="Thèmes">
                                <Checkboxes
                                    filters={themes}
                                    filterType="themes"
                                    selectedFilters={filterState.themes}
                                    onFilterChange={handleFilterChange}
                                />
                            </AccordionTab>
                        </Accordion>
                        <div className="gap-2 flex">
                            <Button
                                variant="outlined"
                                type="submit"
                                className="filter-button"
                            >
                                Filtrer
                            </Button>
                            <Button
                                variant="outlined"
                                type="button"
                                className="filter-button"
                                onClick={emptyArray}
                            >
                                Effacer filtre
                            </Button>
                        </div>
                    </AccordionTab>
                </Accordion>
            </form>
        </StyledAccordion>
    );
}

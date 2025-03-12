import Slider from "@mui/material/Slider";
import {useEffect, useState} from "react";
export default function Curseur({ maxPrice, onPriceChange, selectedFilters }) {
    function valuetext(value) {
        return `${value}`;
    }
    const minDistance = 10;


    const [value, setValue] = useState(selectedFilters.length === 2 ? selectedFilters : [0, Math.round(maxPrice)]);


    useEffect(() => {
        setValue(selectedFilters);
    }, [selectedFilters]);

    const handleChange = (event, newValue, activeThumb) => {
        if (!Array.isArray(newValue)) {
            return;
        }

        let updatedValue = [...value];

        if (activeThumb === 0) {
            updatedValue = [Math.min(newValue[0], value[1] - minDistance), value[1]];
        } else {
            updatedValue = [value[0], Math.max(newValue[1], value[0] + minDistance)];
        }

        setValue(updatedValue);
        onPriceChange("prices", updatedValue);
    };

    return (
        <Slider
            getAriaLabel={() => "Price Range"}
            value={value}
            max={Math.round(maxPrice)}
            onChange={handleChange}
            valueLabelDisplay="auto"
            getAriaValueText={valuetext}
            color="secondary"
            disableSwap
        />
    );
}

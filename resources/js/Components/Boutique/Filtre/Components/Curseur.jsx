import Slider from "@mui/material/Slider";
import {useState} from "react";

export default  function Curseur({maxPrice}) {
    function valuetext(value) {
        return `${value}°C`;
    }
    const minDistance = 10;

    const [value, setValue] = useState([0,10]);


    const handleChange = (event, newValue, activeThumb) => {
        if (!Array.isArray(newValue)) {
            return;
        }

        if (activeThumb === 0) {
            setValue([Math.min(newValue[0], value[1] - minDistance), value[1]]);
        } else {
            setValue([value[0], Math.max(newValue[1], value[0] + minDistance)]);
        }
    };

    return ( <Slider getAriaLabel={() => 'Price Range'}
                     value={value}
                     max={Math.round(maxPrice)}
                     onChange={handleChange}
                     valueLabelDisplay="auto"
                     getAriaValueText={valuetext} color="secondary"
                     disableSwap></Slider>);
}

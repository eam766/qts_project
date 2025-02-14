import React, { useEffect, useState } from "react";
import Select from "react-select";
import BgInput from "../assets/img/ConnexionInput.png";

export default function CountrySelect() {
    const [countries, setCountries] = useState([]);
    const [selectedCountry, setSelectedCountry] = useState({});

    useEffect(() => {
        fetch(
            "https://valid.layercode.workers.dev/list/countries?format=select&flags=true&value=code"
        )
            .then((response) => response.json())
            .then((data) => {
                setCountries(data.countries);
                setSelectedCountry(data.userSelectValue);
            });
    }, []);

    const customStyles = {
        control: (provided) => ({
            ...provided,
            backgroundImage: `url(${BgInput})`,
            backgroundRepeat: "no-repeat",
            backgroundPosition: "center",
            backgroundSize: "cover",
            fontFamily: "Orbitron",
            border: "none",
            height: "40px",
            width: "360px",
            color: "white",
            backgroundColor: "transparent",
        }),
        singleValue: (provided) => ({
            ...provided,
            color: "white",
        }),
        menu: (provided) => ({
            ...provided,
            backgroundColor: "#222",
        }),
        option: (provided, state) => ({
            ...provided,
            backgroundColor: state.isFocused ? "#02d7f2" : "transparent",
            color: "white",
            cursor: "pointer",
        }),
    };

    return (
        <Select
            styles={customStyles}
            options={countries}
            value={selectedCountry}
            onChange={(selectedOption) => setSelectedCountry(selectedOption)}
        />
    );
}

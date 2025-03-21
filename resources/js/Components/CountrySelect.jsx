import React, { useEffect, useState } from "react";
import Select from "react-select";
import BgInput from "../assets/img/ConnexionInput.png";

export default function CountrySelect({ value, onChange }) {
    const [countries, setCountries] = useState([]);

    useEffect(() => {
        fetch(
            "https://restcountries.com/v3.1/all?fields=cca2,name,translations,flags"
        )
            .then((response) => response.json())
            .then((data) => {
                const countryOptions = data
                    .map((country) => ({
                        value: country.cca2,
                        label:
                            country.translations.fra.common ||
                            country.name.common,
                    }))
                    .sort((a, b) => a.label.localeCompare(b.label));
                setCountries(countryOptions);
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
            placeholder="Sélectionnez un pays"
            styles={customStyles}
            options={countries}
            // On retrouve dans le tableau des options celle dont la valeur correspond à la valeur passée par le parent
            value={countries.find((option) => option.value === value) || null}
            onChange={(selectedOption) =>
                onChange(selectedOption ? selectedOption.value : "")
            }
        />
    );
}

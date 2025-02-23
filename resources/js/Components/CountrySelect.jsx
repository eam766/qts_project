// import React, { useEffect, useState } from "react";
// import Select from "react-select";
// import BgInput from "../assets/img/ConnexionInput.png";

// export default function CountrySelect() {
//     const [countries, setCountries] = useState([]);
//     const [selectedCountry, setSelectedCountry] = useState({});

//     useEffect(() => {
//         fetch(
//             "https://valid.layercode.workers.dev/list/countries?format=select&flags=true&value=code"
//         )
//             .then((response) => response.json())
//             .then((data) => {
//                 setCountries(data.countries);
//                 setSelectedCountry(data.userSelectValue);
//             });
//     }, []);

//     const customStyles = {
//         control: (provided) => ({
//             ...provided,
//             backgroundImage: `url(${BgInput})`,
//             backgroundRepeat: "no-repeat",
//             backgroundPosition: "center",
//             backgroundSize: "cover",
//             fontFamily: "Orbitron",
//             border: "none",
//             height: "40px",
//             width: "360px",
//             color: "white",
//             backgroundColor: "transparent",
//         }),
//         singleValue: (provided) => ({
//             ...provided,
//             color: "white",
//         }),
//         menu: (provided) => ({
//             ...provided,
//             backgroundColor: "#222",
//         }),
//         option: (provided, state) => ({
//             ...provided,
//             backgroundColor: state.isFocused ? "#02d7f2" : "transparent",
//             color: "white",
//             cursor: "pointer",
//         }),
//     };

//     return (
//         <Select
//             styles={customStyles}
//             options={countries}
//             value={selectedCountry}
//             onChange={(selectedOption) => setSelectedCountry(selectedOption)}
//         />
//     );
// }

import React, { useEffect, useState } from "react";
import Select from "react-select";
import BgInput from "../assets/img/ConnexionInput.png";

export default function CountrySelect({ value, onChange }) {
    const [countries, setCountries] = useState([]);

    useEffect(() => {
        fetch(
            "https://valid.layercode.workers.dev/list/countries?format=select&flags=true&value=code"
        )
            .then((response) => response.json())
            .then((data) => {
                // On attend que data.countries soit un tableau d'options au format { value, label }
                setCountries(data.countries);
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
            // On retrouve dans le tableau des options celle dont la valeur correspond à la valeur passée par le parent
            value={countries.find((option) => option.value === value) || null}
            onChange={(selectedOption) =>
                onChange(selectedOption ? selectedOption.value : "")
            }
        />
    );
}

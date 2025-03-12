import {useEffect} from 'react';
import {FormGroup, FormControlLabel, Checkbox} from '@mui/material';


export default function Checkboxes({
                                       filters,
                                       filterType,
                                       selectedFilters,
                                       onFilterChange
                                   }) {
    const handleCheckboxChange = (event) => {
        const filter = event.target.name;
        const isChecked = event.target.checked;

        const newFilters = isChecked
            ? [...selectedFilters, filter]
            : selectedFilters.filter(f => f !== filter);

        onFilterChange(filterType, newFilters);
    };

    return (
        <div>
            <FormGroup sx={{ display: 'flex', flexDirection: "row", width: "90%" }}>
                {filters.map((filter, index) => (
                    <FormControlLabel
                        key={index}
                        control={
                            <Checkbox
                                style={{ color: "#02D7F2" }}
                                name={filter}
                                checked={selectedFilters.includes(filter)}
                                onChange={handleCheckboxChange}
                            />
                        }
                        label={filter}
                    />
                ))}
            </FormGroup>
        </div>
    );
}


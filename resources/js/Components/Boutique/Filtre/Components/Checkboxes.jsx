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

        // Calculate new filter set
        const newFilters = isChecked
            ? [...selectedFilters, filter]
            : selectedFilters.filter(f => f !== filter);


        onFilterChange(filterType, newFilters);
    };


    useEffect(() => {
        const params = new URLSearchParams(window.location.search);
        const urlFilters = params.get(filterType)?.split(',') || [];

        if (urlFilters.length > 0 && selectedFilters.length === 0) {
            onFilterChange(filterType, urlFilters);
        }
    }, []);

    return (
        <div>
            <FormGroup>
                {filters.map((filter, index) => (
                    <FormControlLabel
                        key={index}
                        control={
                            <Checkbox
                                style={{color: "#02D7F2"}}
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

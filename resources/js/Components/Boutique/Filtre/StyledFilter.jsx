import { styled} from "@mui/material";


const StyledAccordion = styled("div")({
    '.top-accordion': {
        border: '#02D7F2 1px solid',
        borderRadius: '10px',
        backgroundColor: '#121214',
    },

    '.p-accordion': {
        backgroundColor: '#121214',
        padding: '10px',
        borderRadius: '8px',
    },

    '.p-accordion-header': {
        padding: '8px',
        color: 'white',
        fontWeight: 'bold',
        fontSize: '18px',
        borderRadius: '5px',
        display: 'flex',
        alignItems: 'center',
        transition: 'background-color 0.3s',

        '&:hover': {
            backgroundColor: '#0197B1',
        },
    },

    '.p-accordion-toggle-icon': {
        color: 'white',
        margin: '10px',
        width: '25px',
    },

    '.p-accordion-content': {
        padding: '10px',
        color: 'white',
        borderRadius: '5px',
    },

    '.accordion-inner-tab .p-accordion-header': {
        backgroundColor: '#2a2a2a',
        color: '#ccc',
    },

    '.accordion-inner-tab .p-accordion-header.p-highlight': {
        backgroundColor: '#2a2a2a',
        color: 'white',
    },
});

export default StyledAccordion;

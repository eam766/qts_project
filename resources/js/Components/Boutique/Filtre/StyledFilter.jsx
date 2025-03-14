import { styled} from "@mui/material";


const StyledAccordion = styled("Accordion")({
    '.top-accordion': {
        maxWidth: '80vw',
        minWidth: '80vw',
        position: 'absolute',
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
        transition: 'background-color 0.3s',
        display: 'flex',
        alignItems: 'center',

        '&:hover': {
            backgroundColor: '#0197B1',
        },
    },

    '.p-accordion-header-text': {
        maxWidth: '80vw',
        minWidth: '75vw',
    },

    '.p-accordion-toggle-icon': {
        color: '#02D7F2',
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
        backgroundColor: '#02D7F2',
        color: 'white',
    },

    '.filter-button': {
        color: 'white',
        borderRadius: '5px',
        fontWeight: 'bold',
        padding: '10px 20px',
        transition: 'background-color 0.3s ease',
        border: '#02D7F2 1px solid',

        '&:hover': {
            backgroundColor: '#0197B1',
        },
    },
});


export default StyledAccordion;

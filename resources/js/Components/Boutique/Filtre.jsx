import Accordion from "@mui/material/Accordion";
import AccordionDetails from "@mui/material/AccordionDetails";
import AccordionSummary from "@mui/material/AccordionSummary";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import Typography from "@mui/material/Typography";
import Checkbox from "@mui/material/Checkbox";
import FormGroup from "@mui/material/FormGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import Slider from "@mui/material/Slider";

export default function Filtre() {
    return (
        <div style={{ display: "flex", flexDirection: "column", width: 400 }}>
            <Accordion
                sx={{
                    background: "#121214",
                    border: 1,
                    borderColor: "#02D7F2",
                    color: "#02D7F2",
                    fontFamily: "Audiowide",
                }}
            >
                <AccordionSummary
                    expandIcon={<ExpandMoreIcon style={{ color: "#02D7F2" }} />}
                    aria-controls="panel1-content"
                    id="panel1-header"
                    style={{ height: 50 }}
                >
                    <Typography component="span">Prix</Typography>
                </AccordionSummary>
                <AccordionDetails>
                    <Slider color="secondary"></Slider>
                </AccordionDetails>
            </Accordion>
            <Accordion
                sx={{
                    background: "#121214",
                    border: 1,
                    borderColor: "#02D7F2",
                    color: "#02D7F2",
                    fontFamily: "Audiowide",
                }}
            >
                <AccordionSummary
                    expandIcon={<ExpandMoreIcon style={{ color: "#02D7F2" }} />}
                    aria-controls="panel1-content"
                    id="panel1-header"
                    style={{ height: 50 }}
                >
                    <Typography component="span">Genres</Typography>
                </AccordionSummary>
                <AccordionDetails>
                    <FormGroup>
                        <FormControlLabel
                            control={<Checkbox style={{ color: "#02D7F2" }} />}
                            label="Label"
                        />
                        <FormControlLabel
                            control={<Checkbox style={{ color: "#02D7F2" }} />}
                            label="Required"
                        />
                        <FormControlLabel
                            control={<Checkbox style={{ color: "#02D7F2" }} />}
                            label="Disabled"
                        />
                    </FormGroup>
                </AccordionDetails>
            </Accordion>
            <Accordion
                sx={{
                    background: "#121214",
                    border: 1,
                    borderColor: "#02D7F2",
                    color: "#02D7F2",
                    fontFamily: "Audiowide",
                }}
            >
                <AccordionSummary
                    expandIcon={<ExpandMoreIcon style={{ color: "#02D7F2" }} />}
                    aria-controls="panel1-content"
                    id="panel1-header"
                    style={{ height: 50 }}
                >
                    <Typography component="span">Catégorie</Typography>
                </AccordionSummary>
                <AccordionDetails>
                    <FormGroup>
                        <FormControlLabel
                            control={<Checkbox style={{ color: "#02D7F2" }} />}
                            label="Label"
                        />
                        <FormControlLabel
                            control={<Checkbox style={{ color: "#02D7F2" }} />}
                            label="Required"
                        />
                        <FormControlLabel
                            control={<Checkbox style={{ color: "#02D7F2" }} />}
                            label="Disabled"
                        />
                    </FormGroup>
                </AccordionDetails>
            </Accordion>
            <Accordion
                sx={{
                    background: "#121214",
                    border: 1,
                    borderColor: "#02D7F2",
                    color: "#02D7F2",
                    fontFamily: "Audiowide",
                }}
            >
                <AccordionSummary
                    expandIcon={<ExpandMoreIcon style={{ color: "#02D7F2" }} />}
                    aria-controls="panel1-content"
                    id="panel1-header"
                    style={{ height: 50 }}
                >
                    <Typography component="span">Companie</Typography>
                </AccordionSummary>
                <AccordionDetails>
                    <FormGroup>
                        <FormControlLabel
                            control={<Checkbox style={{ color: "#02D7F2" }} />}
                            label="Label"
                        />
                        <FormControlLabel
                            control={<Checkbox style={{ color: "#02D7F2" }} />}
                            label="Required"
                        />
                        <FormControlLabel
                            control={<Checkbox style={{ color: "#02D7F2" }} />}
                            label="Disabled"
                        />
                    </FormGroup>
                </AccordionDetails>
            </Accordion>
        </div>
    );
}

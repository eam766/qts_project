import * as React from "react";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import Typography from "@mui/material/Typography";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import TextField from "../Text/TextField";
import ButtonCyber from "../Buttons/ButtonCyber";
import "./User.css";

export function UserSettings() {
    return (
        <div style={{ width: "50%" }}>
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
                >
                    <Typography
                        component="span"
                        sx={{ fontFamily: "Audiowide" }}
                    >
                        Modifier Identifiant
                    </Typography>
                </AccordionSummary>
                <AccordionDetails>
                    <div className="form-settings">
                        Entrez un nouveau identifiant:
                        <TextField nomDuPlaceHolder={"Identifiant"} />
                        <ButtonCyber nomButton={"Valider"} />
                    </div>
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
                >
                    <Typography
                        component="span"
                        sx={{ fontFamily: "Audiowide" }}
                    >
                        Modifier Courriel
                    </Typography>
                </AccordionSummary>
                <AccordionDetails>
                    <div className="form-settings">
                        Entrez un nouveau courriel:
                        <TextField nomDuPlaceHolder={"Courriel"} />
                        <ButtonCyber nomButton={"Valider"} />
                    </div>
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
                >
                    <Typography
                        component="span"
                        sx={{ fontFamily: "Audiowide" }}
                    >
                        Modifier mot de passe
                    </Typography>
                </AccordionSummary>
                <AccordionDetails>
                    <div className="form-settings" style={{ width: "70%" }}>
                        Entre un nouveau mot de passe:{" "}
                        <TextField nomDuPlaceHolder={"Mot de passe"} />
                    </div>
                    <br />

                    <div className="form-settings">
                        Reecricre le mot de passe:
                        <TextField nomDuPlaceHolder={"Mot de passe"} />
                        <ButtonCyber nomButton={"Valider"} />
                    </div>
                </AccordionDetails>
            </Accordion>
        </div>
    );
}

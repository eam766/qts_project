import BgInput from "../assets/img/ConnexionInput.png";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";

export default function DateInput() {
    return (
        <div className="flex flex-col">
            <label htmlFor="dateNaissance">Date de naissance</label>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DatePicker
                    id="dateNaissance"
                    name="dateNaissance"
                    slotProps={{
                        textField: {
                            InputProps: {
                                disableUnderline: true,
                                style: {
                                    color: "white",
                                    fontFamily: "Orbitron",
                                    border: "none",
                                },
                            },
                            sx: {
                                backgroundImage: `url(${BgInput})`,
                                backgroundRepeat: "no-repeat",
                                backgroundPosition: "center",
                                backgroundSize: "cover",
                                height: "40px",
                                width: "360px",
                                mx: "auto",
                                justifyContent: "center",
                                "& .MuiOutlinedInput-root": {
                                    "& fieldset": { border: "none" },
                                    "&:hover fieldset": { border: "none" },
                                    "&.Mui-focused fieldset": {
                                        border: "none",
                                    },
                                },
                            },
                        },
                        openPickerIcon: {
                            sx: {
                                color: "#02d7f2",
                                mr: "10px",
                                border: "none",
                            },
                        },
                    }}
                />
            </LocalizationProvider>
        </div>
    );
}

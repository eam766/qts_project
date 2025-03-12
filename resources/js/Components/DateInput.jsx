import BgInput from "../assets/img/ConnexionInput.png";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs from "dayjs";
import "dayjs/locale/fr";
import { frFR } from "@mui/x-date-pickers/locales";

dayjs.locale("fr");

export default function DateInput({ value, onChange }) {
    return (
        <div className="flex flex-col">
            <LocalizationProvider
                dateAdapter={AdapterDayjs}
                adapterLocale="fr"
                localeText={
                    frFR.components.MuiLocalizationProvider.defaultProps
                        .localeText
                }
            >
                <DatePicker
                    id="dateNaissance"
                    name="dateNaissance"
                    value={value ? dayjs(value).locale("fr") : null}
                    onChange={(newValue) => {
                        onChange(newValue ? newValue.format("YYYY-MM-DD") : "");
                    }}
                    format="DD/MM/YYYY"
                    maxDate={dayjs().subtract(11, "year")}
                    minDate={dayjs().subtract(100, "year")}
                    slotProps={{
                        textField: {
                            placeholder: "JJ/MM/AAAA",
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

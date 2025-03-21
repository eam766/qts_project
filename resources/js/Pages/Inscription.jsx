import { useForm, Link, Head } from "@inertiajs/react";
import bouton_inscription from "../assets/img/Bouton_Connexion4.png";
import BgInput from "../assets/img/ConnexionInput.png";
import CountrySelect from "@/Components/CountrySelect";
import DateInput from "@/Components/DateInput";

export default function Inscription() {
    const { data, setData, post, processing, errors } = useForm({
        firstName: "",
        lastName: "",
        dateOfBirth: "",
        country: "",
        username: "",
        email: "",
        password: "",
        infolettre: false,
        termsCondition: false,
    });

    const submit = (e) => {
        e.preventDefault();
        post(route("register"), {
            onFinish: () => {
                setData("password", "");
            },
        });
    };

    const inputStyle = {
        backgroundImage: `url(${BgInput})`,
        backgroundRepeat: "no-repeat",
        backgroundPosition: "center",
        backgroundSize: "cover",
        border: "none",
        height: "40px",
        width: "360px",
    };

    return (
        <div
            style={{ height: "100%" }}
            className="flex flex-col justify-evenly items-center AudioWideBlue"
        >
            <Head title={"Inscription"} />
            <p className="text-3xl">Inscription</p>

            <form
                onSubmit={submit}
                className="flex flex-col items-center space-y-4 w-full"
            >
                {/* Nom et Prénom */}
                <div className="flex space-x-4 ">
                    <div className="flex flex-col">
                        <label htmlFor="lastName">Nom</label>
                        <input
                            style={inputStyle}
                            className="bg-transparent text-white"
                            id="lastName"
                            name="lastName"
                            type="text"
                            value={data.lastName}
                            onChange={(e) =>
                                setData("lastName", e.target.value)
                            }
                        />
                        {errors.lastName && (
                            <div className="text-red-500 text-sm max-w-[290px]">
                                {errors.lastName}
                            </div>
                        )}
                    </div>

                    <div className="flex flex-col">
                        <label htmlFor="firstName">Prénom</label>
                        <input
                            style={inputStyle}
                            className="bg-transparent text-white"
                            id="firstName"
                            name="firstName"
                            type="text"
                            value={data.firstName}
                            onChange={(e) =>
                                setData("firstName", e.target.value)
                            }
                        />
                        {errors.firstName && (
                            <div className="text-red-500 text-sm max-w-[290px]">
                                {errors.firstName}
                            </div>
                        )}
                    </div>
                </div>

                {/* Date de naissance et Pays */}
                <div className="flex space-x-4">
                    <div className="flex flex-col">
                        <label htmlFor="dateOfBirth">Date de naisssance</label>
                        <DateInput
                            value={data.dateOfBirth}
                            onChange={(value) => setData("dateOfBirth", value)}
                        />
                        {errors.dateOfBirth && (
                            <div className="text-red-500 text-sm max-w-[290px]">
                                {errors.dateOfBirth}
                            </div>
                        )}
                    </div>

                    <div className="flex flex-col">
                        <label htmlFor="pays">Pays</label>
                        <CountrySelect
                            value={data.country}
                            onChange={(value) => setData("country", value)}
                        />
                        {errors.country && (
                            <div className="text-red-500 text-sm">
                                {errors.country}
                            </div>
                        )}
                    </div>
                </div>

                {/* Identifiant */}
                <div className="flex flex-col w-full max-w-[360px]">
                    <label htmlFor="username">Identifiant</label>
                    <input
                        style={inputStyle}
                        className="bg-transparent text-white"
                        id="username"
                        name="username"
                        type="text"
                        value={data.username}
                        onChange={(e) => setData("username", e.target.value)}
                    />
                    {errors.username && (
                        <div className="text-red-500 text-sm max-w-[290px]">
                            {errors.username}
                        </div>
                    )}
                </div>

                {/* Email */}
                <div className="flex flex-col w-full max-w-[360px]">
                    <label htmlFor="email">Courriel</label>
                    <input
                        style={inputStyle}
                        className="bg-transparent text-white"
                        id="email"
                        name="email"
                        type="email"
                        value={data.email}
                        onChange={(e) => setData("email", e.target.value)}
                    />
                    {errors.email && (
                        <div className="text-red-500 text-sm max-w-[290px]">
                            {errors.email}
                        </div>
                    )}
                </div>

                {/* Mot de passe */}
                <div className="flex flex-col w-full max-w-[360px]">
                    <label htmlFor="password">Mot de passe</label>
                    <input
                        style={inputStyle}
                        className="bg-transparent text-white"
                        id="password"
                        name="password"
                        type="password"
                        value={data.password}
                        onChange={(e) => setData("password", e.target.value)}
                    />
                    {errors.password && (
                        <div className="text-red-500 text-sm max-w-[290px]">
                            {errors.password}
                        </div>
                    )}
                </div>

                {/* Checkboxes */}
                <div className="space-y-2">
                    <div>
                        <input
                            type="checkbox"
                            id="infolettre"
                            checked={data.infolettre}
                            onChange={(e) =>
                                setData("infolettre", e.target.checked)
                            }
                        />
                        <label className="ml-3" htmlFor="infolettre">
                            Envoie-moi des nouvelles et des promotions.
                        </label>
                    </div>
                    <div>
                        <input
                            type="checkbox"
                            id="termsCondition"
                            checked={data.termsCondition}
                            onChange={(e) =>
                                setData("termsCondition", e.target.checked)
                            }
                        />
                        <label className="ml-3" htmlFor="termsCondition">
                            <Link
                                href="/termes_conditions"
                                className=" hover:underline"
                            >
                                J'ai lu et j’accepte les conditions de service
                            </Link>
                        </label>
                        {errors.termsCondition && (
                            <div className="text-red-500 text-sm max-w-[290px]">
                                {errors.termsCondition}
                            </div>
                        )}
                    </div>
                </div>

                {/* Bouton de soumission */}
                <button
                    type="submit"
                    disabled={processing}
                    style={{
                        backgroundImage: `url(${bouton_inscription})`,
                        backgroundRepeat: "no-repeat",
                        backgroundPosition: "center",
                        backgroundSize: "cover",
                        border: "none",
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        height: "40px",
                        width: "170px",
                    }}
                >
                    Valider
                </button>
            </form>
        </div>
    );
}

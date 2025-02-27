// export default function Connexion() {
//     return (
//         <div
//             style={{ height: "100%" }}
//             className="flex flex-col justify-center items-center AudioWideBlue"
//         >
//             <p className="text-3xl">Connexion</p>
//             <br />
//             <br />
//             <div className=" basis-1/3 flex flex-col justify-evenly ">
//                 <div className="flex flex-col">
//                     <label htmlFor="courriel">Courriel</label>
//                     <input
//                         className="bgInput bg-transparent text-white w-100"
//                         id="courriel"
//                         name="courriel"
//                         type="text"
//                     />
//                 </div>
//                 <div className="flex flex-col">
//                     <label htmlFor="mdp">Mot de passe</label>
//                     <input
//                         className="bgInput bg-transparent text-white w-100"
//                         id="mdp"
//                         name="mdp"
//                         type="text"
//                     />
//                 </div>
//             </div>
//             <br />
//             <br />
//             <button className="buttonRight">Valider</button>
//         </div>
//     );
// }

import { useForm, Link } from "@inertiajs/react";

import BgInput from "../assets/img/ConnexionInput.png";
import bouton_connexion from "../assets/img/Bouton_Connexion4.png";

export default function Connexion() {
    const { data, setData, post, processing, errors } = useForm({
        email: "",
        password: "",
    });

    const submit = (e) => {
        e.preventDefault();
        post(route("login"), {
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
            className="flex flex-col justify-center items-center AudioWideBlue"
        >
            <p className="text-3xl">Connexion</p>
            <br />
            <br />
            <form
                onSubmit={submit}
                className="basis-1/3 flex flex-col justify-evenly"
            >
                <div className="flex flex-col mb-4">
                    <label htmlFor="email">Courriel</label>
                    <input
                        style={inputStyle}
                        className="bg-transparent text-white w-100 "
                        id="email"
                        name="email"
                        type="email"
                        value={data.email}
                        onChange={(e) => setData("email", e.target.value)}
                    />
                    {errors.email && (
                        <div className="text-red-500 text-sm mt-1">
                            {errors.email}
                        </div>
                    )}
                </div>
                <div className="flex flex-col">
                    <label htmlFor="password">Mot de passe</label>
                    <input
                        style={inputStyle}
                        className="bg-transparent text-white w-100"
                        id="password"
                        name="password"
                        type="password"
                        value={data.password}
                        onChange={(e) => setData("password", e.target.value)}
                    />
                    {errors.password && (
                        <div className="text-red-500 text-sm mt-1">
                            {errors.password}
                        </div>
                    )}
                </div>

                <p className="text-sm mt-2">
                    <Link
                        href={route("password.request")}
                        className=" hover:underline"
                        style={{ color: "#F0F14E" }}
                    >
                        Mot de passe oublié ?
                    </Link>
                </p>

                <br />

                <br />
                <button
                    type="submit"
                    disabled={processing}
                    style={{
                        backgroundImage: `url(${bouton_connexion})`,
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
                    {processing ? "Connexion..." : "Valider"}
                </button>
            </form>
        </div>
    );
}

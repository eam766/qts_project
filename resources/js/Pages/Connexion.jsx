import BgInput from "../assets/img/ConnexionInput.png";
import bouton_connexion from "../assets/img/Bouton_Connexion4.png";
export default function Connexion() {
    return (
        <div
            style={{ height: "100%" }}
            className="flex flex-col justify-center items-center AudioWideBlue"
        >
            <p className="text-3xl">Connexion</p>
            <br />
            <br />
            <div className=" basis-1/3 flex flex-col justify-evenly ">
                <div className="flex flex-col">
                    <label htmlFor="courriel">Courriel</label>
                    <input
                        style={{
                            backgroundImage: `url(${BgInput})`,
                            backgroundRepeat: "no-repeat",
                            backgroundPosition: "center",
                            backgroundSize: "cover",
                            border: "none",
                            height: "40px",
                            width: "360px",
                        }}
                        className=" bg-transparent text-white w-100"
                        id="courriel"
                        name="courriel"
                        type="text"
                    />
                </div>
                <div className="flex flex-col">
                    <label htmlFor="mdp">Mot de passe</label>
                    <input
                        style={{
                            backgroundImage: `url(${BgInput})`,
                            backgroundRepeat: "no-repeat",
                            backgroundPosition: "center",
                            backgroundSize: "cover",
                            border: "none",
                            height: "40px",
                            width: "360px",
                        }}
                        className=" bg-transparent text-white w-100"
                        id="mdp"
                        name="mdp"
                        type="text"
                    />
                </div>
            </div>
            <br />
            <br />
            <button
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
                Valider
            </button>
        </div>
    );
}

import bouton_inscription from "../assets/img/Bouton_Connexion4.png";
import BgInput from "../assets/img/ConnexionInput.png";
export default function Inscription() {
    return (
        <div
            style={{ height: "100%" }}
            className="flex flex-col justify-evenly items-center AudioWideBlue"
        >
            <p className="text-3xl">Inscription</p>
            <div className="flex ">
                <div className="flex flex-col">
                    <label htmlFor="nom">Nom</label>
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
                        className=" bg-transparent text-white w-100 mr-4"
                        id="nom"
                        name="nom"
                        type="text"
                    />
                </div>
                <div className="flex flex-col">
                    <label htmlFor="prenom">Prénom</label>
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
                        id="nom"
                        name="nom"
                        type="text"
                    />
                </div>
            </div>
            <div className="flex flex-col">
                <label htmlFor="identifiant">Identifiant</label>
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
                    id="identifiant"
                    name="identifiant"
                    type="text"
                />
            </div>
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
                    id="courriel"
                    name="courriel"
                    type="text"
                />
            </div>
            <div>
                <div>
                    <input type="checkbox" />
                    <label className="ml-3" htmlFor="">
                        Envoie moi des nouvelles et des promotions.
                    </label>
                </div>
                <br />
                <div>
                    <input type="checkbox" />
                    <label className="ml-3" htmlFor="">
                        J’ai lu et accepte les conditions de service
                    </label>
                </div>
            </div>
            <button
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
        </div>
    );
}

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
                        className="bgInput bg-transparent text-white w-100"
                        id="courriel"
                        name="courriel"
                        type="text"
                    />
                </div>
                <div className="flex flex-col">
                    <label htmlFor="mdp">Mot de passe</label>
                    <input
                        className="bgInput bg-transparent text-white w-100"
                        id="mdp"
                        name="mdp"
                        type="text"
                    />
                </div>
            </div>
            <br />
            <br />
            <button className="buttonRight">Valider</button>
        </div>
    );
}

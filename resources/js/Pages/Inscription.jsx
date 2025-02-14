import CountrySelect from "@/Components/CountrySelect";
import DateInput from "@/Components/DateInput";

export default function Inscription() {
    return (
        <div
            style={{ height: "100%" }}
            className="flex flex-col justify-evenly items-center AudioWideBlue"
        >
            <p className="text-3xl">Inscription</p>
            <br />
            <div className="flex ">
                <div className="flex flex-col">
                    <label htmlFor="nom">Nom</label>
                    <input
                        className="bgInput bg-transparent text-white mr-4"
                        id="nom"
                        name="nom"
                        type="text"
                    />
                </div>
                <div className="flex flex-col">
                    <label htmlFor="prenom">Prénom</label>
                    <input
                        className="bgInput bg-transparent text-white"
                        id="nom"
                        name="nom"
                        type="text"
                    />
                </div>
            </div>
            <div className="flex ">
                <DateInput></DateInput>
                <div className="flex flex-col ml-4">
                    <label htmlFor="pays">Pays</label>
                    <CountrySelect></CountrySelect>
                </div>
            </div>
            <div className="flex flex-col">
                <label htmlFor="identifiant">Identifiant</label>
                <input
                    className="bgInput bg-transparent text-white"
                    id="identifiant"
                    name="identifiant"
                    type="text"
                />
            </div>
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
                    className="bgInput bg-transparent text-white "
                    id="courriel"
                    name="courriel"
                    type="password"
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
            <button className="buttonRight">Valider</button>
        </div>
    );
}

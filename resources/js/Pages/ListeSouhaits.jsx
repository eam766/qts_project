import carte from "../assets/img/CartePanier.png";
import bouton from "../assets/img/Bouton_Inscription.png";

export default function ListeSouhait() {
    return (
        <div
            className="flex flex-col items-start"
            style={{ fontFamily: "Audiowide" }}
        >
            <p className="AudioWideBlue mb-8" style={{ fontSize: 30 }}>
                'Identifiant' liste de souhaits
            </p>
            <div
                style={{
                    backgroundImage: `url(${carte})`,
                    backgroundRepeat: "no-repeat",
                    backgroundPosition: "center",
                    backgroundSize: "100% 100%",
                    minHeight: "230px",
                    width: "100%",
                    maxWidth: "1150px",
                    overflow: "hidden",
                    padding: "10px",
                    paddingLeft: "40px",
                    paddingRight: "80px",
                    paddingTop: "30px",
                    display: "flex",
                    flexDirection: "row",
                }}
            >
                <div
                    className="bg-gray-500"
                    style={{ width: 150, height: 170 }}
                ></div>
                <div className="flex flex-col justify-between pb-12">
                    <p className="ml-5">Titre du jeu</p>
                    <p className="ml-5">Prix</p>
                    <p className="ml-5">note</p>
                    <p className="ml-5">Date de sortie: jj/mm/aaaa</p>
                </div>
                <div className="flex flex-col self-center ml-auto ">
                    <button
                        className="AudioWideBlue"
                        style={{
                            backgroundImage: `url(${bouton})`,
                            backgroundRepeat: "no-repeat",
                            backgroundPosition: "center",
                            backgroundSize: "cover",
                            border: "none",
                            display: "flex",
                            justifyContent: "center",
                            alignItems: "center",
                            height: "45px",
                            width: "180px",
                        }}
                    >
                        Ajouter au panier
                    </button>
                    <button
                        className="AudioWideBlue"
                        style={{
                            backgroundImage: `url(${bouton})`,
                            backgroundRepeat: "no-repeat",
                            backgroundPosition: "center",
                            backgroundSize: "cover",
                            border: "none",
                            display: "flex",
                            justifyContent: "center",
                            alignItems: "center",
                            height: "50px",
                            width: "203px",
                            marginTop: "16px",
                        }}
                    >
                        Supprimer de la liste
                    </button>
                </div>
            </div>
            <br />
            <div
                style={{
                    backgroundImage: `url(${carte})`,
                    backgroundRepeat: "no-repeat",
                    backgroundPosition: "center",
                    backgroundSize: "100% 100%",
                    minHeight: "230px",
                    width: "100%",
                    maxWidth: "1150px",
                    overflow: "hidden",
                    padding: "10px",
                    paddingLeft: "40px",
                    paddingRight: "80px",
                    paddingTop: "30px",
                    display: "flex",
                    flexDirection: "row",
                }}
            >
                <div
                    className="bg-gray-500"
                    style={{ width: 150, height: 170 }}
                ></div>
                <div className="flex flex-col justify-between pb-12">
                    <p className="ml-5">Titre du jeu</p>
                    <p className="ml-5">Prix</p>
                    <p className="ml-5">note</p>
                    <p className="ml-5">Date de sortie: jj/mm/aaaa</p>
                </div>
                <div className="flex flex-col self-center ml-auto ">
                    <button
                        className="AudioWideBlue"
                        style={{
                            backgroundImage: `url(${bouton})`,
                            backgroundRepeat: "no-repeat",
                            backgroundPosition: "center",
                            backgroundSize: "cover",
                            border: "none",
                            display: "flex",
                            justifyContent: "center",
                            alignItems: "center",
                            height: "45px",
                            width: "183px",
                        }}
                    >
                        Ajouter au panier
                    </button>
                    <button
                        className="AudioWideBlue"
                        style={{
                            backgroundImage: `url(${bouton})`,
                            backgroundRepeat: "no-repeat",
                            backgroundPosition: "center",
                            backgroundSize: "cover",
                            border: "none",
                            display: "flex",
                            justifyContent: "center",
                            alignItems: "center",
                            height: "50px",
                            width: "203px",
                            marginTop: "16px",
                        }}
                    >
                        Supprimer de la liste
                    </button>
                </div>
            </div>
            <br />
            <div
                style={{
                    backgroundImage: `url(${carte})`,
                    backgroundRepeat: "no-repeat",
                    backgroundPosition: "center",
                    backgroundSize: "100% 100%",
                    minHeight: "230px",
                    width: "100%",
                    maxWidth: "1150px",
                    overflow: "hidden",
                    padding: "10px",
                    paddingLeft: "40px",
                    paddingRight: "80px",
                    paddingTop: "30px",
                    display: "flex",
                    flexDirection: "row",
                }}
            >
                <div
                    className="bg-gray-500"
                    style={{ width: 150, height: 170 }}
                ></div>
                <div className="flex flex-col justify-between pb-12">
                    <p className="ml-5">Titre du jeu</p>
                    <p className="ml-5">Prix</p>
                    <p className="ml-5">note</p>
                    <p className="ml-5">Date de sortie: jj/mm/aaaa</p>
                </div>
                <div className="flex flex-col self-center ml-auto ">
                    <button
                        className="AudioWideBlue"
                        style={{
                            backgroundImage: `url(${bouton})`,
                            backgroundRepeat: "no-repeat",
                            backgroundPosition: "center",
                            backgroundSize: "cover",
                            border: "none",
                            display: "flex",
                            justifyContent: "center",
                            alignItems: "center",
                            height: "45px",
                            width: "180px",
                        }}
                    >
                        Ajouter au panier
                    </button>
                    <button
                        className="AudioWideBlue"
                        style={{
                            backgroundImage: `url(${bouton})`,
                            backgroundRepeat: "no-repeat",
                            backgroundPosition: "center",
                            backgroundSize: "cover",
                            border: "none",
                            display: "flex",
                            justifyContent: "center",
                            alignItems: "center",
                            height: "50px",
                            width: "203px",
                            marginTop: "16px",
                        }}
                    >
                        Supprimer de la liste
                    </button>
                </div>
            </div>
        </div>
    );
}

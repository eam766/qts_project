import "./Carte.css";
export default function Carte() {
    return (
        <div className="container">
            <div className="bg-gray-500 jeu"></div>
            <div className="flex flex-col justify-between pb-12">
                <p className="ml-5">Titre du jeu</p>
                <p className="ml-5">Prix</p>
                <p className="ml-5">note</p>
                <p className="ml-5">Date de sortie: jj/mm/aaaa</p>
            </div>
            <div className="flex flex-col self-center ml-auto ">
                <button className="AudioWideBlue buttonAdd">
                    Ajouter au panier
                </button>
                <button className="AudioWideBlue buttonDelete">
                    Supprimer de la liste
                </button>
            </div>
        </div>
    );
}

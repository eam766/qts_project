import barre_recherche from "../assets/img/Barre_de_Recherche3.png";
export default function SearchBar() {
    return (
        <div className="flex basis-1/3 justify-end">
            <input
                style={{
                    backgroundImage: `url(${barre_recherche})`,
                    backgroundRepeat: "no-repeat",
                    backgroundPosition: "center",
                    backgroundSize: "cover",
                    border: "none",
                    height: "40px",
                    width: "250px",
                }}
                className=" bg-transparent text-white w-100"
                type="text"
                placeholder="Recherche"
            />
        </div>
    );
}

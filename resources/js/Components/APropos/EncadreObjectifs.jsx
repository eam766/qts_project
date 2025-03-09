import manette from "../../assets/img/imageManetteJeux2.png";
import "./EncadreObjectifs.css";
export default function EncadreObjectifs({ children }) {
    return (
        <div className="flex flex-row basis-1/3 justify-evenly mt-32">
            <img src={manette} alt="" width={420} className="manette" />

            <p className="containerObjectif">
                <br />
                <br />
                <p className="text-xl titleObjectifs">Nos Objectifs</p>
                <br />
                {children}
                <br />
            </p>
        </div>
    );
}

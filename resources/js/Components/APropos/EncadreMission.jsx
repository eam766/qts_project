import encadreMission from "../../assets/img/Encadre_Mission7.png";
import circuit from "../../assets/img/imageCircuit.png";
import "./EncadreMission.css";
export default function EncadreMission({ children }) {
    return (
        <div className="flex basis-1/3 justify-around mt-32">
            <p className=" p-20 pt-11 containerMission">
                <br />
                <p className="text-xl titleMission">Notre Mission</p>
                {children}
            </p>
            <img src={circuit} alt="" width={390} />
        </div>
    );
}

import "./EncadrePresentation.css";
import logo from "../../assets/img/FrogLogo.png";

export default function EncadrePresentation({ children }) {
    return (
        <div className="flex flex-row basis-1/3 justify-evenly ">
            <img src={logo} alt="" className="logo" />
            <p className="containerPresentation p-10">
                <p className=" titlePresentation text-xl mb-4">
                    Présentation de l’entreprise
                </p>
                {children}
            </p>
        </div>
    );
}

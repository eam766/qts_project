import logo from "../assets/img/FrogLogo.png";
export default function Logo() {
    return (
        <div className="inline-flex flex-row items-center w-fit">
            <img className="logo mr-1" src={logo} alt="logo" />
            <p className="text-center leading-none">
                QTS <br className="m-0 p-0" /> MONTRÉAL
            </p>
        </div>
    );
}

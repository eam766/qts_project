import logo from "../assets/img/FrogLogo.png";
export default function Logo() {
    return (
        <div className="inline-flex flex-row items-center w-fit">
            <img
                className="logo mr-1"
                src={logo}
                alt="logo"
                style={{ width: 100, height: "auto" }}
            />
            <p className="text-center leading-none">Ludic</p>
        </div>
    );
}

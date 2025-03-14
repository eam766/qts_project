import { Link } from "@inertiajs/react";
import logo from "@/assets/img/Logo.png"
export default function Logo() {
    return (
        <Link
            style={{
                padding: 10,
                marginLeft: 10,
            }}
            href="/"
        >
            <img src={logo} alt="logo de ludic" width={120}  />
            <p
                className="text-center leading-none"
                style={{ color: "#02d7f2", paddingTop: 10}}
            >
                Ludic
            </p>
        </Link>
    );
}

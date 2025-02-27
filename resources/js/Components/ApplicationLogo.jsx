import logoQts from "@/assets/img/FrogLogo.png";

export default function ApplicationLogo(props) {
    return (
        <img
            src={logoQts}
            alt="QTs Montréal Logo"
            {...props} // Pass down any additional props (width, height, etc.)
        />
    );
}

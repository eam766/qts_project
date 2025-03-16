import { useEffect } from "react";
import { router } from "@inertiajs/react";

export default function Login() {
    // Dès le montage, on redirige l’utilisateur

    router.visit(route("connexion"));
    // On ne retourne rien (page blanche)
    return null;
}

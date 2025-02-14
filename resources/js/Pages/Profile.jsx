import { UserLibrary } from "@/Components/User/UserLibrary";
import { UserProfile } from "../Components/User/UserProfile";
import ButtonCyber from "@/Components/Buttons/ButtonCyber";

export default function Profile() {
    return (
        <div>
            <UserProfile username={"toto"} />
            <br />
            <UserLibrary />
            <br />
            <ButtonCyber nomButton={"Settings"} chemin={"profil-settings"} />
        </div>
    );
}

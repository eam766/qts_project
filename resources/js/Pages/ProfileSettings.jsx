import ButtonCyber from "@/Components/Buttons/ButtonCyber";
import { UserProfile } from "@/Components/User/UserProfile";
import { UserSettings } from "@/Components/User/UserSettings";

export default function ProfileSettings() {
    return (
        <>
            <UserProfile username={"toto"} />
            <br />
            <UserSettings />
            <br />
            <ButtonCyber nomButton={"Retour"} chemin={"profile"}></ButtonCyber>
        </>
    );
}

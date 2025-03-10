import titre from "@/assets/img/TitreNotreEquipe.png";
import TitreNom from "@/Components/Equipe/TitreNom";
import EncadreDescription from "@/Components/Equipe/EncadreDescription";
import emilie from "@/assets/img/Emilie_Avatar.png";
import alex from "@/assets/img/Alex_Avatar.png";
import veronica from "@/assets/img/Veronica_Avatar.png";
import jean from "@/assets/img/Jean_Avatar.png";

export default function Equipe() {
    return (
        <div>
            <img src={titre} alt="" className="mb-20" />
            <TitreNom color="#81EC86">Emilie</TitreNom>
            <EncadreDescription image={emilie} color="#81EC86">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                Curabitur vel volutpat mi, ut pellentesque nibh. Aenean sagittis
                rutrum convallis. Proin vel fermentum lorem. Pellentesque sapien
                metus, luctus elementum libero at, interdum mollis tortor. Sed
                sollicitudin molestie magna quis scelerisque. Suspendisse et
                rutrum mi. 
            </EncadreDescription>
            <br />
            <div className="flex flex-col items-end">
                <TitreNom color="#02D7F2" flipHorizontal={true}>
                    Alexandre
                </TitreNom>
                <EncadreDescription
                    image={alex}
                    color="#02D7F2"
                    flipHorizontal={true}
                >
                    {" "}
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                    Curabitur vel volutpat mi, ut pellentesque nibh. Aenean
                    sagittis rutrum convallis. Proin vel fermentum lorem.
                    Pellentesque sapien metus, luctus elementum libero at,
                    interdum mollis tortor. Sed sollicitudin molestie magna quis
                    scelerisque. Suspendisse et rutrum mi. 
                </EncadreDescription>
            </div>
            <br />
            <TitreNom color="#F0F14E">Veronica</TitreNom>
            <EncadreDescription image={veronica} color="#F0F14E">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                Curabitur vel volutpat mi, ut pellentesque nibh. Aenean sagittis
                rutrum convallis. Proin vel fermentum lorem. Pellentesque sapien
                metus, luctus elementum libero at, interdum mollis tortor. Sed
                sollicitudin molestie magna quis scelerisque. Suspendisse et
                rutrum mi. 
            </EncadreDescription>
            <br />
            <div className="flex flex-col items-end">
                <TitreNom color="#FD0130" flipHorizontal={true}>
                    Jean
                </TitreNom>
                <EncadreDescription
                    image={jean}
                    color="#FD0130"
                    flipHorizontal={true}
                >
                    {" "}
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                    Curabitur vel volutpat mi, ut pellentesque nibh. Aenean
                    sagittis rutrum convallis. Proin vel fermentum lorem.
                    Pellentesque sapien metus, luctus elementum libero at,
                    interdum mollis tortor. Sed sollicitudin molestie magna quis
                    scelerisque. Suspendisse et rutrum mi. 
                </EncadreDescription>
            </div>
        </div>
    );
}

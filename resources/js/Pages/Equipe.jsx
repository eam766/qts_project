import titre from "@/assets/img/TitreNotreEquipe.png";
import TitreNom from "@/Components/Equipe/TitreNom";
import EncadreDescription from "@/Components/Equipe/EncadreDescription";
import emilie from "@/assets/img/Emilie_Avatar.png";
import alex from "@/assets/img/Alex_Avatar.png";
import veronica from "@/assets/img/Veronica_Avatar.png";
import jean from "@/assets/img/Jean_Avatar.png";
import { Head } from "@inertiajs/react";

export default function Equipe() {
    return (
        <div>
            <Head title={"Équipe"} />
            <img src={titre} alt="" className="mb-20" />
            <TitreNom color="#81EC86">Emilie</TitreNom>
            <EncadreDescription image={emilie} color="#81EC86">
                <p className="text-[#81EC86]">SCRUM MASTER</p>
                <br />
                En tant que SCRUM Master, Émilie veille à la bonne organisation
                des événements SCRUM et assure la gestion des documents. Sa
                rigueur et son sens de l'organisation permettent à l'équipe
                d'évoluer dans un cadre structurant et efficace. Dotée d'un
                excellent sens de la communication, Émilie s'assure que chaque
                membre de l'équipe comprend bien les attentes et les objectifs à
                atteindre. Elle excelle dans la gestion du temps et la
                planification, ce qui permet à l'équipe de respecter les délais
                tout en assurant la qualité du travail produit.
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
                    <p className="text-[#02D7F2]">CHEF D'ÉQUIPE</p>
                    <br />
                    Alexandre occupe le rôle de Team Lead. Son intérêt marqué
                    pour la gestion d'équipe et sa grande tolérance au stress
                    font de lui un leader efficace. Il se distingue par sa
                    capacité à prendre des décisions rapides et à motiver les
                    membres de l'équipe, même dans les moments de forte
                    pression. Alexandre n'hésite jamais à prendre des
                    initiatives pour s'assurer que les objectifs sont atteints.
                    Son engagement constant et son sens du dévouement créent un
                    environnement de travail positif où chaque membre de
                    l'équipe se sent soutenu et valorisé.
                </EncadreDescription>
            </div>
            <br />
            <TitreNom color="#F0F14E">Veronica</TitreNom>
            <EncadreDescription image={veronica} color="#F0F14E">
                <p className="text-[#F0F14E]">DÉVELOPPEUSE ET ANALYSTE AQ</p>
                <br />
                Veronica assure le rôle de QA et de développeuse. Son approche
                méthodique, son respect des processus et son efficacité dans les
                tâches minutieuses garantissent la qualité et la stabilité du
                projet. Elle possède une grande rigueur et une patience
                exemplaire, des qualités essentielles pour identifier et
                corriger les moindres détails pouvant affecter la performance du
                projet. Veronica s'investit pleinement dans la recherche de
                solutions efficaces et veille à ce que les standards de qualité
                soient respectés à chaque étape du développement. Sa précision
                et son professionnalisme contribuent grandement à la réussite du
                projet.
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
                    <p className="text-[#FD0130]">DÉVELOPPEUR</p>
                    <br />
                    Jean occupe le poste de développeur. Sa capacité à gérer les
                    imprévus et à résoudre rapidement des problèmes techniques
                    en fait un atout majeur pour l'équipe. Doté d'une forte
                    curiosité technique, Jean est toujours à l'affût de
                    nouvelles technologies et de solutions innovantes pour
                    améliorer le projet. Il fait preuve d'une grande patience et
                    d'une attention particulière aux détails, ce qui lui permet
                    de livrer un code propre et efficace. Sa capacité à
                    travailler en collaboration avec les autres membres de
                    l'équipe favorise une dynamique positive et productive.
                </EncadreDescription>
            </div>
        </div>
    );
}

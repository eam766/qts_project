import EncadrePresentation from "@/Components/APropos/EncadrePresentation";
import EncadreMission from "@/Components/APropos/EncadreMission";
import EncadreObjectifs from "@/Components/APropos/EncadreObjectifs";
import {Head} from "@inertiajs/react";
export default function A_Propos() {
    return (
        <div
            style={{ height: "100%" }}
            className="flex flex-col justify-around "
        >
            <Head title={"À propos"}/>
            <EncadrePresentation>
                QTs Montréal est une entreprise innovante basée à Montréal,
                spécialisée dans la création de plateformes numériques modernes
                et transactionnelles. Depuis sa fondation, notre objectif est de
                révolutionner l’expérience utilisateur en ligne grâce à des
                solutions technologiques fiables, intuitives et performantes.
                <br />
                <br />
                Notre expertise se concentre sur le développement d’applications
                web et mobiles adaptées aux besoins des consommateurs
                d’aujourd’hui. Nous combinons technologies avancées, créativité
                et savoir-faire pour offrir des produits de haute qualité qui
                répondent aux attentes du marché numérique.
            </EncadrePresentation>
            <EncadreMission>
                <br />
                Chez QTs Montréal, nous croyons que chaque projet est une
                opportunité de repousser les limites de l’innovation. Notre
                mission est de fournir des plateformes conviviales et sécurisées
                qui facilitent les transactions en ligne et enrichissent
                l’expérience utilisateur. Nous aspirons à devenir une référence
                dans l’industrie des solutions numériques en nous démarquant par
                notre attention aux détails et notre capacité à transformer les
                idées en réalité.
            </EncadreMission>
            <EncadreObjectifs>
                Avec notre site web de vente de jeux vidéo, notre objectif est
                d'offrir une plateforme moderne et intuitive qui simplifie
                l'exploration, l'achat et la gestion de jeux. Inspirés par des
                références comme Steam, nous souhaitons aller plus loin en
                proposant une interface épurée, un design soigné et une
                expérience utilisateur fluide.
                <br />
                <br />
                Nous voulons offrir aux joueurs un large choix de titres, allant
                des nouveautés aux classiques, tout en garantissant une
                navigation rapide et agréable. Chaque utilisateur pourra gérer
                facilement sa bibliothèque de jeux et effectuer des achats en
                toute simplicité grâce à une interface pensée pour eux. Notre
                ambition est de devenir une référence dans le monde du gaming en
                ligne en combinant technologie, passion et innovation. Nous
                aspirons à transformer la manière dont les gamers découvrent,
                achètent et interagissent avec leurs jeux, en offrant une
                expérience unique et immersive.
            </EncadreObjectifs>
        </div>
    );
}

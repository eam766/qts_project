import logo from "../assets/img/FrogLogo.png";
import encadrePresentation from "../assets/img/Encadre_Presentation27.png";
import circuit from "../assets/img/imageCircuit.png";
import manette from "../assets/img/imageManetteJeux2.png";
import encadreMission from "../assets/img/Encadre_Mission7.png";
import encadreObjectif from "../assets/img/Encadre_Objectif6.png";
export default function A_Propos() {
    return (
        <div
            style={{ height: "100%" }}
            className="flex flex-col justify-around "
        >
            <div className="flex flex-row basis-1/3 justify-evenly ">
                <img src={logo} alt="" />
                <p
                    style={{
                        backgroundImage: `url(${encadrePresentation})`,
                        backgroundRepeat: "no-repeat",
                        backgroundPosition: "center",
                        backgroundSize: "100% 100%",
                        minHeight: "330px",
                        width: "100%",
                        maxWidth: "800px",
                        overflow: "hidden",
                        padding: "30px",
                    }}
                    className="  p-10"
                >
                    <p
                        style={{ fontFamily: "Audiowide", color: "#8A2BE2" }}
                        className="text-xl mb-4"
                    >
                        Présentation de l’entreprise
                    </p>
                    QTs Montréal est une entreprise innovante basée à Montréal,
                    spécialisée dans la création de plateformes numériques
                    modernes et transactionnelles. Depuis sa fondation, notre
                    objectif est de révolutionner l’expérience utilisateur en
                    ligne grâce à des solutions technologiques fiables,
                    intuitives et performantes.
                    <br />
                    <br />
                    Notre expertise se concentre sur le développement
                    d’applications web et mobiles adaptées aux besoins des
                    consommateurs d’aujourd’hui. Nous combinons technologies
                    avancées, créativité et savoir-faire pour offrir des
                    produits de haute qualité qui répondent aux attentes du
                    marché numérique.
                </p>
            </div>
            <div className="flex basis-1/3 justify-around mt-32">
                <p
                    style={{
                        backgroundImage: `url(${encadreMission})`,
                        backgroundRepeat: "no-repeat",
                        backgroundPosition: "center",
                        backgroundSize: "100% 100%",
                        minHeight: "330px",
                        width: "100%",
                        maxWidth: "800px",
                        overflow: "hidden",
                        padding: "30px",
                    }}
                    className=" p-20 pt-11"
                >
                    <br />
                    <p
                        style={{ fontFamily: "Audiowide", color: "#8A2BE2" }}
                        className="text-xl"
                    >
                        Notre Mission
                    </p>
                    <br />
                    Chez QTs Montréal, nous croyons que chaque projet est une
                    opportunité de repousser les limites de l’innovation. Notre
                    mission est de fournir des plateformes conviviales et
                    sécurisées qui facilitent les transactions en ligne et
                    enrichissent l’expérience utilisateur. Nous aspirons à
                    devenir une référence dans l’industrie des solutions
                    numériques en nous démarquant par notre attention aux
                    détails et notre capacité à transformer les idées en
                    réalité.
                </p>
                <img src={circuit} alt="" width={370} />
            </div>
            <div className="flex flex-row basis-1/3 justify-evenly mt-32">
                <img
                    src={manette}
                    alt=""
                    width={420}
                    style={{ height: "auto", objectFit: "contain" }}
                />

                <p
                    style={{
                        backgroundImage: `url(${encadreObjectif})`,
                        backgroundRepeat: "no-repeat",
                        backgroundPosition: "center",
                        backgroundSize: "100% 100%",
                        minHeight: "330px",
                        width: "100%",
                        maxWidth: "800px",
                        overflow: "hidden",
                        padding: "30px",
                        paddingBottom: "40px",
                    }}
                >
                    <br />
                    <br />
                    <p
                        style={{ fontFamily: "Audiowide", color: "#8A2BE2" }}
                        className="text-xl"
                    >
                        Nos Objectifs
                    </p>
                    <br />
                    Avec notre site web de vente de jeux vidéo, notre objectif
                    est d'offrir une plateforme moderne et intuitive qui
                    simplifie l'exploration, l'achat et la gestion de jeux.
                    Inspirés par des références comme Steam, nous souhaitons
                    aller plus loin en proposant une interface épurée, un design
                    soigné et une expérience utilisateur fluide.
                    <br />
                    <br />
                    Nous voulons offrir aux joueurs un large choix de titres,
                    allant des nouveautés aux classiques, tout en garantissant
                    une navigation rapide et agréable. Chaque utilisateur pourra
                    gérer facilement sa bibliothèque de jeux et effectuer des
                    achats en toute simplicité grâce à une interface pensée pour
                    eux. Notre ambition est de devenir une référence dans le
                    monde du gaming en ligne en combinant technologie, passion
                    et innovation. Nous aspirons à transformer la manière dont
                    les gamers découvrent, achètent et interagissent avec leurs
                    jeux, en offrant une expérience unique et immersive.
                    <br />
                </p>
            </div>
        </div>
    );
}

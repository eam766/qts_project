import cookie_deco from "../assets/img/CookieDecoration.png";
import logo_caution from "../assets/img/LogoAttention.png";
import bouton_refuser from "../assets/img/Bouton_Connexion4.png";
import bouton_accepter from "../assets/img/Bouton_Inscription.png";
export default function CookieBanner() {
    return (
        <div
            className="flex  items-center m-3"
            style={{ backgroundColor: "#1A1A1A" }}
        >
            <img
                src={cookie_deco}
                alt=""
                style={{ height: "130px" }}
                className="mr-5"
            />
            <div className=" mt-3">
                <div className="flex">
                    <img src={logo_caution} alt="" style={{ height: "30px" }} />
                    <p
                        className="text-2xl"
                        style={{
                            fontFamily: "AudioWide",
                            color: "#E5315C",
                            margin: "0 5px",
                        }}
                    >
                        Attention
                    </p>
                    <img src={logo_caution} alt="" style={{ height: "30px" }} />
                    <div className="flex justify-end basis-5/6">
                        <button className="buttonLeft AudioWideBlue mr-1">
                            Accepter
                        </button>
                        <button className="buttonRight AudioWideBlue">
                            Refuser
                        </button>
                    </div>
                </div>
                <br />
                <p
                    className="text-sm flex w-3/4 "
                    style={{ fontFamily: "Orbitron" }}
                >
                    Ce site web utilise des cookies. Les cookies nous permettent
                    de personnaliser le contenu et les annonces, d'offrir des
                    fonctionnalités relatives aux médias sociaux et d'analyser
                    notre trafic. Nous partageons également des informations sur
                    l'utilisation de notre site avec nos partenaires de médias
                    sociaux, de publicité et d'analyse, qui peuvent combiner
                    celles-ci avec d'autres informations que vous leur avez
                    fournies ou qu'ils ont collectées lors de votre utilisation
                    de leurs services.
                </p>
            </div>
        </div>
    );
}

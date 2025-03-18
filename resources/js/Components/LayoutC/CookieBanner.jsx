import { useState, useEffect } from "react";
import cookie_deco from "../../assets/img/CookieDecoration.png";
import logo_caution from "../../assets/img/LogoAttention.png";

export default function CookieBanner() {
    const [bannerCookieVisible, setBannerCookieVisible] = useState(true);

    useEffect(() => {
        const cookieAccepted = localStorage.getItem("cookieAccepted");
        if (cookieAccepted === "true" || cookieAccepted === "false") {
            setBannerCookieVisible(false);
        }
    }, []);

    const handleAccept = () => {
        localStorage.setItem("cookieAccepted", "true");
        setBannerCookieVisible(false);
    };

    const handleRefuse = () => {
        localStorage.setItem("cookieAccepted", "false");
        setBannerCookieVisible(false);
    };

    return (
        <div className="relative">
            {/* Bannière des cookies - Visible avant acceptation/refus */}
            {bannerCookieVisible && (
                <div
                    className="fixed bottom-0 left-0 w-full flex items-center p-4 shadow-lg"
                    style={{
                        backgroundColor: "#1A1A1A",
                        zIndex: 9999, // Au-dessus du footer
                        padding: "20px",
                    }}
                >
                    {/* Image de gauche */}
                    <img
                        src={cookie_deco}
                        alt="Cookie decoration"
                        style={{ height: "120px" }}
                        className="mr-3"
                    />

                    {/* Conteneur du texte */}
                    <div className="flex flex-col w-full">
                        <div className="flex justify-between items-center w-full">
                            {/* Titre et icônes Attention */}
                            <div className="flex items-center">
                                <img
                                    src={logo_caution}
                                    alt="Attention logo"
                                    style={{ height: "30px" }}
                                />
                                <p
                                    className="text-2xl  mx-2"
                                    style={{
                                        fontFamily: "AudioWide",
                                        color: "#E5315C",
                                    }}
                                >
                                    Attention
                                </p>
                                <img
                                    src={logo_caution}
                                    alt="Attention logo"
                                    style={{ height: "30px" }}
                                />
                            </div>

                            {/* Boutons */}
                            <div className="flex">
                                <button
                                    className="buttonLeft AudioWideBlue mr-2"
                                    onClick={handleAccept}
                                >
                                    Accepter
                                </button>
                                <button
                                    className="buttonRight AudioWideBlue"
                                    onClick={handleRefuse}
                                >
                                    Refuser
                                </button>
                            </div>
                        </div>

                        {/* Texte d'information */}
                        <p
                            className="text-sm mt-2 w-3/4"
                            style={{ fontFamily: "Orbitron" }}
                        >
                            Ce site web utilise des cookies. Les cookies nous
                            permettent de personnaliser le contenu et les
                            annonces, d'offrir des fonctionnalités relatives aux
                            médias sociaux et d'analyser notre trafic. Nous
                            partageons également des informations sur
                            l'utilisation de notre site avec nos partenaires de
                            médias sociaux, de publicité et d'analyse, qui
                            peuvent combiner celles-ci avec d'autres
                            informations que vous leur avez fournies ou qu'ils
                            ont collectées lors de votre utilisation de leurs
                            services.
                        </p>
                    </div>
                </div>
            )}
        </div>
    );
}

// import cookie_deco from "../assets/img/CookieDecoration.png";
// import logo_caution from "../assets/img/LogoAttention.png";
// import bouton_refuser from "../assets/img/Bouton_Connexion4.png";
// import bouton_accepter from "../assets/img/Bouton_Inscription.png";
// export default function CookieBanner() {

//     return (
//         <div
//             className="flex  items-center m-3"
//             style={{ backgroundColor: "#1A1A1A" }}
//         >
//             <img
//                 src={cookie_deco}
//                 alt=""
//                 style={{ height: "130px" }}
//                 className="mr-5"
//             />
//             <div className=" mt-3">
//                 <div className="flex">
//                     <img src={logo_caution} alt="" style={{ height: "30px" }} />
//                     <p
//                         className="text-2xl"
//                         style={{
//                             fontFamily: "AudioWide",
//                             color: "#E5315C",
//                             margin: "0 5px",
//                         }}
//                     >
//                         Attention
//                     </p>
//                     <img src={logo_caution} alt="" style={{ height: "30px" }} />
//                     <div className="flex justify-end basis-5/6">
//                         <button className="buttonLeft AudioWideBlue mr-1">
//                             Accepter
//                         </button>
//                         <button className="buttonRight AudioWideBlue">
//                             Refuser
//                         </button>
//                     </div>
//                 </div>
//                 <br />
//                 <p
//                     className="text-sm flex w-3/4 "
//                     style={{ fontFamily: "Orbitron" }}
//                 >
//                     Ce site web utilise des cookies. Les cookies nous permettent
//                     de personnaliser le contenu et les annonces, d'offrir des
//                     fonctionnalités relatives aux médias sociaux et d'analyser
//                     notre trafic. Nous partageons également des informations sur
//                     l'utilisation de notre site avec nos partenaires de médias
//                     sociaux, de publicité et d'analyse, qui peuvent combiner
//                     celles-ci avec d'autres informations que vous leur avez
//                     fournies ou qu'ils ont collectées lors de votre utilisation
//                     de leurs services.
//                 </p>
//             </div>
//         </div>
//     );
// }

//////////////////////////////////////////////////////////////////////
//V2
// import { useState, useEffect } from "react";
// import cookie_deco from "../assets/img/CookieDecoration.png";
// import logo_caution from "../assets/img/LogoAttention.png";

// export default function CookieBanner() {
//     const [bannerVisible, setBannerVisible] = useState(true);

//     // Vérifier si l'utilisateur a déjà accepté ou refusé les cookies
//     useEffect(() => {
//         const cookiePreference = localStorage.getItem("cookieAccepted");
//         if (cookiePreference !== null) {
//             setBannerVisible(false);
//         }
//     }, []);

//     // Fonction pour gérer la réponse de l'utilisateur
//     const handleCookieChoice = (accepted) => {
//         localStorage.setItem("cookieAccepted", accepted ? "true" : "false");
//         setBannerVisible(false);
//     };

//     if (!bannerVisible) return null; // Ne pas afficher la bannière si elle est cachée

//     return (
//         <div
//             className="flex items-center m-3"
//             style={{ backgroundColor: "#1A1A1A" }}
//         >
//             <img
//                 src={cookie_deco}
//                 alt=""
//                 style={{ height: "130px" }}
//                 className="mr-5"
//             />
//             <div className="mt-3">
//                 <div className="flex">
//                     <img src={logo_caution} alt="" style={{ height: "30px" }} />
//                     <p
//                         className="text-2xl"
//                         style={{
//                             fontFamily: "AudioWide",
//                             color: "#E5315C",
//                             margin: "0 5px",
//                         }}
//                     >
//                         Attention
//                     </p>
//                     <img src={logo_caution} alt="" style={{ height: "30px" }} />
//                     <div className="flex justify-end basis-5/6">
//                         <button
//                             className="buttonLeft AudioWideBlue mr-1"
//                             onClick={() => handleCookieChoice(true)}
//                         >
//                             Accepter
//                         </button>
//                         <button
//                             className="buttonRight AudioWideBlue"
//                             onClick={() => handleCookieChoice(false)}
//                         >
//                             Refuser
//                         </button>
//                     </div>
//                 </div>
//                 <br />
//                 <p
//                     className="text-sm flex w-3/4"
//                     style={{ fontFamily: "Orbitron" }}
//                 >
//                     Ce site web utilise des cookies. Les cookies nous permettent
//                     de personnaliser le contenu et les annonces, d'offrir des
//                     fonctionnalités relatives aux médias sociaux et d'analyser
//                     notre trafic...
//                 </p>
//             </div>
//         </div>
//     );
// }
////////////////////////////////////////////////////////////////////////
//V3
// import { useState, useEffect } from "react";
// import cookie_deco from "../assets/img/CookieDecoration.png";
// import logo_caution from "../assets/img/LogoAttention.png";
// import footer_corner from "../assets/img/Footer_Corner3.png";

// export default function CookieBanner() {
//     const [bannerCookieVisible, setBannerCookieVisible] = useState(true);

//     useEffect(() => {
//         const cookieAccepted = localStorage.getItem("cookieAccepted");
//         if (cookieAccepted === "true" || cookieAccepted === "false") {
//             setBannerCookieVisible(false);
//         }
//     }, []);

//     const handleAccept = () => {
//         localStorage.setItem("cookieAccepted", "true");
//         setBannerCookieVisible(false);
//     };

//     const handleRefuse = () => {
//         localStorage.setItem("cookieAccepted", "false");
//         setBannerCookieVisible(false);
//     };

//     return (
//         <div className="relative">
//             {/* Cookie Banner (only visible before user makes a choice) */}
//             {bannerCookieVisible && (
//                 <div
//                     className="fixed bottom-0 left-1/2 transform -translate-x-1/2 flex items-center p-4 rounded-lg shadow-lg"
//                     style={{
//                         backgroundColor: "#1A1A1A",
//                         zIndex: 9999, // Ensures it stays above the footer
//                         width: "100%",
//                         maxWidth: "100%",
//                     }}
//                 >
//                     <img
//                         src={cookie_deco}
//                         alt="Cookie decoration"
//                         style={{ height: "100px" }}
//                         className="mr-3"
//                     />
//                     <div className="flex flex-col">
//                         <div className="flex items-center">
//                             <img
//                                 src={logo_caution}
//                                 alt="Attention logo"
//                                 style={{ height: "30px" }}
//                             />
//                             <p
//                                 className="text-2xl text-red-500 mx-2"
//                                 style={{ fontFamily: "AudioWide" }}
//                             >
//                                 Attention
//                             </p>
//                             <img
//                                 src={logo_caution}
//                                 alt="Attention logo"
//                                 style={{ height: "30px" }}
//                             />
//                         </div>
//                         <p
//                             className="text-sm mt-2 w-3/4"
//                             style={{ fontFamily: "Orbitron" }}
//                         >
// Ce site web utilise des cookies. Les cookies nous
// permettent de personnaliser le contenu et les
// annonces, d'offrir des fonctionnalités relatives aux
// médias sociaux et d'analyser notre trafic. Nous
// partageons également des informations sur
// l'utilisation de notre site avec nos partenaires de
// médias sociaux, de publicité et d'analyse, qui
// peuvent combiner celles-ci avec d'autres
// informations que vous leur avez fournies ou qu'ils
// ont collectées lors de votre utilisation de leurs
// services.
//                         </p>
//                         <div className="absolute top-2 right-2 flex">
//                             <button
//                                 className="buttonLeft AudioWideBlue mr-2"
//                                 onClick={handleAccept}
//                             >
//                                 Accepter
//                             </button>
//                             <button
//                                 className="buttonRight AudioWideBlue"
//                                 onClick={handleRefuse}
//                             >
//                                 Refuser
//                             </button>
//                         </div>
//                     </div>
//                 </div>
//             )}

//             {/* Footer - Always Visible */}
//             <footer className="ml-5 mt-6">
//                 <img src={footer_corner} alt="" height={300} width={300} />
//                 <p className="text-xs text-center mb-5">
//                     @ QTS Montréal. Tout droits réservés. Toutes les marques
//                     commerciales et marques déposées sont la propriété de leurs
//                     propriétaires respectifs.
//                 </p>
//             </footer>
//         </div>
//     );
// }

//V4
import { useState, useEffect } from "react";
import cookie_deco from "../assets/img/CookieDecoration.png";
import logo_caution from "../assets/img/LogoAttention.png";
import footer_corner from "../assets/img/Footer_Corner3.png";

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

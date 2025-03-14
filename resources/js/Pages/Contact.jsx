import {Head, Link} from "@inertiajs/react";
import titre from "@/assets/img/ContactTitre.png";

export default function Contact() {
    return (
        <div>
            <div className="flex flex-row h-1/2">
                <Head title={"Contact"}/>
                <img
                    src={titre}
                    alt="Titre du contact"
                    className="w-1/2 h-full object-contain"
                />

                <div className="ml-12 w-1/2 h-full flex flex-col justify-between">
                    <div className="flex flex-row">
                        <div className="w-1/2">
                            <p className="AudioWideBlue font-bold text-xl mb-2">
                                EMPLACEMENT
                            </p>
                            <p className="text-sm">
                                9155 Rue St-Hubert, Montréal, QC H2M 1Y8
                            </p>
                            <div className="border rounded-full max-w-max p-2 pr-3 pl-3 mt-2 hover:bg-[#8a2be2] active:bg-[#8a2be2] transition-colors duration-300">
                                <Link className="text-sm">
                                    OBTENIR L'ITINÉRAIRE
                                </Link>
                            </div>
                        </div>
                        <div className="w-1/2">
                            <p className="AudioWideBlue font-bold text-xl mb-2">
                                CONTACT
                            </p>
                            <p className="text-sm">
                                Pour toute demande concernant un projet ou pour
                                signaler un problème avec le site web,
                                contactez-nous à
                                <br />
                                <a
                                    href="mailto:qtsmontreal@gmail.com"
                                    className="hover:underline"
                                    style={{
                                        color: "#02d7f2",
                                    }}
                                >
                                    qtsmontreal@gmail.com
                                </a>
                            </p>
                        </div>
                    </div>
                    <div>
                        <p className="AudioWideBlue font-bold text-xl mb-2 mt-2">
                            SUIVEZ-NOUS
                        </p>
                        <div className="max-w-max">
                            <p className="text-sm hover:underline">Facebook</p>
                        </div>
                        <div className="max-w-max">
                            <p className="text-sm hover:underline">Twitter</p>
                        </div>
                        <div className="max-w-max">
                            <p className="text-sm hover:underline">Discord</p>
                        </div>
                        <div className="max-w-max">
                            <p className="text-sm hover:underline">Instagram</p>
                        </div>
                        <div className="max-w-max">
                            <p className="text-sm hover:underline">Youtube</p>
                        </div>
                    </div>
                </div>
            </div>
            <p className="w-2/3 mt-16">
                Vous avez une idée de projet ou rencontrez un problème avec
                notre site web? <br />
                Nous sommes toujours ravis d'échanger avec vous! Que vous
                souhaitiez collaborer avec nous sur un nouveau projet, poser des
                questions ou nous informer d'un souci technique, votre message
                est important. <br /> En nous contactant, vous contribuez à
                améliorer nos services et à développer des idées innovantes.
                N'hésitez pas à nous écrire, nous vous répondrons avec plaisir
                dans les plus brefs délais.
            </p>
        </div>
    );
}

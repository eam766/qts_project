import titre from "@/assets/img/TermesConditionsTitre.png";
import {Head} from "@inertiajs/react";
export default function TermesConditions() {
    return (
        <div>
            <Head title={"Conditions"}/>
            <img src={titre} alt="" />
            <br />
            <p>Dernière mise à jour : 2025/02/05</p>
            <p>
                Bienvenue sur le site web de Ludic. En accédant et en utilisant
                ce site, vous acceptez les termes et conditions suivants.
                Veuillez les lire attentivement avant de vous inscrire et
                d’acheter nos produits.
            </p>
            <br />
            <hr />
            <br />
            <p>
                <p className="title-paragraph AudioWideBlue">
                    1. ACCEPTATION DES CONDITIONS
                </p>{" "}
                En créant un compte et en utilisant notre site web, vous
                reconnaissez avoir lu, compris et accepté ces termes et
                conditions. Si vous ne les acceptez pas, veuillez ne pas
                utiliser notre site.
            </p>
            <br />
            <p>
                <p className="title-paragraph AudioWideBlue">
                    2. SERVICES PROPOSÉS
                </p>{" "}
                Ludic est une plateforme de vente de jeux vidéo, permettant aux
                utilisateurs d’acheter et de télécharger des jeux en version
                numérique.
            </p>
            <br />
            <p>
                <p className="title-paragraph AudioWideBlue">
                    3. CRÉATION DE COMPTE
                </p>{" "}
                Pour effectuer un achat, vous devez créer un compte en
                fournissant des informations exactes et à jour. Vous êtes
                responsable de la confidentialité de vos identifiants de
                connexion et de toute activité effectuée sous votre compte. Tout
                compte suspecté d’activité frauduleuse ou de violation des
                règles peut être suspendu ou supprimé.
            </p>
            <br />
            <p>
                <p className="title-paragraph AudioWideBlue">
                    4. ACHATS ET TRANSACTIONS
                </p>{" "}
                Tous les prix sont indiqués en dollar canadien et
                incluent/excluent les taxes applicables selon votre
                localisation. Les paiements sont effectués via des plateformes
                sécurisées et nous ne stockons aucune information bancaire. Une
                fois un achat confirmé, aucun remboursement ne sera effectué
                sauf en cas de problème technique empêchant l’accès au jeu.
            </p>
            <br />
            <p>
                <p className="title-paragraph AudioWideBlue">
                    5. LIVRAISON DES JEUX
                </p>{" "}
                Les jeux achetés sont disponibles en téléchargement immédiat
                après confirmation du paiement. En cas de problème avec le
                téléchargement ou l’activation, veuillez contacter notre support
                technique.
            </p>
            <br />
            <p>
                <p className="title-paragraph AudioWideBlue">
                    6. RESPONSABILITÉ
                </p>{" "}
                Ludic ne garantit pas un accès ininterrompu à ses services et ne
                pourra être tenu responsable des éventuelles interruptions ou
                erreurs. L’utilisateur est responsable de son matériel et de la
                compatibilité des jeux achetés avec son système.
            </p>
            <br />
            <p>
                <p className="title-paragraph AudioWideBlue">
                    7. PROTECTION DES DONNÉES PERSONNELLES
                </p>{" "}
                Les informations personnelles des utilisateurs sont collectées
                uniquement pour la gestion des comptes et des transactions.
                Consultez notre politique de confidentialité pour plus de
                détails sur l’utilisation de vos données.
            </p>
            <br />
            <p>
                <p className="title-paragraph AudioWideBlue">
                    8. MODIFICATIONS DES CONDITIONS
                </p>{" "}
                Ludic se réserve le droit de modifier ces termes à tout moment.
                Les utilisateurs seront informés des mises à jour importantes
                via le site.
            </p>
            <br />
            <p>
                <p className="title-paragraph AudioWideBlue">9. CONTACT</p> Pour
                toute question concernant ces termes et conditions, vous pouvez
                nous contacter à ludic@gmail.com.
            </p>
        </div>
    );
}

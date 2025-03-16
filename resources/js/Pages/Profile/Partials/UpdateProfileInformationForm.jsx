import { useState } from "react";
import InputError from "@/Components/InputError";
import { Transition } from "@headlessui/react";
import { Link, useForm, usePage } from "@inertiajs/react";
import DateInput from "@/Components/DateInput";
import CountrySelect from "@/Components/CountrySelect";

export default function UpdateProfileInformation({
    mustVerifyEmail,
    status,
    className = "",
}) {
    const user = usePage().props.auth.user;

    // ✅ Utilisation de useForm pour gérer les données envoyées au backend
    const { data, setData, patch, errors, processing, recentlySuccessful } =
        useForm({
            firstName: user.firstName,
            lastName: user.lastName,
            dateOfBirth: user.dateOfBirth,
            country: user.country,
            username: user.username,
            email: user.email,
        });

    // ✅ Utilisation de useState pour éviter le rechargement visuel
    const [localData, setLocalData] = useState({ ...data });

    const submit = (e) => {
        e.preventDefault();

        patch(route("profile.update"), {
            preserveState: true,
            preserveScroll: true,
            onSuccess: () => {
                // ✅ Met à jour l'état local après mise à jour de la BD
                setLocalData({ ...data });
            },
        });
    };

    return (
        <section className={className}>
            <header>
                <h2 className="text-lg font-medium text-white">
                    Informations du profil
                </h2>

                <p className="mt-1 text-sm text-gray-600 dark:text-gray-400">
                    Mettez à jour les informations de profil et l'adresse e-mail
                    de votre compte.
                </p>
            </header>

            <form onSubmit={submit} method="PATCH" className="mt-6 space-y-6">
                <div className="flex flex-row gap-16">
                    <div className="flex flex-col">
                        <label htmlFor="username" className="AudioWideBlue">
                            Identifiant
                        </label>

                        <input
                            id="username"
                            className="bg-transparent bgInput"
                            value={localData.username}
                            onChange={(e) => {
                                setData("username", e.target.value);
                                setLocalData({
                                    ...localData,
                                    username: e.target.value,
                                });
                            }}
                            required
                            autoComplete="username"
                        />

                        <InputError
                            className="mt-2"
                            message={errors.username}
                        />
                    </div>
                    <div className="flex flex-col">
                        <label htmlFor="lastName" className="AudioWideBlue">
                            Nom
                        </label>

                        <input
                            id="lastName"
                            className="bg-transparent bgInput"
                            value={localData.lastName}
                            onChange={(e) => {
                                setData("lastName", e.target.value);
                                setLocalData({
                                    ...localData,
                                    lastName: e.target.value,
                                });
                            }}
                            required
                            autoComplete="lastName"
                        />

                        <InputError
                            className="mt-2"
                            message={errors.lastName}
                        />
                    </div>
                </div>

                <div className="flex flex-row gap-16">
                    <div className="flex flex-col">
                        <label htmlFor="email" className="AudioWideBlue">
                            Courriel
                        </label>

                        <input
                            id="email"
                            type="email"
                            className="bg-transparent bgInput"
                            value={localData.email}
                            onChange={(e) => {
                                setData("email", e.target.value);
                                setLocalData({
                                    ...localData,
                                    email: e.target.value,
                                });
                            }}
                            required
                            autoComplete="email"
                        />

                        <InputError className="mt-2" message={errors.email} />
                    </div>
                    <div className="flex flex-col">
                        <label htmlFor="firstName" className="AudioWideBlue">
                            Prénom
                        </label>

                        <input
                            id="firstName"
                            type="text"
                            className="bg-transparent bgInput"
                            value={localData.firstName}
                            onChange={(e) => {
                                setData("firstName", e.target.value);
                                setLocalData({
                                    ...localData,
                                    firstName: e.target.value,
                                });
                            }}
                            required
                            autoComplete="firstName"
                        />

                        <InputError
                            className="mt-2"
                            message={errors.firstName}
                        />
                    </div>
                </div>

                <div className="flex flex-row gap-16">
                    <div className="flex flex-col">
                        <label htmlFor="dateOfBirth" className="AudioWideBlue">
                            Date de naissance
                        </label>
                        <DateInput
                            value={localData.dateOfBirth}
                            onChange={(value) => {
                                setData("dateOfBirth", value);
                                setLocalData({
                                    ...localData,
                                    dateOfBirth: value,
                                });
                            }}
                        />

                        <InputError
                            className="mt-2"
                            message={errors.dateOfBirth}
                        />
                    </div>
                    <div className="flex flex-col">
                        <label htmlFor="country" className="AudioWideBlue">
                            Pays
                        </label>
                        <CountrySelect
                            value={localData.country}
                            onChange={(value) => {
                                setData("country", value);
                                setLocalData({
                                    ...localData,
                                    country: value,
                                });
                            }}
                        />
                        <InputError className="mt-2" message={errors.country} />
                    </div>
                </div>

                {mustVerifyEmail && user.email_verified_at === null && (
                    <div>
                        <p className="mt-2 text-sm text-gray-800 dark:text-gray-200">
                            Votre courriel n'est pas vérifié.
                            <Link
                                href={route("verification.send")}
                                method="post"
                                as="button"
                                className="rounded-md text-sm text-gray-600 underline hover:text-gray-900 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 dark:text-gray-400 dark:hover:text-gray-100 dark:focus:ring-offset-gray-800"
                            >
                                Cliquez ici pour renvoyer l'e-mail de
                                vérification.
                            </Link>
                        </p>

                        {status === "verification-link-sent" && (
                            <div className="mt-2 text-sm font-medium text-green-600 dark:text-green-400">
                                Un nouveau lien de vérification a été envoyé à
                                votre courriel.
                            </div>
                        )}
                    </div>
                )}

                <div className="flex items-center gap-4">
                    <button
                        type="submit"
                        disabled={processing}
                        className="buttonLeft AudioWideBlue ml-auto"
                    >
                        {processing ? "Enregistrement..." : "Enregistrer"}
                    </button>
                </div>
            </form>

            <Transition
                show={recentlySuccessful}
                enter="transition ease-in-out duration-300"
                enterFrom="opacity-0 translate-y-5"
                leave="transition ease-in-out duration-300"
                leaveTo="opacity-0 translate-y-5"
            >
                <div className="fixed bottom-5 right-5 bg-green-500 text-white px-4 py-2 rounded shadow-lg">
                    Profil mis à jour avec succès !
                </div>
            </Transition>
        </section>
    );
}

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

    const { data, setData, patch, errors, processing, recentlySuccessful } =
        useForm({
            firstName: user.firstName,
            lastName: user.lastName,
            dateOfBirth: user.dateOfBirth,
            country: user.country,
            username: user.username,
            email: user.email,
        });

    const submit = (e) => {
        e.preventDefault();

        patch(route("profile.update"));
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
                            value={data.username}
                            onChange={(e) =>
                                setData("username", e.target.value)
                            }
                            required
                            isFocused
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
                            value={data.lastName}
                            onChange={(e) =>
                                setData("lastName", e.target.value)
                            }
                            required
                            isFocused
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
                            value={data.email}
                            onChange={(e) => setData("email", e.target.value)}
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
                            type="firstName"
                            className="bg-transparent bgInput pl-3"
                            value={data.firstName}
                            onChange={(e) =>
                                setData("firstName", e.target.value)
                            }
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
                            value={data.dateOfBirth}
                            onChange={(e) =>
                                setData("dateOfBirth", e.target.value)
                            }
                        ></DateInput>

                        <InputError className="mt-2" message={errors.email} />
                    </div>
                    <div className="flex flex-col">
                        <label htmlFor="country" className="AudioWideBlue">
                            Pays
                        </label>
                        <CountrySelect
                            value={data.country}
                            onChange={(e) => setData("country", e.target.value)}
                        ></CountrySelect>
                        <InputError className="mt-2" message={errors.country} />
                    </div>
                </div>

                {mustVerifyEmail && user.email_verified_at === null && (
                    <div>
                        <p className="mt-2 text-sm text-gray-800 dark:text-gray-200">
                            Votre courriel n'est pas vérifiée.
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
                        Enregistrer
                    </button>

                    <Transition
                        show={recentlySuccessful}
                        enter="transition ease-in-out"
                        enterFrom="opacity-0"
                        leave="transition ease-in-out"
                        leaveTo="opacity-0"
                    >
                        <p className="text-sm text-gray-600 dark:text-gray-400">
                            Enregistrée.
                        </p>
                    </Transition>
                </div>
            </form>
        </section>
    );
}

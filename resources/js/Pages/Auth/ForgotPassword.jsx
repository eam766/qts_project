import { useForm, Link } from "@inertiajs/react";

export default function ForgotPassword({ status }) {
    const { data, setData, post, processing, errors } = useForm({
        email: "",
    });

    const submit = (e) => {
        e.preventDefault();
        post(route("password.email"));
    };

    return (
        <div className="flex flex-col items-center justify-center min-h-screen">
            <h2 className="text-2xl font-semibold mb-4">
                Réinitialisation du mot de passe
            </h2>
            <p className="text-gray-500 mb-4">
                Entrez votre adresse e-mail et nous vous enverrons un lien pour
                réinitialiser votre mot de passe.
            </p>

            {status && <p className="text-green-500">{status}</p>}

            <form
                onSubmit={submit}
                className="w-full max-w-sm bg-black p-6 rounded-lg shadow-lg"
            >
                <label htmlFor="email" className="block text-gray-700">
                    Courriel
                </label>
                <input
                    id="email"
                    type="email"
                    name="email"
                    value={data.email}
                    onChange={(e) => setData("email", e.target.value)}
                    className="w-full p-2 mt-1 border rounded"
                    required
                />

                {errors.email && <p className="text-red-500">{errors.email}</p>}

                <button
                    type="submit"
                    className="w-full mt-4 bg-blue-500 text-black p-2 rounded hover:bg-blue-700"
                    disabled={processing}
                >
                    {processing ? "Envoi en cours..." : "Envoyer le lien"}
                </button>
            </form>

            <p className="mt-4">
                <Link
                    href={route("login")}
                    className="text-blue-500 hover:underline"
                >
                    Retour à la connexion
                </Link>
            </p>
        </div>
    );
}

// import InputError from '@/Components/InputError';
// import PrimaryButton from '@/Components/PrimaryButton';
// import TextInput from '@/Components/TextInput';
// import GuestLayout from '@/Layouts/GuestLayout';
// import { Head, useForm } from '@inertiajs/react';

// export default function ForgotPassword({ status }) {
//     const { data, setData, post, processing, errors } = useForm({
//         email: '',
//     });

//     const submit = (e) => {
//         e.preventDefault();

//         post(route('password.email'));
//     };

//     return (
//         <GuestLayout>
//             <Head title="Forgot Password" />

//             <div className="mb-4 text-sm text-gray-600 dark:text-gray-400">
//                 Forgot your password? No problem. Just let us know your email
//                 address and we will email you a password reset link that will
//                 allow you to choose a new one.
//             </div>

//             {status && (
//                 <div className="mb-4 text-sm font-medium text-green-600 dark:text-green-400">
//                     {status}
//                 </div>
//             )}

//             <form onSubmit={submit}>
//                 <TextInput
//                     id="email"
//                     type="email"
//                     name="email"
//                     value={data.email}
//                     className="mt-1 block w-full"
//                     isFocused={true}
//                     onChange={(e) => setData('email', e.target.value)}
//                 />

//                 <InputError message={errors.email} className="mt-2" />

//                 <div className="mt-4 flex items-center justify-end">
//                     <PrimaryButton className="ms-4" disabled={processing}>
//                         Email Password Reset Link
//                     </PrimaryButton>
//                 </div>
//             </form>
//         </GuestLayout>
//     );
// }

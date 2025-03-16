import InputError from "@/Components/InputError";
import InputLabel from "@/Components/InputLabel";
import PrimaryButton from "@/Components/PrimaryButton";
import TextInput from "@/Components/TextInput";
import GuestLayout from "@/Layouts/GuestLayout";
import BgInput from "../../assets/img/ConnexionInput.png";
import { Head, useForm } from "@inertiajs/react";

export default function ResetPassword({ token, email }) {
    const { data, setData, post, processing, errors, reset } = useForm({
        token: token,
        email: email,
        password: "",
        password_confirmation: "",
    });

    const submit = (e) => {
        e.preventDefault();

        post("/reset-password", {
            onFinish: () => reset("password", "password_confirmation"),
        });
    };

    const inputStyle = {
        backgroundImage: `url(${BgInput})`,
        backgroundRepeat: "no-repeat",
        backgroundPosition: "center",
        backgroundSize: "cover",
        border: "none",
        height: "40px",
        width: "360px",
    };

    return (
        <GuestLayout>
            <Head title="Reset Password" />

            <form onSubmit={submit}>
                <div>
                    <label
                        htmlFor="email"
                        value="Email"
                        className="AudioWideBlue"
                    >
                        Courriel
                    </label>

                    <input
                        style={inputStyle}
                        id="email"
                        type="email"
                        name="email"
                        value={data.email}
                        className="mt-1 block w-full bg-transparent"
                        autoComplete="username"
                        onChange={(e) => setData("email", e.target.value)}
                    />

                    <InputError message={errors.email} className="mt-2" />
                </div>

                <div className="mt-4">
                    <label
                        htmlFor="password"
                        value="Password"
                        className="AudioWideBlue"
                    >
                        Mot de passe
                    </label>

                    <input
                        style={inputStyle}
                        id="password"
                        type="password"
                        name="password"
                        value={data.password}
                        className="mt-1 block w-full bg-transparent"
                        autoComplete="new-password"
                        isFocused={true}
                        onChange={(e) => setData("password", e.target.value)}
                    />

                    <InputError message={errors.password} className="mt-2" />
                </div>

                <div className="mt-4">
                    <label
                        htmlFor="password_confirmation"
                        value="Confirm Password"
                        className="AudioWideBlue"
                    >
                        Confirmer le mot de passe
                    </label>

                    <input
                        style={inputStyle}
                        type="password"
                        id="password_confirmation"
                        name="password_confirmation"
                        value={data.password_confirmation}
                        className="mt-1 block w-full bg-transparent"
                        autoComplete="new-password"
                        onChange={(e) =>
                            setData("password_confirmation", e.target.value)
                        }
                    />

                    <InputError
                        message={errors.password_confirmation}
                        className="mt-2"
                    />
                </div>

                <div className="mt-16 flex items-center justify-start ">
                    <button
                        disabled={processing}
                        className="buttonRight AudioWideBlue"
                    >
                        Réinitialiser le mot de passe
                    </button>
                </div>
            </form>
        </GuestLayout>
    );
}

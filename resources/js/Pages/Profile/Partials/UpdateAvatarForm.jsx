import { Transition } from "@headlessui/react";
import { useForm } from "@inertiajs/react";
import border from "@/assets/img/BordureAvatar.png";
import avatar from "@/assets/img/img.jpg";

export default function UpdateAvatarForm() {
    const {
        data,
        setData,
        errors,
        put,
        reset,
        processing,
        recentlySuccessful,
    } = useForm({});

    return (
        <section>
            <header>
                <h2 className="text-lg font-medium text-white">
                    Profil et personnalisation
                </h2>

                <p className="mt-1 text-sm text-gray-600 dark:text-gray-400">
                    Modifiez votre avatar et mettez à jour votre description
                    pour refléter votre personnalité.
                </p>
            </header>
            <form action="">
                <div className="flex flex-row mt-8 ">
                    <div
                        className="flex items-center justify-center "
                        style={{
                            backgroundImage: `url(${border})`,
                            backgroundRepeat: "no-repeat",
                            backgroundPosition: "center",
                            backgroundSize: "cover",
                            border: "none",
                            height: "420px",
                            width: "360px",
                        }}
                    >
                        <img src={avatar} alt="" width={275} />
                    </div>
                    <textarea
                        className="border-4 border-[#8A2BE2] max-h-64 ml-5 bg-transparent flex-grow focus:border-[#4B0082] focus:outline-none focus:ring-0"
                        name="description"
                        id="description"
                        placeholder="Exprimez votre style, vos passions ou ce qui vous distingue..."
                    ></textarea>
                </div>
                <div className="flex items-center gap-4">
                    <button
                        type="submit"
                        disabled={processing}
                        className="buttonLeft AudioWideBlue ml-auto"
                    >
                        {processing ? "Enregistrement..." : "Enregistrer"}
                    </button>

                    <Transition
                        show={recentlySuccessful}
                        enter="transition ease-in-out duration-300"
                        enterFrom="opacity-0 translate-y-5"
                        leave="transition ease-in-out duration-300"
                        leaveTo="opacity-0 translate-y-5"
                    >
                        <div className="fixed bottom-5 right-5 bg-green-500 text-white px-4 py-2 rounded shadow-lg">
                            Mot de passe mis à jour avec succès !
                        </div>
                    </Transition>
                </div>
            </form>
        </section>
    );
}

import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, usePage } from "@inertiajs/react";
import avatar from "@/assets/img/img.jpg";
import border from "@/assets/img/BordureAvatar.png";

export default function Dashboard() {
    const user = usePage().props.auth.user;
    return (
        <AuthenticatedLayout
            header={
                <h2 className="text-xl  leading-tight text-white">
                    Mon Profil
                </h2>
            }
        >
            <Head title="Profil" />

            <div className="py-12">
                <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
                    <div className="overflow-hidden bg-[#1A1A1A]">
                        <div className="p-6 text-white">
                            <div className="flex-row">
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
                                        <img
                                            src={
                                                user.image ||
                                                "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png"
                                            }
                                            alt=""
                                            width={275}
                                        />
                                    </div>
                                    <div className=" flex flex-col ml-5 ">
                                        <p className="AudioWideBlue text-2xl">
                                            {user.username}
                                        </p>
                                        <br />
                                        <h2>Description:</h2>
                                        <div
                                            style={{
                                                width: "40vw",
                                                height: "5vw",
                                                border: "5px double grey",
                                                borderRadius: "5px",
                                                padding: "10px",
                                                margin: "10px",
                                            }}
                                        >
                                            <p> {user.description}</p>
                                        </div>

                                        <br />
                                        <br />
                                        <p>Nombre de jeux: ...</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="py-12">
                <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
                    <div className="overflow-hidden bg-[#1A1A1A]">
                        <div className="p-6 text-white">
                            <h2 className="font-[Audiowide] text-lg font-medium text-white">
                                Ma bibliothèque
                            </h2>
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}

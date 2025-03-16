import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head } from "@inertiajs/react";
import DeleteUserForm from "./Partials/DeleteUserForm";
import UpdatePasswordForm from "./Partials/UpdatePasswordForm";
import UpdateProfileInformationForm from "./Partials/UpdateProfileInformationForm";
import UpdateAvatarForm from "./Partials/UpdateAvatarForm";

export default function Edit({ mustVerifyEmail, status }) {
    return (
        <AuthenticatedLayout
            header={
                <h2 className="text-xl leading-tight text-white">
                    Gérer mon profil
                </h2>
            }
        >
            <Head title="Paramètres du profil" />

            <div className="py-12">
                <div className="mx-auto max-w-7xl space-y-6 sm:px-6 lg:px-8">
                    <div className="bg-[#1A1A1A] p-4 shadow  sm:p-8 ">
                        <UpdateAvatarForm />
                    </div>

                    <div className="bg-[#1A1A1A] p-4 shadow  sm:p-8 ">
                        <UpdateProfileInformationForm
                            mustVerifyEmail={mustVerifyEmail}
                            status={status}
                        />
                    </div>

                    <div className="bg-[#1A1A1A] p-4 shadow  sm:p-8 ">
                        <UpdatePasswordForm />
                    </div>

                    <div className="bg-[#1A1A1A] p-4 shadow  sm:p-8">
                        <DeleteUserForm />
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}

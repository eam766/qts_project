import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head } from "@inertiajs/react";
import avatar from "@/assets/img/img.jpg"

export default function Dashboard() {
    return (
        <AuthenticatedLayout
            header={
                <h2 className="text-xl font-semibold leading-tight text-gray-800 dark:text-gray-200">
                Ton Profile

                </h2>
            }
        >
            <Head title="Profile" />



            <div className="py-12">
                <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
                    <div className="overflow-hidden bg-white shadow-sm sm:rounded-lg dark:bg-blue-800 border-4">
                        <div className="p-6 text-gray-900 dark:text-gray-100">
                            <div className="flex-row">
                            <img src={avatar} alt="" width={200}/>

                            <p>Nom d'utilisateur</p>
                            </div>

                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}

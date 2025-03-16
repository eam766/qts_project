import { Head } from "@inertiajs/react";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { OrderList } from "primereact/orderlist";
import logo from "@/assets/img/FrogLogo.png";

export default function Library() {
    const images = [
        { image: logo, name: "logo 1" },
        { image: logo, name: "logo 2" },
        { image: logo, name: "logo 3" },
        { image: logo, name: "logo 4" },
        { image: logo, name: "logo 5" },
        { image: logo, name: "logo 6" },
        { image: logo, name: "logo 7" },
        { image: logo, name: "logo 8" },
        { image: logo, name: "logo 9" },
        { image: logo, name: "logo 10" },
        { image: logo, name: "logo 11" },
        { image: logo, name: "logo 12" },
        { image: logo, name: "logo 13" },
    ];

    const itemTemplate = (item) => {
        return (
            <div className="flex flex-col">
                <div className="flex flex-row bg-gray-700">
                    <img
                        className="w-32 h-32"
                        src={item.image}
                        alt={item.name}
                    />

                    <span className="font-bold">{item.name}</span>
                    <button className="buttonRight ml-auto">Installer</button>
                </div>
            </div>
        );
    };

    return (
        <AuthenticatedLayout
            header={
                <h2 className="text-xl  leading-tight text-white">
                    Ma bibliothèque
                </h2>
            }
        >
            <Head title="Bibliothèque" />
            <div className="py-12">
                <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
                    <div className="overflow-hidden bg-[#1A1A1A]">
                        <div className="p-6 text-white">
                            <OrderList
                                value={images}
                                itemTemplate={itemTemplate}
                                header="Products"
                                filter
                                filterBy="name"
                            ></OrderList>
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}

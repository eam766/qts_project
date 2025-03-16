import { Head } from "@inertiajs/react";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { OrderList } from "primereact/orderlist";
import logo from "@/assets/img/FrogLogo.png";

export default function Library() {
    const images = [
        {
            image: logo,
            name: "logo 1",
            genres: ["Strategy", "Tactical", "Adventure"],
            themes: ["Action", "Fantasy"],
        },
        {
            image: logo,
            name: "logo 2",
            genres: ["Strategy", "Tactical", "Adventure"],
            themes: ["Action", "Fantasy"],
        },
        {
            image: logo,
            name: "logo 3",
            genres: ["Strategy", "Tactical", "Adventure"],
            themes: ["Action", "Fantasy"],
        },
        {
            image: logo,
            name: "logo 4",
            genres: ["Strategy", "Tactical", "Adventure"],
            themes: ["Action", "Fantasy"],
        },
        {
            image: logo,
            name: "logo 5",
            genres: ["Strategy", "Tactical", "Adventure"],
            themes: ["Action", "Fantasy"],
        },
        {
            image: logo,
            name: "logo 6",
            genres: ["Strategy", "Tactical", "Adventure"],
            themes: ["Action", "Fantasy"],
        },
        {
            image: logo,
            name: "logo 7",
            genres: ["Strategy", "Tactical", "Adventure"],
            themes: ["Action", "Fantasy"],
        },
        {
            image: logo,
            name: "logo 8",
            genres: ["Strategy", "Tactical", "Adventure"],
            themes: ["Action", "Fantasy"],
        },
        {
            image: logo,
            name: "logo 9",
            genres: ["Strategy", "Tactical", "Adventure"],
            themes: ["Action", "Fantasy"],
        },
        {
            image: logo,
            name: "logo 10",
            genres: ["Strategy", "Tactical", "Adventure"],
            themes: ["Action", "Fantasy"],
        },
        {
            image: logo,
            name: "logo 11",
            genres: ["Strategy", "Tactical", "Adventure"],
            themes: ["Action", "Fantasy"],
        },
        {
            image: logo,
            name: "logo 12",
            genres: ["Strategy", "Tactical", "Adventure"],
            themes: ["Action", "Fantasy"],
        },
        {
            image: logo,
            name: "logo 13",
            genres: ["Strategy", "Tactical", "Adventure"],
            themes: ["Action", "Fantasy"],
        },
    ];

    const itemTemplate = (item) => {
        return (
            <div className="flex flex-col m-2">
                <div className="flex flex-row justify-center items-center">
                    <img
                        className="w-32 h-32"
                        src={item.image}
                        alt={item.name}
                    />

                    <div className="ml-4 flex flex-col">
                        <span className="AudioWideBlue">{item.name}</span>
                        <span className="text-sm text-white">
                            <span className="text-[#02d7f2]">Genres:</span>{" "}
                            {item.genres.join(", ")}
                        </span>
                        <span className="text-sm text-white">
                            <span className="text-[#02d7f2]">Thèmes:</span>{" "}
                            {item.themes.join(", ")}
                        </span>
                    </div>

                    <button className="buttonRight AudioWideBlue ml-auto">
                        Installer
                    </button>
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
                                filter
                                filterBy="name"
                                className="custom-orderlist"
                            ></OrderList>
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}

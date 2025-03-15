import React from "react";
import { Head } from "@inertiajs/react";

export default function OrderConfirmation({ order, success }) {
    console.log("Order data:", order); // Pour débogage

    return (
        <>
            <Head title="Confirmation de commande" />

            <div className="max-w-4xl mx-auto py-8 px-4 bg-[#333333]/70 text-gray-800">
                {success && (
                    <div className="bg-green-100/80 border-l-4 border-green-500 text-green-700 p-4 mb-6 rounded shadow">
                        <p className="font-bold">Succès</p>
                        <p>{success}</p>
                    </div>
                )}

                <div className="text-center mb-8">
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="w-16 h-16 text-green-500 mx-auto mb-4"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M5 13l4 4L19 7"
                        />
                    </svg>
                    <h1 className="text-3xl font-bold AudioWideBlue">
                        Commande confirmée !
                    </h1>
                    <p className="text-[#02d7f2] mt-2">
                        Merci pour votre achat
                    </p>
                </div>

                <div className="bg-[#191919] p-6 rounded-lg mb-6 shadow border border-gray-200">
                    <h2 className="text-white text-xl font-bold mb-4 border-b pb-2">
                        Détails de la commande
                    </h2>

                    <div className="grid grid-cols-2 gap-4 mb-4">
                        <div>
                            <p className="text-gray-200">Numéro de commande:</p>
                            <p className="font-semibold text-[#5b5b5b]">
                                {order.id}
                            </p>
                        </div>
                        <div>
                            <p className="text-gray-200">Date:</p>
                            <p className="font-semibold text-[#5b5b5b]">
                                {new Date(order.created_at).toLocaleDateString(
                                    "fr-FR"
                                )}
                            </p>
                        </div>
                        <div>
                            <p className="text-gray-200">Statut:</p>
                            <p className="font-semibold ">
                                <span className="inline-block px-2 py-1 bg-green-100/80 text-green-800 rounded">
                                    {order.status}
                                </span>
                            </p>
                        </div>
                        <div>
                            <p className="text-gray-200">Total:</p>
                            <p className="font-semibold text-[#02d7f2]">
                                {parseFloat(order.amount).toFixed(2)}$
                            </p>
                        </div>
                    </div>
                </div>

                <div className="mt-8 text-center">
                    <a
                        href="/"
                        className="inline-block px-6 py-3 bg-[#02d7f2] text-white font-medium rounded-lg hover:bg-[#01acc1] transition duration-200"
                    >
                        Retourner à la boutique
                    </a>
                </div>
            </div>
        </>
    );
}

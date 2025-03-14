import React from "react";
import { Head } from "@inertiajs/react";

export default function OrderConfirmation({ order, success }) {
    return (
        <>
            <Head title="Confirmation de commande" />

            <div className="max-w-4xl mx-auto py-8 px-4 bg-white text-gray-800">
                {success && (
                    <div className="bg-green-100 border-l-4 border-green-500 text-green-700 p-4 mb-6 rounded shadow">
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
                    <h1 className="text-3xl font-bold text-gray-800">
                        Commande confirmée !
                    </h1>
                    <p className="text-gray-600 mt-2">Merci pour votre achat</p>
                </div>

                <div className="bg-gray-50 p-6 rounded-lg mb-6 shadow border border-gray-200">
                    <h2 className="text-xl font-bold mb-4 border-b pb-2">
                        Détails de la commande
                    </h2>

                    <div className="grid grid-cols-2 gap-4 mb-4">
                        <div>
                            <p className="text-gray-600">Numéro de commande:</p>
                            <p className="font-semibold">{order.id}</p>
                        </div>
                        <div>
                            <p className="text-gray-600">Date:</p>
                            <p className="font-semibold">
                                {new Date(order.created_at).toLocaleDateString(
                                    "fr-FR"
                                )}
                            </p>
                        </div>
                        <div>
                            <p className="text-gray-600">Statut:</p>
                            <p className="font-semibold">
                                <span className="inline-block px-2 py-1 bg-green-100 text-green-800 rounded">
                                    {order.status}
                                </span>
                            </p>
                        </div>
                        <div>
                            <p className="text-gray-600">Total:</p>
                            <p className="font-semibold text-blue-700">
                                {parseFloat(order.amount).toFixed(2)} €
                            </p>
                        </div>
                    </div>
                </div>

                <div className="bg-white p-6 rounded-lg shadow border border-gray-200">
                    <h2 className="text-xl font-bold mb-4 border-b pb-2">
                        Articles achetés
                    </h2>

                    {order.orderItems && order.orderItems.length > 0 ? (
                        <div className="divide-y">
                            {order.orderItems.map((item) => (
                                <div
                                    key={item.id}
                                    className="py-4 flex justify-between"
                                >
                                    <div>
                                        <p className="font-medium">
                                            {item.game
                                                ? item.game.name
                                                : `Jeu #${item.game_id}`}
                                        </p>
                                        <p className="text-gray-500 text-sm">
                                            ID: {item.game_id}
                                        </p>
                                    </div>
                                    <p className="font-semibold text-blue-700">
                                        {parseFloat(item.price).toFixed(2)} €
                                    </p>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <p className="text-gray-500">
                            Aucun article dans cette commande
                        </p>
                    )}
                </div>

                <div className="mt-8 text-center">
                    <a
                        href="/"
                        className="inline-block px-6 py-3 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition duration-200"
                    >
                        Retourner à la boutique
                    </a>
                </div>
            </div>
        </>
    );
}

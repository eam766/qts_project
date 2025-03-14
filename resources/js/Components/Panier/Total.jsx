import React, { useState } from "react";
import { router } from "@inertiajs/react";
import "./Total.css";

export default function Total({ cartItems, total }) {
    const [isLoading, setIsLoading] = useState(false);

    const handleCheckout = () => {
        setIsLoading(true);

        // Rediriger vers la page de checkout
        router.visit("/checkout", {
            onFinish: () => setIsLoading(false),
        });
    };

    return (
        <div className="containerTotal">
            <p>
                Total: ---------------------------{" "}
                {parseFloat(total || 0).toFixed(2)} $
            </p>
            <br />
            <button
                className="AudioWideBlue buttonPayment"
                onClick={handleCheckout}
                disabled={isLoading || !cartItems?.length}
            >
                {isLoading ? "Chargement..." : "Passer au paiement"}
            </button>
        </div>
    );
}

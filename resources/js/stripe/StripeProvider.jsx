import React from "react";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";

// Clé publique Stripe
const stripePromise = loadStripe(
    "pk_test_51QV2rvDCcgnFwKl5Gtp6o9IedkC9tj0un1ZbralDLFBRjHJpu4ytuzaNm531CVqL5blF0gMbv7uZzMCVhsIOJ9VF00Jj3WiUkg"
);

export default function StripeProvider({ children }) {
    return <Elements stripe={stripePromise}>{children}</Elements>;
}

import * as React from "react";
import Grid from "@mui/material/Grid2";
import Box from "@mui/material/Box";
import "./User.css";
import ListeJeux from "../Acceuil/ListeJeux";

export function UserLibrary() {
    let array1 = [
        "https://placehold.co/200x300/green/white",
        "https://placehold.co/200x300/red/white",
        "https://placehold.co/200x300/orange/white",
        "https://placehold.co/200x300/blue/white",
        "https://placehold.co/200x300/pink/white",
        "https://placehold.co/200x300/purple/white",
        "https://placehold.co/200x300/black/white",
        "https://placehold.co/200x300/grey/white",
        "https://placehold.co/200x300/brown/white",
    ];
    return (
        <div>
            <div
                style={{
                    color: "white",
                    fontSize: 24,
                    fontFamily: "Audiowide",
                    fontWeight: "400",
                }}
            >
                Ta Bibliothèque
            </div>
            <div
                data-svg-wrapper
                style={{
                    width: "85vw",
                }}
            >
                <svg
                    viewBox="0 0 1715 500"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    preserveAspectRatio="none"
                >
                    <path
                        d="M865.458 497H781.898L857.5 454.055H941.06L865.458 497Z"
                        fill="#02D7F2"
                    />
                    <path
                        d="M1040.54 497H956.977L1032.58 454.055H1116.14L1040.54 497Z"
                        fill="#02D7F2"
                    />
                    <path
                        d="M698.337 497H614.777L690.379 454.055H773.94L698.337 497Z"
                        fill="#02D7F2"
                    />
                    <path
                        d="M1203.68 454.055L1128.08 497H1713V454.055H1203.68Z"
                        fill="#02D7F2"
                    />
                    <path
                        d="M865.458 497H781.898L857.5 454.055H941.06L865.458 497Z"
                        stroke="#02D7F2"
                        strokeWidth="3"
                    />
                    <path
                        d="M1040.54 497H956.977L1032.58 454.055H1116.14L1040.54 497Z"
                        stroke="#02D7F2"
                        strokeWidth="3"
                    />
                    <path
                        d="M698.337 497H614.777L690.379 454.055H773.94L698.337 497Z"
                        stroke="#02D7F2"
                        strokeWidth="3"
                    />
                    <path
                        d="M1203.68 454.055L1128.08 497H1713V454.055H1203.68Z"
                        stroke="#02D7F2"
                        strokeWidth="3"
                    />
                    <path
                        d="M3 443V2.5H246V21H389.5V2.5H1582.5L1713.5 77.5V416.5H668L528.5 498H112L3 443Z"
                        stroke="#02D7F2"
                        strokeWidth="3"
                    />
                    <foreignObject x="5%" y="15%" width="100%" height="100%">
                        <ListeJeux couvertures={array1} />
                    </foreignObject>
                </svg>
            </div>
        </div>
    );
}

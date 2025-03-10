export default function TitreNom({ children, color, flipHorizontal = false }) {
    return (
        <svg
            width="595"
            height="71"
            viewBox="0 0 595 71"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            color={color}
        >
            <g
                style={{
                    transform: flipHorizontal ? "scaleX(-1)" : "none",
                    transformOrigin: "center",
                }}
            >
                <path
                    d="M454.028 15.7754H141.222V55.3467H454.028V15.7754Z"
                    fill="currentColor"
                />
                <path
                    d="M578.161 70.8667H488.855L420.649 2.72607H393.162L461.174 70.6724H415.049L397.053 53.7876H219.262L240.025 70.6724H149.674L81.6997 2.76459H58.4625L126.174 70.4101H21.6977L0 48.8601V0.622424H23.0364V3.19925H2.57933V47.7894L22.7612 67.8332H119.947L52.235 0.187765H82.7681L150.742 68.0956H232.771L212.008 51.2106H398.075L416.071 68.0956H454.947L386.935 0.149245H421.717L489.923 68.2899H571.937L503.579 0H533.208L592.419 59.1492V25.2812L568.25 1.13768H593.96V3.7145H574.474L594.998 24.2146V65.3695L532.141 2.57683H509.804L578.161 70.8667Z"
                    fill="currentColor"
                />
                <path
                    d="M544.348 39.1108H555.351L548.243 32.011H537.24L544.348 39.1108Z"
                    fill="currentColor"
                />
                <path
                    d="M521.768 39.1108H532.77L525.663 32.011H514.66L521.768 39.1108Z"
                    fill="currentColor"
                />
                <path
                    d="M499.188 39.1108H510.189L503.079 32.011H492.08L499.188 39.1108Z"
                    fill="currentColor"
                />
                <path
                    d="M476.609 39.1108H487.608L480.5 32.011H469.501L476.609 39.1108Z"
                    fill="currentColor"
                />
                <path
                    d="M454.028 39.1108H465.028L457.919 32.011H446.92L454.028 39.1108Z"
                    fill="currentColor"
                />
                <path
                    d="M137.48 39.1108H148.48L141.371 32.011H130.372L137.48 39.1108Z"
                    fill="currentColor"
                />
                <path
                    d="M114.9 39.1108H125.9L118.791 32.011H107.791L114.9 39.1108Z"
                    fill="currentColor"
                />
                <path
                    d="M92.3196 39.1108H103.319L96.2109 32.011H85.2111L92.3196 39.1108Z"
                    fill="currentColor"
                />
                <path
                    d="M69.7393 39.1108H80.7389L73.6305 32.011H62.6307L69.7393 39.1108Z"
                    fill="currentColor"
                />
                <path
                    d="M47.1588 39.1108H58.1586L51.0501 32.011H40.0504L47.1588 39.1108Z"
                    fill="currentColor"
                />
            </g>
            <foreignObject x="0" y="0" width="100%" height="100%">
                <div
                    xmlns="http://www.w3.org/1999/xhtml"
                    className="flex items-center justify-center w-full h-full"
                >
                    <p
                        style={{ fontFamily: "AudioWide" }}
                        className="text-white text-4xl "
                    >
                        {children}
                    </p>
                </div>
            </foreignObject>
        </svg>
    );
}

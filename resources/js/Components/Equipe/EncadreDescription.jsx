export default function EncadreDescription({
    children,
    color,
    image,
    flipHorizontal = false,
}) {
    return (
        <svg
            width="1163"
            height="340"
            viewBox="0 0 1163 340"
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
                    d="M586.924 337.323H530.318L581.533 308.231H638.138L586.924 337.323Z"
                    fill="currentColor"
                />
                <path
                    d="M705.526 337.323H648.92L700.135 308.231H756.74L705.526 337.323Z"
                    fill="currentColor"
                />
                <path
                    d="M473.713 337.323H417.107L468.322 308.231H524.927L473.713 337.323Z"
                    fill="currentColor"
                />
                <path
                    d="M816.041 308.231L764.827 337.323H1161.07V308.231H816.041Z"
                    fill="currentColor"
                />
                <path
                    d="M586.924 337.323H530.318L581.533 308.231H638.138L586.924 337.323Z"
                    stroke="currentColor"
                    stroke-width="3"
                />
                <path
                    d="M705.526 337.323H648.92L700.135 308.231H756.74L705.526 337.323Z"
                    stroke="currentColor"
                    stroke-width="3"
                />
                <path
                    d="M473.713 337.323H417.107L468.322 308.231H524.927L473.713 337.323Z"
                    stroke="currentColor"
                    stroke-width="3"
                />
                <path
                    d="M816.041 308.231L764.827 337.323H1161.07V308.231H816.041Z"
                    stroke="currentColor"
                    stroke-width="3"
                />
                <path
                    d="M2.67749 300.742V2.33875H167.291H188.627H248.312H264.5H1072.66L1161.4 53.1452V282.791H453.162L358.662 338H76.5163L2.67749 300.742Z"
                    stroke="currentColor"
                    stroke-width="3"
                />
            </g>
            <foreignObject x="0" y="0" width="100%" height="100%">
                <div
                    xmlns="http://www.w3.org/1999/xhtml"
                    className={`p-12 flex ${
                        flipHorizontal ? "flex-row-reverse" : "flex-row"
                    }`}
                >
                    <img
                        style={{
                            transform: !flipHorizontal ? "scaleX(-1)" : "none",
                        }}
                        className={`w-[200px] h-[240px] object-cover basis-3/4 ${
                            flipHorizontal ? "ml-10" : "mr-10"
                        }`}
                        src={image}
                        alt=""
                    />
                    <p className="text-white">{children}</p>
                </div>
            </foreignObject>
        </svg>
    );
}

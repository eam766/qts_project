import ButtonCyber from "@/Components/Buttons/ButtonCyber";
import BordureCover from "@/Components/JeuxVideo/BordureCover";
import { Head } from "@inertiajs/react";

export default function Jeux({ game }) {
    console.log(game);

    return (
        <div className="container mx-auto p-10">
            <div>
                <Head title={game.name} />

                {game.cover && (
                    <BordureCover>
                        <img
                            src={`https://images.igdb.com/igdb/image/upload/t_cover_big/${game.cover.image_id}.jpg`}
                            alt={game.name}
                            className="w-64 h-auto"
                        />
                    </BordureCover>
                )}
                <h1 className="text-3xl font-bold text-left">{game.name}</h1>
                <ButtonCyber nomButton={"Acheter"} />
            </div>
            <div>
                <h2 className="text-xl font-semibold mt-5">Screenshots :</h2>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    {game.screenshots?.map((screenshot) => (
                        <img
                            key={screenshot.id}
                            src={`https://images.igdb.com/igdb/image/upload/t_screenshot_med/${screenshot.image_id}.jpg`}
                            alt={`${game.name} screenshot`}
                            className="w-48 h-auto"
                        />
                    ))}
                </div>
            </div>
        </div>
    );
}

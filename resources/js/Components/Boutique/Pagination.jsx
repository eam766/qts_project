import { router, usePage } from "@inertiajs/react";

export default function Pagination({ games }) {
    const { filters } = usePage().props;
    console.log(games);
    const handlePageChange = (url) => {
        if (url) {
            router.get(url, filters, {
                preserveScroll: true,
                preserveState: true,
            });
            window.scrollTo({ top: 0, behavior: "smooth" });
        }
    };

    return (
        <nav className="flex justify-center mt-6">
            <ul className="flex space-x-2">
                {games.links.map((link, index) => (
                    <li
                        key={index}
                        className={`page-item ${
                            link.active ? "active font-bold text-pink-500" : ""
                        }`}
                    >
                        <button
                            className={`px-1 py-2 ${
                                link.active
                                    ? " text-white"
                                    : " hover:text-pink-500"
                            }`}
                            onClick={() => handlePageChange(link.url)}
                            dangerouslySetInnerHTML={{
                                __html: link.label.includes("Previous")
                                    ? "Précédent"
                                    : link.label.includes("Next")
                                    ? "Suivant"
                                    : link.label,
                            }}
                        />
                    </li>
                ))}
            </ul>
        </nav>
    );
}

import { Link } from "@inertiajs/react";

export default function Pagination({ currentPage, pageRange, totalPages }) {
    return (
        <div className="flex justify-center mt-4">
            {currentPage > 1 && (
                <Link href={`?page=1`} className="mx-2 p-2 border rounded">
                    Première page
                </Link>
            )}

            {currentPage > 1 && (
                <Link
                    href={`?page=${currentPage - 1}`}
                    className="mx-2 p-2 border rounded"
                >
                    Précédent
                </Link>
            )}

            {pageRange.map((pageNum) => (
                <Link
                    key={pageNum}
                    href={`?page=${pageNum}`}
                    className={`mx-2 p-2 border rounded ${
                        currentPage == pageNum ? "bg-gray-800 text-white" : ""
                    }`}
                >
                    {pageNum}
                </Link>
            ))}

            {currentPage < totalPages && (
                <Link
                    href={`?page=${parseInt(currentPage) + 1}`}
                    className="mx-2 p-2 border rounded"
                >
                    Suivant
                </Link>
            )}

            {currentPage < totalPages && (
                <Link
                    href={`?page=${totalPages}`}
                    className="mx-2 p-2 border rounded"
                >
                    Dernière page
                </Link>
            )}
        </div>
    );
}

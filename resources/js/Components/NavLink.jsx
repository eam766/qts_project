import { Link } from "@inertiajs/react";

export default function NavLink({
    active = false,
    className = "",
    children,
    ...props
}) {
    return (
        <Link
            {...props}
            className={
                "relative inline-flex items-center px-4 pt-1 text-base font-medium leading-5 text-gray-500 transition duration-150 ease-in-out focus:outline-none " +
                (active
                    ? "text-[#02D7F2] after:absolute after:bottom-0 after:left-1/2 after:-translate-x-1/2 after:h-[2px] after:w-[150px] after:bg-[#02D7F2]"
                    : "hover:text-[#02D7F2] hover:after:absolute hover:after:bottom-0 hover:after:left-1/2 hover:after:-translate-x-1/2 hover:after:h-[2px] hover:after:w-[150px] hover:after:bg-[#02D7F2]") +
                className
            }
        >
            {children}
        </Link>
    );
}

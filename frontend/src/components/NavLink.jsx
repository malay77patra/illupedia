import { NavLink as NVLink } from "react-router-dom";

export default function NavLink({ children, to = "#" }) {
    return (
        <>
            <NVLink
                to={to}
                className={({ isActive }) =>
                    `${isActive ? "text-accent" : "hover:text-accent"}`
                }
            >{children}</NVLink>
        </>
    )
}

export function NavLinkGroup({ children }) {
    return (
        <div className="flex-1">
            <div className="justify-center items-center gap-8 font-semibold uppercase hidden md:flex">{children}</div>
        </div>
    )
}

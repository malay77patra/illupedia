import { Link } from "react-router-dom"

export default function NavLink({ children, to = "#" }) {
    return (
        <>
            <Link to={to}>{children}</Link>
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

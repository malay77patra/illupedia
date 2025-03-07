import Branding from "./Branding"
import NavLink, { NavLinkGroup } from "./NavLink"
import MenuBtn from "./MenuBtn"
import ThemeBtn from "./ThemeBtn"

export default function Navbar() {
    return (
        <nav className="bg-surface">
            <div className="px-4 py-3 max-w-7xl m-auto flex items-center gap-1">
                <Branding />
                <NavLinkGroup>
                    <NavLink to="/">Home</NavLink>
                    <NavLink to="/auth">Login</NavLink>
                    <NavLink to="/dashboard">Dashboard</NavLink>
                </NavLinkGroup>
                <ThemeBtn />
                <div className="md:hidden">
                    <MenuBtn />
                </div>
            </div>
        </nav>
    )
}

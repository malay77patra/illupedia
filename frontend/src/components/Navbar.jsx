import Branding from "./Branding"
import MenuBtn from "./MenuBtn"
import ThemeTgl from "./ThemeTgl"
import Button from "./Button"
import { NavLink } from "react-router-dom"

export default function Navbar() {
    return (
        <nav className="bg-surface">
            <div className="px-4 py-3 max-w-7xl m-auto flex items-center gap-1">
                <Branding />
                <div className="flex-1"></div>
                <NavLink
                    to={"/dashboard"}
                    className={({ isActive }) => {
                        return isActive ? "hidden" : ""
                    }}
                >
                    <Button>Dashboard</Button>
                </NavLink>
                <ThemeTgl />
                <div className="md:hidden">
                    <MenuBtn />
                </div>
            </div>
        </nav>
    )
}

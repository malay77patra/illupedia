import Branding from "./Branding";
import ThemeTgl from "./ThemeTgl";
import Button from "./Button";
import { NavLink } from "react-router-dom";
import { useAuth } from "@hooks/useAuth";

export default function Navbar() {

    const { accessToken, setAccessToken } = useAuth();
    return (
        <nav className="bg-surface">
            <div className="px-4 py-3 max-w-7xl m-auto flex items-center gap-1">
                <Branding />
                <div className="flex-1"></div>
                {accessToken && (
                    <NavLink
                        to={"/dashboard"}
                        className={({ isActive }) => {
                            return isActive ? "hidden" : ""
                        }}
                    >
                        <Button>Dashboard</Button>
                    </NavLink>
                )}
                <ThemeTgl />
            </div>
        </nav>
    );
}

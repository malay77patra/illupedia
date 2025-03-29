import Branding from "./Branding";
import ThemeTgl from "./ThemeTgl";
import { useAuth } from "@hooks/useAuth";
import Avatar from "./Avatar";
import Button from "@components/UI/Button";

import { useNavigate, useLocation } from "react-router-dom";

function Navbar() {
    const navigate = useNavigate();
    const location = useLocation();
    const { isAuthenticated } = useAuth();
    return (
        <nav className="bg-surface">
            <div className="px-4 py-3 max-w-7xl m-auto flex items-center gap-1">
                <Branding />
                <div className="flex-1"></div>
                {isAuthenticated ? (
                    <>
                        {location.pathname === "/dashboard" ? (
                            <Avatar src={"https://srv.carbonads.net/static/30242/4b723271609d12c16fec10ddea2ce78e9bba0517"} />
                        ) : (
                            <Button onClick={() => navigate("/dashboard")}>Dashboard</Button>
                        )}
                    </>
                ) : (
                    <>
                        {location.pathname == "/" && (
                            <Button onClick={() => navigate("/auth")}>Get Started</Button>
                        )}

                    </>
                )}
                <ThemeTgl />
            </div>
        </nav>
    );
}

export default Navbar;

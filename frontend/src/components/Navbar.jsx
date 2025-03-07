import Branding from "./Branding"
import ThemeTgl from "./ThemeTgl"

export default function Navbar() {
    return (
        <nav className="bg-surface">
            <div className="px-4 py-2.5 max-w-7xl m-auto flex items-center">
                <Branding />
                <div className="flex-1"></div>
                <ThemeTgl />
            </div>
        </nav>
    )
}

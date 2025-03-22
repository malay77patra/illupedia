import Logo from "./Logo";
import { Link } from "react-router-dom";

function Branding() {
    return (
        <Link to="/" className="items-center justify-center gap-1 inline-flex">
            <Logo size="medium" />
            <div>
                <h1 className="self-center text-2xl font-semibold hidden sm:block">Illupedia</h1>
            </div>
        </Link>
    );
}

export default Branding;

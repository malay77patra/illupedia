import { useAuth } from "@hooks/useAuth";
import Navbar from "./Navbar";
import Auth from "@pages/Auth";

export default function SiteLayout({ children }) {
    const { accessToken, setAccessToken } = useAuth();

    return (
        <>
            <Navbar />
            <div className="max-w-7xl m-auto py-4 px-4">
                {accessToken ? children : (
                    <Auth />
                )}
            </div>
        </>
    );
}
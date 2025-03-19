import Navbar from "./Navbar";

export default function SiteLayout({ children }) {

    return (
        <>
            <Navbar />
            <div className="max-w-7xl m-auto py-4 px-4">
                {children}
            </div>
        </>
    );
}
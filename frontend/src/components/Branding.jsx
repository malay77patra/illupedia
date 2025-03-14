import Logo from "./Logo"

export default function Branding() {
    return (
        <a href="/" className="items-center justify-center gap-1 inline-flex">
            <Logo size="medium" className="hidden sm:block" />
            <div>
                <h1 className="self-center text-2xl font-semibold">Illupedia</h1>
            </div>
        </a>
    )
}

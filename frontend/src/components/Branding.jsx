import Logo from "./Logo"

export default function Branding() {
    return (
        <a href="/" className="items-center justify-center gap-1 inline-flex">
            <Logo size="medium" />
            <div>
                <h1 className="self-center text-2xl font-semibold hidden sm:block">Illupedia</h1>
            </div>
        </a>
    )
}

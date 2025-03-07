import Logo from "./Logo"

export default function Branding() {
    return (
        <a href="/" className="items-center justify-center gap-1 inline-flex">
            <Logo size="medium" />
            <div>
                <h1 className="self-center text-2xl font-semibold font-acadian">Illupedia</h1>
            </div>
        </a>
    )
}

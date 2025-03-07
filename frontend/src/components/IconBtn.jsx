export default function IconBtn({ children, colored = true }) {
    return (
        <button className={`p-2 rounded-sm cursor-pointer ${colored ? 'hover:bg-secondary active:bg-accent' : ''}`}>
            {children}
        </button>
    )
}

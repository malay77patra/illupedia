
export default function Menu({ children }) {
    return (
        <div className="bg-surface border-border border px-2 py-2 max-w-3xs rounded-md">
            {children}
        </div>
    );
}

export function MenuItem({ children }) {

    return (
        <div className="cursor-pointer hover:bg-secondary px-2 py-2 active:opacity-active rounded-sm">
            {children}
        </div>
    );
} 

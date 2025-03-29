
function Button({ children, fullwidth = false, ...props }) {
    return (
        <button className={`cursor-pointer font-medium rounded-lg text-sm px-5 py-2.5 bg-accent active:opacity-active disabled:opacity-disabled text-white ${fullwidth ? "w-full" : ""}`} {...props}>{children}</button>
    );
}

export default Button;
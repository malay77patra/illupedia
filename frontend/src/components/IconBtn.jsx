function IconBtn({ children, colored = true, ...props }) {
    return (
        <button className={`p-2 rounded-sm cursor-pointer  ${colored ? 'hover:bg-secondary active:opacity-active' : ''}`} {...props}>
            {children}
        </button>
    );
}

export default IconBtn;

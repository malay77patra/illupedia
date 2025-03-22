function Avatar({
    src,
    alt = "User",
    size = "36px",
    shape = "rounded-full",
    className = "",
    onClick,
}) {
    const fallback = alt.charAt(0).toUpperCase();

    return (
        <div
            className={`flex items-center justify-center ${shape} bg-muted text-white font-semibold text-lg ${className}`}
            style={{ width: size, height: size }}
            onClick={onClick}
        >
            {src ? (
                <img
                    src={src}
                    alt={alt}
                    className={`w-full h-full object-cover ${shape}`}
                />
            ) : (
                fallback
            )}
        </div>
    );
}

export default Avatar;

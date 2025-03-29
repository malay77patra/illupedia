

const LogoSVG = ({ width = "32", height = "32", ...props }) => {
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 500 500"
            width={width}
            height={height}
            {...props}
        >
            <path
                style={{
                    fill: "#3bf4cb",
                }}
                d="M352.39 262.794C338.107 437.3 119.933 379.023 149.956 242.318c-.236-.035 24.677 37.103 30.952 24.995-12.327-87.457 66.547-100.125 77.042-150.096 11.022 24.081 10.206 160.057 59.254 71.915 16.551 46.657 17.226 47.792 9.379 85.55 2.152 8.455 15.241-7.617 25.807-11.888"
                transform="translate(.244 5.846)"
            />
            <path
                style={{
                    fill: "#fff",
                }}
                d="M310.938 303.067c-8.48 103.612-138.02 69.011-120.194-12.157-.14-.021 14.652 22.029 18.377 14.84-7.319-51.927 39.512-59.448 45.744-89.118 6.544 14.298 6.059 95.033 35.181 42.699 9.828 27.702 10.228 28.376 5.569 50.795 1.278 5.02 9.05-4.523 15.323-7.059"
                transform="translate(.244 5.846)"
            />
            <path
                style={{
                    fill: "none",
                    stroke: "#3bf4cb",
                    strokeLinecap: "round",
                    strokeLinejoin: "round",
                    strokeWidth: 32,
                }}
                d="m99.968 249.92-49.984 49.984 49.984 49.984"
            />
            <path
                style={{
                    fill: "none",
                    stroke: "#3bf4cb",
                    strokeLinecap: "round",
                    strokeLinejoin: "round",
                    transformBox: "fill-box",
                    transformOrigin: "50% 50%",
                    strokeWidth: 32,
                }}
                transform="rotate(180 0 0)"
                d="m449.856 249.92-49.984 49.984 49.984 49.984"
            />
        </svg>
    )
}

function Logo({ size = "small", className = "" }) {
    const sizeMap = {
        small: "1rem",
        medium: "2rem",
        large: "5rem"
    };

    const logoSize = sizeMap[size] || size;

    return (
        <LogoSVG
            className={className}
            height={logoSize}
            width={logoSize}
        />
    );
}

export default Logo;

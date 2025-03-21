
const LogoSVG = ({ width = "32", height = "32", ...props }) => {
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 500 500"
            width={height}
            height={width}
            {...props}
        >
            <path
                d="m250 51.559 198.441 396.882H51.559z"
                style={{
                    stroke: "currentColor",
                    strokeLinecap: "round",
                    strokeLinejoin: "round",
                    fill: "none",
                    strokeWidth: 32,
                }}
            />
            <path d="M250 282.029c-43.57 0-83.08 23.838-112.236 62.555a9.03 9.03 0 0 0 0 10.776C166.92 394.127 206.43 417.962 250 417.962s83.081-23.837 112.237-62.555a9.03 9.03 0 0 0 0-10.775C333.081 305.867 293.57 282.029 250 282.029m3.126 115.828c-28.923 1.821-52.807-22.018-50.986-50.986 1.491-23.884 20.851-43.244 44.735-44.735 28.922-1.821 52.807 22.017 50.986 50.986-1.539 23.837-20.898 43.196-44.735 44.735m-1.447-22.112c-15.58.98-28.455-11.848-27.428-27.429.792-12.874 11.241-23.277 24.116-24.117 15.581-.979 28.456 11.849 27.428 27.429-.838 12.921-11.287 23.325-24.116 24.119"
                style={{
                    fill: "currentColor"
                }}
            />
        </svg>
    )
}

export default function Logo({ size = "small", className = "" }) {
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

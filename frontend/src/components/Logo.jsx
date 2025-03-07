export default function Logo({ size = "small" }) {
    const sizeMap = {
        small: "1rem",
        medium: "2rem",
        large: "5rem"
    };

    const logoSize = sizeMap[size] || size;

    return (
        <img
            src="illulogo.svg"
            style={{ width: logoSize, height: logoSize }}
        />
    );
}

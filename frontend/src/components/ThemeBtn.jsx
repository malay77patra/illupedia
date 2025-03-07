import IconBtn from "./IconBtn"
import ThemeTgl from "./ThemeTgl"
import { useState, useEffect } from "react";

export default function ThemeBtn() {
    const getInitialTheme = () => {
        if (localStorage.getItem("theme")) {
            return localStorage.getItem("theme");
        }
        return window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
    };

    const [theme, setTheme] = useState(getInitialTheme());

    useEffect(() => {
        document.documentElement.classList.toggle("dark", theme === "dark");
        localStorage.setItem("theme", theme);
    }, [theme]);
    return (
        <IconBtn colored={false}>
            <ThemeTgl theme={theme} setTheme={setTheme} />
        </IconBtn>
    )
}

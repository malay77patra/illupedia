import { useEffect, useState } from "react";
import { ThemeContext } from "@contexts/ThemeContext";

const ThemeProvider = ({ children }) => {
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

    const toggleTheme = () => setTheme(theme === "dark" ? "light" : "dark");

    return (
        <ThemeContext.Provider value={{ theme, toggleTheme }}>
            {children}
        </ThemeContext.Provider>
    );
};

export { ThemeProvider };

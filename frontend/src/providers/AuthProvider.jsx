import { useEffect, useState } from "react";
import { AuthContext } from "@contexts/AuthContext";

const AuthProvider = ({ children }) => {
    const [authToken, setAuthToken] = useState(localStorage.getItem("accesstk") || "");

    useEffect(() => {
        if (authToken) {
            localStorage.setItem("accesstk", authToken);
        } else {
            localStorage.removeItem("accesstk");
        }
    }, [authToken]);

    const isAuthenticated = !!authToken;

    return (
        <AuthContext.Provider value={{ isAuthenticated, authToken, setAuthToken }}>
            {children}
        </AuthContext.Provider>
    );
};

export { AuthProvider };

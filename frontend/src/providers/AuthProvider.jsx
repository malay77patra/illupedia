import { useEffect, useState } from "react";
import { AuthContext } from "@contexts/AuthContext";
import axios from "axios";

const AuthProvider = ({ children }) => {
    const [authenticating, setAuthenticating] = useState(true);
    const [user, setUser] = useState(null);
    const isAuthenticated = !!user && Object.keys(user).length > 0;

    useEffect(() => {
        const checkAuth = async () => {
            try {
                const response = await axios.post(`${import.meta.env.VITE_SERVER_URL}/api/user/refresh`, {}, {
                    withCredentials: true,
                    validateStatus: (status) => true
                });
                setUser(response?.data?.user);

            } catch (err) {
                console.error("Error fetching user data:", err);
            } finally {
                setAuthenticating(false);
            }
        }

        checkAuth();
    }, []);

    return (
        <AuthContext.Provider value={{ authenticating, isAuthenticated, user, setUser }}>
            {children}
        </AuthContext.Provider>
    );
};


export { AuthProvider };

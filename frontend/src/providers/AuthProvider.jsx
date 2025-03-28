import { useEffect, useState } from "react";
import { AuthContext } from "@contexts/AuthContext";
import axios from "axios";

const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const isAuthenticated = !!user && Object.keys(user).length > 0;

    useEffect(() => {
        const checkAuth = async () => {
            try {
                const response = await axios.post(`${import.meta.env.VITE_SERVER_URL}/api/user/refresh`, {}, {
                    withCredentials: true,
                    validateStatus: (status) => true
                });
                console.log(response);
                setUser(response?.data?.user);
            } catch (err) {
                console.error("Error fetching user data:", err);
            }
        }

        checkAuth();
    }, []);

    return (
        <AuthContext.Provider value={{ isAuthenticated, user, setUser }}>
            {children}
        </AuthContext.Provider>
    );
};


export { AuthProvider };

import { useState, useEffect } from "react";
import { AuthContext } from "@contexts/AuthContext";
import axios from "axios";
import Loading from "@pages/Loading";
import Error from "@pages/Error";

const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const isAuthenticated = !!user && Object.keys(user).length > 0;
    const [loading, setLoading] = useState(true);
    const [errAuthenticating, setErrAuthenticating] = useState(false);

    useEffect(() => {
        const refreshToken = async () => {
            try {
                const resp = await axios.post(`${import.meta.env.VITE_SERVER_URL}/api/user/refresh`,
                    {},
                    {
                        withCredentials: true,
                        validateStatus: (status) => true,
                    });
                setUser(resp.data.user);
            } catch (err) {
                console.log("Error:", err)
                setErrAuthenticating(true);
            } finally {
                setLoading(false);
            }
        };

        refreshToken();
    }, []);

    return (
        <AuthContext.Provider value={{ isAuthenticated, user, setUser }}>
            {errAuthenticating ? <Error /> : loading ? <Loading /> : children}
        </AuthContext.Provider>
    );
};


export { AuthProvider };

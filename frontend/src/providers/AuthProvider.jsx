import { useState, useEffect } from "react";
import { AuthContext } from "@contexts/AuthContext";
import axios from "axios";
import Loading from "@pages/Loading";
import Error from "@pages/Error";

const AuthProvider = ({ children }) => {
    const [accessToken, setAccessToken] = useState("");
    const isAuthenticated = !!accessToken;
    const [loading, setLoading] = useState(true);
    const [errAuthenticating, setErrAuthenticating] = useState(false);

    useEffect(() => {
        const refreshToken = async () => {
            try {
                const resp = await axios.post(`${import.meta.env.VITE_SERVER_URL}/api/user/refresh-token`,
                    {},
                    {
                        withCredentials: true,
                        validateStatus: (status) => true,
                    });
                setAccessToken(resp.data.accessToken);
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
        <AuthContext.Provider value={{ isAuthenticated, accessToken, setAccessToken }}>
            {errAuthenticating ? <Error /> : loading ? <Loading /> : children}
        </AuthContext.Provider>
    );
};


export { AuthProvider };

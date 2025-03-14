import { useState, useEffect } from "react";
import { AuthContext } from "@contexts/AuthContext";
import axios from "axios";
import Loading from "@pages/Loading";

const AuthProvider = ({ children }) => {
    const [accessToken, setAccessToken] = useState("");
    const [loading, setLoading] = useState(true);

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
            } finally {
                setLoading(false);
            }
        };

        refreshToken();
    }, []);

    return (
        <AuthContext.Provider value={{ accessToken, setAccessToken }}>
            {loading ? (
                <Loading />
            ) : children}
        </AuthContext.Provider>
    );
};


export { AuthProvider, AuthContext };

import { createContext, useState, useEffect } from "react";
import axios from "axios";
import Auth from "@pages/Auth";
import Error from "@pages/Error";
import Loading from "@pages/Loading";
// import toast from "react-hot-toast";

const AuthContext = createContext(null);

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
            ) : (
                accessToken ? children : (
                    <Auth setAccessToken={setAccessToken} />
                )
            )}
        </AuthContext.Provider>
    );
};


export { AuthProvider, AuthContext };

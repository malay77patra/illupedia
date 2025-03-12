import { createContext, useState, useContext, useEffect } from "react";
import axios from "axios";
import toast from "react-hot-toast";

const AuthContext = createContext(null);

const AuthProvider = ({ children }) => {
    const [accessToken, setAccessToken] = useState("");
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const refreshToken = async () => {
            try {
                const resp = await axios.post("https://illupedia.onrender.com",
                    {},
                    {
                        withCredentials: true,
                        validateStatus: (status) => true,
                    });
                // setAccessToken(resp.data.accessToken);
            } catch (err) {
                console.log("Error:", err)
            } finally {
                setLoading(false);
            }

        };

        refreshToken();
    }, []);

    if (loading) {
        return (
            <div className="flex items-center justify-center min-h-screen bg-white">
                <div className="animate-spin h-10 w-10 border-4 border-blue-500 border-t-transparent rounded-full"></div>
            </div>
        );
    }

    return (
        <AuthContext.Provider value={{ accessToken, setAccessToken }}>
            {children}
        </AuthContext.Provider>
    );
};

const useAuth = () => useContext(AuthContext);

export { AuthProvider, useAuth };

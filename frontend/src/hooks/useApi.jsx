import { useCallback } from "react";
import axios from "axios";
import { useAuth } from "./useAuth";

const useApi = () => {
    const { setUser, user } = useAuth();

    const api = axios.create({
        baseURL: import.meta.env.VITE_SERVER_URL,
        withCredentials: true
    });

    api.interceptors.request.use(
        (config) => {
            if (user?.accessToken) {
                config.headers.Authorization = `Bearer ${user.accessToken}`;
            }
            return config;
        },
        (error) => Promise.reject(error)
    );

    const requestWithRetry = useCallback(async (config, retries = 1) => {
        try {
            return await api(config);
        } catch (error) {
            if (error.response?.status === 401 && retries > 0) {
                try {
                    const refreshResponse = await api.post("/refresh");

                    setUser((prev) => ({
                        ...prev,
                        accessToken: refreshResponse.data.accessToken
                    }));

                    return await requestWithRetry(config, retries - 1);
                } catch {
                    throw new Error("User needs to log in.");
                }
            }
            throw error;
        }
    }, [setUser, user]);

    return {
        get: (url, config = {}) => requestWithRetry({ ...config, method: "GET", url }),
        post: (url, data, config = {}) => requestWithRetry({ ...config, method: "POST", url, data }),
        put: (url, data, config = {}) => requestWithRetry({ ...config, method: "PUT", url, data }),
        delete: (url, config = {}) => requestWithRetry({ ...config, method: "DELETE", url })
    };
};

export { useApi };

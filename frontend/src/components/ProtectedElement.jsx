import { Navigate } from "react-router-dom";
import { useAuth } from "@hooks/useAuth";

export default function ProtectedElement({ children }) {
    const { accessToken, setAccessToken } = useAuth();

    return accessToken ? children : <Navigate to="/auth" replace />;
}

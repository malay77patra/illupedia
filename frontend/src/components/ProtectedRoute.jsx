import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@hooks/useAuth";
import Loading from "@pages/Loading";

const ProtectedRoute = ({ children }) => {
    const { authenticating, isAuthenticated } = useAuth();
    const navigate = useNavigate();

    useEffect(() => {
        if (!authenticating && !isAuthenticated) {
            navigate("/auth", { replace: true });
        }
    }, [authenticating, isAuthenticated, navigate]);

    if (authenticating) {
        return <Loading />;
    }

    return isAuthenticated ? children : null;
};

export default ProtectedRoute;

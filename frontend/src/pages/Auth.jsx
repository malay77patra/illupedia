import { useState } from "react";
import { useAuth } from "@hooks/useAuth";
import { useApi } from "@hooks/useApi";
import Button from "@components/Button";
import toast from "react-hot-toast";

function Auth() {
    const api = useApi();
    const { setAuthToken } = useAuth();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const [isLogin, setIsLogin] = useState(true);

    const handleSubmit = async () => {
        const trimmedEmail = email.trim();
        const trimmedPassword = password.trim();

        if (!trimmedEmail || !trimmedPassword) {
            toast.error("Please enter your email and password");
            return;
        }

        if (!isLogin && trimmedPassword !== confirmPassword) {
            toast.error("Passwords do not match");
            return;
        }

        setLoading(true);

        try {
            const endpoint = isLogin ? "/user/login" : "/user/register";
            const payload = { email: trimmedEmail, password: trimmedPassword };

            const response = await api.post(endpoint, payload);

            const token = response?.accessToken;

            if (token) {
                setAuthToken(token);
                toast.success(isLogin ? "Login successful!" : "Registration successful!");
            } else {
                toast.error("No token received.");
            }

            setIsLogin(true);
        } catch (error) {
            toast.error(
                error?.message || (isLogin ? "Invalid email or password" : "Registration failed")
            );
            console.error("Error:", error);
        } finally {
            setLoading(false);
        }
    };

    const toggleAuthMode = () => {
        setIsLogin(!isLogin);
        setEmail("");
        setPassword("");
        setConfirmPassword("");
    };

    return (
        <div className="max-w-sm mx-auto mt-10 p-5 border rounded-lg shadow-md">
            <h2 className="text-xl font-bold mb-4">{isLogin ? "Login" : "Register"}</h2>

            <input
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full p-2 mb-2 border rounded"
                disabled={loading}
            />

            <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full p-2 mb-2 border rounded"
                disabled={loading}
            />

            {!isLogin && (
                <input
                    type="password"
                    placeholder="Confirm Password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    className="w-full p-2 mb-2 border rounded"
                    disabled={loading}
                />
            )}

            <Button onClick={handleSubmit} disabled={loading} fullwidth>
                {loading ? (isLogin ? "Logging in..." : "Registering...") : (isLogin ? "Login" : "Register")}
            </Button>

            <div className="mt-4 text-center">
                <button
                    onClick={toggleAuthMode}
                    className="text-blue-500 hover:underline"
                    disabled={loading}
                >
                    {isLogin ? "Need an account? Register" : "Already have an account? Login"}
                </button>
            </div>
        </div>
    );
}

export default Auth;

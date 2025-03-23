import { useState } from "react";
import { useAuth } from "@hooks/useAuth";
import axios from "axios";
import Button from "@components/Button";
import toast from "react-hot-toast";

function Auth() {
    const { setAccessToken } = useAuth();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const [isLogin, setIsLogin] = useState(true);
    const [confirmPassword, setConfirmPassword] = useState("");

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
            const endpoint = isLogin ? "login" : "register";
            const payload = { email: trimmedEmail, password: trimmedPassword };

            const response = await axios.post(
                `${import.meta.env.VITE_SERVER_URL}/api/user/${endpoint}`,
                payload,
                { withCredentials: true }
            );

            setAccessToken(response.data.accessToken);
            toast.success(isLogin ? "Login successful!" : "Registration successful!");

            setIsLogin(true);
        } catch (error) {
            if (error.response) {
                toast.error(error.response.data.message ||
                    (isLogin ? "Invalid email or password" : "Registration failed"));
            } else {
                console.log("Error:", error);
                toast.error("Network error, please try again!");
            }
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
        <>
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
        </>
    );
}

export default Auth;
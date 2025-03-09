import { useState } from "react";
import axios from "axios";
import Button from "@components/Button";
import toast from "react-hot-toast";

export default function Auth({ setAccessToken }) {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);

    const handleLogin = async () => {
        const trimmedEmail = email.trim();
        const trimmedPassword = password.trim();

        if (!trimmedEmail || !trimmedPassword) {
            toast.error("Please enter your email and password");
            return;
        }

        setLoading(true);

        try {
            const response = await axios.post(
                "http://127.0.0.1:8000/api/user/login",
                { email: trimmedEmail, password: trimmedPassword },
                { withCredentials: true } // Ensures cookies are sent/received
            );

            setAccessToken(response.data.accessToken);
            toast.success("Login successful!");
        } catch (error) {
            if (error.response) {
                toast.error(error.response.data.message || "Invalid email or password");
            } else {
                toast.error("Network error, please try again!");
            }
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="max-w-sm mx-auto mt-10 p-5 border rounded-lg shadow-md">
            <h2 className="text-xl font-bold mb-4">Login</h2>

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

            <Button onClick={handleLogin} disabled={loading}>
                {loading ? "Logging in..." : "Login"}
            </Button>
        </div>
    );
}

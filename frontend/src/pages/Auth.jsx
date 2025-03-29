import { useState } from "react";
import { useForm } from "react-hook-form";
import Input from "@components/UI/Input";
import Button from "@components/UI/Button";
import { yupResolver } from "@hookform/resolvers/yup";
import { string, object } from "yup";
import { useApi } from "@hooks/useApi";
import toast from "react-hot-toast";

const loginSchema = object({
    email: string().email("Invalid email format").required("Email is required"),
    password: string().required("Password is required").min(6, "Password must be at least 6 characters").matches(/^[a-zA-Z0-9!@#$%^&*()_+]+$/, "Password can only contain letters, numbers and special characters")
}).required();

const registerSchema = object({
    name: string().required("Name is required").min(3, "Name must be at least 3 characters"),
    email: string().email("Invalid email format").required("Email is required"),
    password: string().required("Password is required").min(6, "Password must be at least 6 characters").matches(/^[a-zA-Z0-9!@#$%^&*()_+]+$/, "Password can only contain letters, numbers and special characters")
}).required();

function Auth() {
    const [loading, setLoading] = useState(false);
    const [isRegister, setIsRegister] = useState(false);
    const api = useApi();

    const {
        register,
        formState: { errors },
        handleSubmit
    } = useForm({
        resolver: yupResolver(isRegister ? registerSchema : loginSchema),
    });

    const onLogin = (data) => {
        setLoading(true);
        const loginUser = async () => {
            try {
                const response = await api.post("/user/login", data);
                if (!response.ok) {
                    toast.success("Login unsuccessful!");
                }
            } catch (error) {
                toast.error("Unable to login, try again later.");
                console.log(error);
            } finally {
                setLoading(false);
            }
        }
        loginUser();
    }

    const onRegister = (data) => {
        setLoading(true);
        const registerUser = async () => {
            try {
                const response = await api.post("/user/register", data);
                toast.success("Registration successful!");
            } catch (error) {
                toast.error("Unable to register, try again later.");
                console.log(error);
            } finally {
                setLoading(false);
            }
        }
        registerUser();
    }

    const onSubmit = (data) => {
        if (isRegister) {
            onRegister(data);
        } else {
            onLogin(data);
        }
    };

    return (
        <div className="pt-20">
            <div className="flex flex-col gap-4 bg-surface p-8 rounded-xl max-w-md mx-auto shadow-lg">
                <h1 className="text-2xl font-bold mb-6 text-center">
                    {isRegister ? "Register" : "Login"}
                </h1>
                <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-2">
                    {isRegister && (
                        <>
                            <label htmlFor="name" className="text-sm font-semibold">Name</label>
                            <Input {...register("name")} id="name" placeholder="Your name" />
                            <p className="text-sm text-red-500">{errors.name?.message}</p>
                        </>
                    )}

                    <label htmlFor="email" className="text-sm font-semibold">Email</label>
                    <Input {...register("email")} id="email" placeholder="your@gmail.com" />
                    <p className="text-sm text-red-500">{errors.email?.message}</p>

                    <label htmlFor="password" className="text-sm font-semibold">Password</label>
                    <Input {...register("password")} id="password" type="password" placeholder="******" />
                    <p className="text-sm text-red-500">{errors.password?.message}</p>

                    <Button type="submit">{loading ? (
                        <div className="flex items-center justify-center">
                            <svg className="w-4 h-4 animate-spin fill-accent" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor" />
                                <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill" />
                            </svg>
                        </div>
                    ) : (isRegister ? "Register" : "Login")}</Button>
                </form>

                <div className="text-center">
                    <button
                        onClick={() => setIsRegister((prev) => !prev)}
                        className="text-blue-500 hover:underline cursor-pointer"
                    >
                        {isRegister ? "Already have an account? Login" : "Don't have an account? Register"}
                    </button>
                </div>
            </div>
        </div>
    );
}

export default Auth;

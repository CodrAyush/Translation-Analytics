import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { auth } from "../firebase";
import { signInWithEmailAndPassword, createUserWithEmailAndPassword } from "firebase/auth";

const Auth = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");
    const [isLogin, setIsLogin] = useState(true);
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");
        setSuccess("");

        if (isLogin) {
            try {
                await signInWithEmailAndPassword(auth, email, password);
                navigate("/dashboard");
            } catch (err) {
                setError("Invalid email or password");
            }
        } else {
            try {
                await createUserWithEmailAndPassword(auth, email, password);
                setSuccess("User created successfully! Please log in.");
                setIsLogin(true);
            } catch (err) {
                setError("Failed to create user. Try again.");
            }
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center relative overflow-hidden">
            {/* Background animation */}
            <div className="absolute inset-0 bg-gradient-to-br from-blue-400 via-purple-500 to-pink-500 animate-gradient blur-2xl opacity-30"></div>

            {/* Content */}
            <div className="relative z-10 bg-white shadow-md rounded-lg p-8 w-96">
                <h2 className="text-2xl font-bold text-gray-800 text-center">
                    {isLogin ? "Login" : "Sign Up"}
                </h2>
                <form onSubmit={handleSubmit} className="mt-6">
                    <div className="mb-4">
                        <label
                            htmlFor="email"
                            className="block text-sm font-medium text-gray-600"
                        >
                            Email
                        </label>
                        <input
                            id="email"
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring focus:ring-blue-500"
                            placeholder="Enter your email"
                            required
                        />
                    </div>
                    <div className="mb-4">
                        <label
                            htmlFor="password"
                            className="block text-sm font-medium text-gray-600"
                        >
                            Password
                        </label>
                        <input
                            id="password"
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring focus:ring-blue-500"
                            placeholder="Enter your password"
                            required
                        />
                    </div>
                    {error && (
                        <p className="text-red-500 text-sm text-center mb-4">{error}</p>
                    )}
                    {success && (
                        <p className="text-green-500 text-sm text-center mb-4">{success}</p>
                    )}
                    <button
                        type="submit"
                        className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600 transition"
                    >
                        {isLogin ? "Login" : "Sign Up"}
                    </button>
                </form>
                <div className="mt-4 text-sm text-center text-gray-600">
                    {isLogin
                        ? "Don't have an account? "
                        : "Already have an account? "}
                    <button
                        type="button"
                        onClick={() => setIsLogin(!isLogin)}
                        className="text-blue-500 font-medium hover:underline"
                    >
                        {isLogin ? "Sign Up" : "Login"}
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Auth;

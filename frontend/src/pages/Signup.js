import React, { useState } from "react";
import { auth } from "../firebase";
import { createUserWithEmailAndPassword } from "firebase/auth";

const Signup = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");

    const handleSignup = async (e) => {
        e.preventDefault();
        try {
            await createUserWithEmailAndPassword(auth, email, password);
            setSuccess("User created successfully!");
            setError("");
        } catch (err) {
            setError("Failed to create user. Try again.");
            setSuccess("");
        }
    };

    return (
        <>
            <h2 style={{ color: "#333", marginBottom: "20px" }}>Sign Up</h2>
            <form onSubmit={handleSignup}>
                <input
                    type="email"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    style={{
                        width: "100%",
                        padding: "10px",
                        margin: "10px 0",
                        borderRadius: "5px",
                        border: "1px solid #ddd",
                    }}
                />
                <input
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    style={{
                        width: "100%",
                        padding: "10px",
                        margin: "10px 0",
                        borderRadius: "5px",
                        border: "1px solid #ddd",
                    }}
                />
                <button
                    type="submit"
                    style={{
                        width: "100%",
                        padding: "10px",
                        marginTop: "10px",
                        borderRadius: "5px",
                        border: "none",
                        backgroundColor: "#28a745",
                        color: "#ffffff",
                        fontWeight: "bold",
                        cursor: "pointer",
                    }}
                >
                    Sign Up
                </button>
            </form>
            {error && (
                <p style={{ color: "red", marginTop: "10px" }}>{error}</p>
            )}
            {success && (
                <p style={{ color: "green", marginTop: "10px" }}>{success}</p>
            )}
        </>
    );
};

export default Signup;

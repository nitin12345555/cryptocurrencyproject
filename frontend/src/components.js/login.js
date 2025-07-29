import React, { useState, useEffect } from "react";
import "../all css/login.css";
import { useNavigate } from "react-router-dom";

const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [message, setMessage] = useState(""); // Keep message for client-side feedback
    const navigate = useNavigate();

    useEffect(() => {
        // If a user is already "logged in" (simulated), redirect to home
        if (localStorage.getItem("user")) {
            navigate("/home");
        }
    }, [navigate]);

    const showMessage = (msg) => {
        setMessage(msg);
        setTimeout(() => setMessage(""), 3000);
    };

    const collectData = () => {
        if (!email || !password) {
            showMessage("Enter both email and password");
            return;
        }

        // Simulate successful login without API call
        const dummyUser = {
            id: "simulated-user-id",
            name: "Simulated User",
            email: email
        };
        localStorage.setItem("user", JSON.stringify(dummyUser));
        showMessage("Login successful!");
        navigate("/home");
    };

    return (
        <div className="login-upcontainer">
            <h1>Login Here</h1>
            <input
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="inputBox"
            />
            <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="inputBox"
            />
            <button onClick={collectData} className="login">
                Login
            </button>
            {message && <div className="message-box">{message}</div>}
            <p className="switch-auth">
                Don't have an account? <a href="/signup">Sign Up</a>
            </p>
        </div>
    );
};

export default Login;

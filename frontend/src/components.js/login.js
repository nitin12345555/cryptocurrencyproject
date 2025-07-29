import React, { useState, useEffect } from "react";
import "../all css/login.css";
import { useNavigate } from "react-router-dom";

const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState("");
    const navigate = useNavigate();

    useEffect(() => {
        if (localStorage.getItem("user")) {
            navigate("/home");
        }
    }, [navigate]);

    const showMessage = (msg) => {
        setMessage(msg);
        setTimeout(() => setMessage(""), 3000);
    };

    const collectData = async () => {
        if (!email || !password) {
            showMessage("Enter both email and password");
            return;
        }

        setLoading(true);
        try {
            const res = await fetch("https://crypto-currency-project-p6xb.vercel.app/auth/login", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ email, password }),
            });

            const data = await res.json();
            setLoading(false);

            if (res.ok) {
                localStorage.setItem("user", JSON.stringify(data));
                navigate("/home");
            } else {
                showMessage(data.message || data.error || "Login failed");
            }
        } catch (err) {
            console.error("Login fetch error:", err);
            setLoading(false);
            showMessage("Something went wrong. Please try again.");
        }
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
            <button onClick={collectData} disabled={loading} className="login">
                {loading ? "Logging in..." : "Login"}
            </button>
            {message && <div className="message-box">{message}</div>}
            <p className="switch-auth">
                Don't have an account? <a href="/signup">Sign Up</a>
            </p>
        </div>
    );
};

export default Login;

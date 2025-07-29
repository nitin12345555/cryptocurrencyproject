import React, { useState, useEffect } from "react";
import "../all css/signup.css";
import { useNavigate, Link } from "react-router-dom";

const Signup = () => {
  const [name, setName] = useState("");
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
    if (!name || !email || !password) {
      showMessage("Please fill all fields");
      return;
    }

    // Simulate successful signup without API call
    showMessage("Signup successful! Please login.");
    navigate("/login");
  };

  return (
    <div className="sign-upcontainer">
      <h1>Signup Here</h1>
      <input
        type="text"
        placeholder="Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        className="inputBox"
      />
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
      <button onClick={collectData} className="signup">
        Sign Up
      </button>
      <p className="switch-auth">
        Already have an account? <Link to="/login">Login</Link>
      </p>
      {message && <div className="message-box">{message}</div>}
    </div>
  );
};

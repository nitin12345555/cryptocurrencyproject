import React, { useState, useEffect } from "react";
import "../all css/signup.css";
import { useNavigate, Link } from "react-router-dom";

const Signup = () => {
  const [name, setName] = useState("");
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
    if (!name || !email || !password) {
      showMessage("Please fill all fields");
      return;
    }

    setLoading(true);
    try {
      const res = await fetch(`${process.env.REACT_APP_API_URL}/auth/signup`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, password }),
      });

      const data = await res.json();
      setLoading(false);

      if (res.ok) {
        showMessage("Signup successful! Please login.");
        navigate("/login");
      } else {
        showMessage(data.error || "Signup failed");
      }
    } catch (err) {
      console.error("Signup error:", err);
      showMessage("Something went wrong. Please try again.");
      setLoading(false);
    }
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
      <button onClick={collectData} disabled={loading} className="signup">
        {loading ? "Signing up..." : "Sign Up"}
      </button>
      <p className="switch-auth">
        Already have an account? <Link to="/login">Login</Link>
      </p>
      {message && <div className="message-box">{message}</div>}
    </div>
  );
};

export default Signup;
import React, { useState } from "react";
import "./LoginPage.css";
import { loginUser } from "../services/authService";
import { useNavigate } from "react-router-dom";

const LoginPage = ({ onLogin }) => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    role: "customer",
  });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const data = await loginUser(formData); // calls backend
      const { user, token } = data;

      // Save token & user info locally
      localStorage.setItem("token", token);
      localStorage.setItem("user", JSON.stringify(user));

      // Callback for parent if needed
      if (onLogin) onLogin(user);

      // Redirect by role
      if (user.role === "manager") {
        navigate("/manager");
      } else {
        navigate("/customer");
      }
    } catch (err) {
      console.error("Login error:", err);
      setError("Invalid email, password, or role.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-container">
      <div className="login-card">
        <div className="login-header">
          <h1 className="login-title">Budget Planner</h1>
          <p className="login-subtitle">Sign in to manage your finances</p>
        </div>

        <form onSubmit={handleSubmit} className="login-form">
          <div className="input-group">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Enter your email"
              required
            />
          </div>

          <div className="input-group">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="Enter your password"
              required
            />
          </div>

          <div className="input-group">
            <label htmlFor="role">Login as</label>
            <select
              id="role"
              name="role"
              value={formData.role}
              onChange={handleChange}
            >
              <option value="customer">Customer</option>
              <option value="manager">Manager</option>
            </select>
          </div>

          {error && <div className="error-message">{error}</div>}

          <button
            type="submit"
            className="btn btn-primary login-btn"
            disabled={loading}
          >
            {loading ? "Signing in..." : "Sign In"}
          </button>
        </form>

        <div className="demo-accounts">
          <p>Demo Accounts:</p>
          <div className="demo-buttons">
            <button
              onClick={() =>
                setFormData({
                  email: "customer@demo.com",
                  password: "password",
                  role: "customer",
                })
              }
              className="btn btn-outline demo-btn"
            >
              Customer Demo
            </button>
            <button
              onClick={() =>
                setFormData({
                  email: "manager@demo.com",
                  password: "password",
                  role: "manager",
                })
              }
              className="btn btn-outline demo-btn"
            >
              Manager Demo
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;

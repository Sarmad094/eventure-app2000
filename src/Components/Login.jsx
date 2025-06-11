import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../Styles/Login.css";
import axios from "axios";

const Login = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:8081/api/students/login', {
        email: formData.email,
        password: formData.password
      });
      
      console.log("User logged in:", response.data);
      // Navigerer med studentId fra response
      navigate(`/home/${response.data.studentId}`);
    } catch (error) {
      console.error("Login error:", error);
      if (error.response) {
        alert(error.response.data.message || "Login failed");
      } else {
        alert("Cannot connect to server. Please try again.");
      }
    }
  };

  const handleRegister = () => {
    navigate("/cuser");
  };

  return (
    <div className="container">
      <div className="login-container">
        <h1>Login</h1>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="email" className="label">Email</label>
            <input
              type="email"
              id="email"
              name="email"
              placeholder="Enter your email"
              value={formData.email}
              onChange={handleChange}
              className="input"
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="password" className="label">Password</label>
            <input
              type="password"
              id="password"
              name="password"
              placeholder="Enter your password"
              value={formData.password}
              onChange={handleChange}
              className="input"
              required
            />
          </div>
          <div className="form-group">
            <button type="submit" className="button">Login</button>
          </div>
        </form>
        <div className="form-footer">
          <p>
            Don't have an account?{" "}
            <button onClick={handleRegister} className="link-button">
              Register here
            </button>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
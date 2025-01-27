import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../Styles/Login.css";
import { login } from "../Services/userService";

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
      const user = await login(formData.email, formData.password);
      console.log("User logged in:", user);
      navigate(`/home/${user.id}`); 
    } catch (error) {
      alert(error.message);
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

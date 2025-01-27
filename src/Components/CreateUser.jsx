import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../Styles/CreateUser.css";
import { register } from "../Services/userService";

const CreateUser = () => {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (formData.password !== formData.confirmPassword) {
      alert("Passwords do not match!");
      return;
    }
    try {
      const user = await register(formData.email, formData.password, formData.fullName);
      console.log("User registered:", user);
      setMessage("User successfully registered!");
      setTimeout(() => navigate("/login"), 1000);
    } catch (error) {
      alert(error.message);
    }
  };

  return (
    <div className="register-container">
      <h1>Create an Account</h1>
      {message && <p style={{ color: "green" }}>{message}</p>}
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="fullName">Full Name</label>
          <input
            type="text"
            id="fullName"
            name="fullName"
            value={formData.fullName}
            onChange={handleChange}
            placeholder="Enter your full name"
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="Enter your email address"
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            placeholder="Create a password"
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="confirmPassword">Confirm Password</label>
          <input
            type="password"
            id="confirmPassword"
            name="confirmPassword"
            value={formData.confirmPassword}
            onChange={handleChange}
            placeholder="Confirm your password"
            required
          />
        </div>
        <div className="form-group">
          <button type="submit">Register</button>
        </div>
      </form>
      <div className="form-footer">
        <p>Already have an account? <a href="/login">Log in here</a></p>
      </div>
    </div>
  );
};

export default CreateUser;

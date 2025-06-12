import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../Styles/CreateUser.css";
import axios from "axios";

const CreateUser = () => {
  const [formData, setFormData] = useState({
    studentId: "",
    name: "",
    email: "",
    phonenumber: "",
    university: "",
    s_field: "",
    password: "",
  });
  
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:8081/api/students', {
        studentId: formData.studentId,
        name: formData.name,
        email: formData.email,
        phonenumber: formData.phonenumber,
        university: formData.university,
        s_field: formData.s_field,
        password: formData.password
      });
      
      console.log("User registered:", response.data);
      setMessage("User successfully registered!");
      
      // Auto-login after successful registration
      sessionStorage.setItem('currentUser', JSON.stringify(response.data));
      
      setTimeout(() => navigate("/home/1"), 1000);
    } catch (error) {
      console.error("Registration error:", error);
      if (error.response) {
        alert(error.response.data.message || "Registration failed");
      } else {
        alert("Cannot connect to server. Please try again.");
      }
    }
  };

  return (
    <div className="register-container">
      <h1>Create an Account</h1>
      {message && <p style={{ color: "green" }}>{message}</p>}
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="studentId">Student ID</label>
          <input
            type="text"
            id="studentId"
            name="studentId"
            value={formData.studentId}
            onChange={handleChange}
            placeholder="Enter your student ID"
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="name">Name</label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
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
          <label htmlFor="phonenumber">Phone Number</label>
          <input
            type="tel"
            id="phonenumber"
            name="phonenumber"
            value={formData.phonenumber}
            onChange={handleChange}
            placeholder="Enter your phone number"
          />
        </div>
        <div className="form-group">
          <label htmlFor="university">University</label>
          <input
            type="text"
            id="university"
            name="university"
            value={formData.university}
            onChange={handleChange}
            placeholder="Enter your university"
          />
        </div>
        <div className="form-group">
          <label htmlFor="s_field">Field of Study</label>
          <input
            type="text"
            id="s_field"
            name="s_field"
            value={formData.s_field}
            onChange={handleChange}
            placeholder="Enter your field of study"
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
          <button type="submit">Register</button>
        </div>
      </form>
      <div className="form-footer">
        <p>Already have an account? <a href="/login/1">Log in here</a></p>
      </div>
    </div>
  );
};

export default CreateUser;
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { register } from "../Services/userService"; // Importer userService
import "../Styles/CreateOrganization.css";
 
const CreateOrganization = () => {
  const [formData, setFormData] = useState({
    orgId: "",
    password: "",
    confirmPassword: "",
    name: "",
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
      const org = await register(
        formData.orgId,
        formData.password,
        formData.name,
        "organization"  // Angi at dette er en organisasjon
      );
      console.log("Organization registered:", org);
      setMessage("Organization successfully registered!");
      setTimeout(() => navigate("/orglogin"), 1000);
    } catch (error) {
      alert(error.message);
    }
  };
 
  return (
    <div className="register-container">
      <h1>Create an Organization</h1>
      {message && <p style={{ color: "green" }}>{message}</p>}
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="orgId">Organization ID</label>
          <input
            type="text"
            id="orgId"
            name="orgId"
            value={formData.orgId}
            onChange={handleChange}
            placeholder="Enter your organization ID"
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="name">Organization Name</label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="Enter organization name"
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
        <p>Already have an account? <a href="/orglogin">Log in here</a></p>
      </div>
    </div>
  );
};
 
export default CreateOrganization;
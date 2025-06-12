import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../Styles/CreateOrganization.css";
import { orgRegister } from "../Services/orgService";

const CreateOrganization = () => {
  const [formData, setFormData] = useState({
    orgId: "",
    orgName: "",
    email: "",
    o_field: "", 
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
      const response = await orgRegister(
        formData.orgId,
        formData.orgName,
        formData.email,
        formData.password,
        formData.o_field
      );
      
      console.log("Organization registered:", response);
      setMessage("Organization successfully registered!");
      setTimeout(() => navigate("/orglogin"), 1000);
    } catch (error) {
      console.error("Registration error:", error);
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
          <label htmlFor="orgName">Organization Name</label>
          <input
            type="text"
            id="orgName"
            name="orgName"
            value={formData.orgName}
            onChange={handleChange}
            placeholder="Enter organization name"
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="email">Email Address</label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="Enter email address"
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="o_field">Organization Field</label>
          <input
            type="text"
            id="o_field"
            name="o_field" 
            value={formData.o_field}
            onChange={handleChange}
            placeholder="Enter your organization's field"
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
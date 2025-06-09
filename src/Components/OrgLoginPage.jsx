// OrgLoginPage.jsx
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../Styles/Login.css"; 
import { login } from "../Services/userService";
import { orgLogin } from "../Services/orgService";
import { useAuth } from "../State management/AuthContext";

const OrgLoginPage = () => {
  const navigate = useNavigate();
  const { login: authLogin } = useAuth();
  const [formData, setFormData] = useState({ orgId: "", password: "" });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const account = await login(formData.orgId, formData.password, "organization");
      console.log("Organization logged in:", account);
      authLogin(); // Sett autentisering til true
      navigate(`/comphome/`);
    } catch (error) {
      alert(error.message);
    }
  };

  const handleCreateOrganization = () => {
    navigate("/corganization");
  };

  return (
    <div className="container">
      <div className="login-container">
        <h1>Organizational Login</h1>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="orgId" className="label">Organization ID</label>
            <input
              type="text"
              id="orgId"
              name="orgId"
              placeholder="Enter your Organization ID"
              value={formData.orgId}
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
            <button onClick={handleCreateOrganization} className="link-button">
              Create Organization account here
            </button>
          </p>
        </div>
      </div>
    </div>
  );
};

export default OrgLoginPage;
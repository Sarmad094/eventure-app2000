import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../Styles/Login.css";
import { orgLogin } from "../Services/orgService";
import { useAuth } from "../State management/AuthContext";

const OrgLoginPage = () => {
  const navigate = useNavigate();
  const { login: authLogin } = useAuth();
  const [formData, setFormData] = useState({ 
    email: "", 
    password: "" 
  });
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    
    try {
      const account = await orgLogin(formData.email, formData.password);
      console.log("Organization logged in:", account);
      
      authLogin({
        organizationId: account.orgId || account.organizationId || account.id,
        organizationName: account.orgName || account.organizationName || account.name,
        email: account.email
      });
      
      navigate(`/comphome/`);
    } catch (error) {
      console.error("Login error:", error);
      alert(error.message || "Login failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleCreateOrganization = () => {
    navigate("/corganization");
  };

  const handleBackToWelcome = () => {
    navigate("/"); // Assuming '/' is the WelcomePage route
  };

  return (
    <div className="center-content">
      <div className="login-container card">
        <h1>Organizational Login</h1>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="email" className="label">Email Address</label>
            <input
              type="email"
              id="email"
              name="email"
              placeholder="Enter your email address"
              value={formData.email}
              onChange={handleChange}
              className="input"
              required
              disabled={loading}
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
              disabled={loading}
            />
          </div>
          <div className="form-group">
            <button type="submit" className="custom-button" disabled={loading}>
              {loading ? 'Logging in...' : 'Login'}
            </button>
          </div>
        </form>
        <div className="form-footer">
          <p>
            Don't have an account?{" "}
            <button 
              onClick={handleCreateOrganization} 
              className="link-button"
              disabled={loading}
            >
              Create Organization account here
            </button>
          </p>
          <p>
            <button 
              onClick={handleBackToWelcome} 
              className="custom-button"
              disabled={loading}
              style={{ marginTop: "1rem" }}
            >
              ← Back to Welcome
            </button>
          </p>
        </div>
      </div>
    </div>
  );
};

export default OrgLoginPage;

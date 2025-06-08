import React from 'react';
import '../Styles/OrganizationWelcome.css';
import { useNavigate } from 'react-router-dom';

export default function OrganizationWelcome() {
  const navigate = useNavigate();

  return (
    <div className="organization-welcome">
      <nav className="top-nav">
        <div className="logo">
          <img src="/api/placeholder/180/40" alt="Eventure" />
        </div>
        <div className="nav-links">
          <button className="nav-button">Home</button>
          <button className="nav-button">Statistics</button>
          <a href="#" className="nav-link">FAQ</a>
          <a href="#" className="nav-link">Contact</a>
        </div>
      </nav>

      <div className="main-content">
        <div className="card">
          <h1 className="title">Business page</h1>
          <p className="subtitle">Welcome</p>

          <div className="button-container">
            <button
              className="action-button"
              onClick={() => navigate('/comphome')} // <-- her er endringen
            >
              Create event
            </button>
          </div>
        </div>
      </div>

      <footer className="footer">
        <img src="/api/placeholder/120/30" alt="Eventure" />
      </footer>
    </div>
  );
}

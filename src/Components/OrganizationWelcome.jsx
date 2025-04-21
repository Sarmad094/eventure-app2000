import React from 'react';
import '../Styles/OrganizationWelcome.css';


export default function OrganizationWelcome() {
  return (
    <div className="organization-welcome">
      {/* Top Navigation */}
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
      
      {/* Main Content */}
      <div className="main-content">
        <div className="card">
          <h1 className="title">Business page</h1>
          <p className="subtitle">choose your task today</p>
          
          <div className="button-container">
            <button className="action-button">Create event</button>
            <button className="action-button">Check statistics</button>
          </div>
        </div>
      </div>
      
      {/* Footer */}
      <footer className="footer">
        <img src="/api/placeholder/120/30" alt="Eventure" />
      </footer>
    </div>
  );
}
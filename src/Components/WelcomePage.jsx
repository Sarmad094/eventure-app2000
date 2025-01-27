import React from "react";
import "../Styles/WelcomePage.css"; // Endret fra ./Styles/WelcomePage.css til ../Styles/WelcomePage.css
import logo from '../Styles/logo.png'; // Endret fra ./Styles/logo.png til ../Styles/logo.png

export default function WelcomePage() {
  return (
    <div className="center-content">
      <img src={logo} alt="Logo" className="logo" />
      <div className="card-wrapper">
        <div className="card">
          <div className="card-content">
            <h1 className="title">Welcome to Eventure!</h1>
            <p className="subtitle">We're excited to have you here. Choose your path below.</p>
            <div className="button-group">
              <button className="custom-button">We are a company</button>
              <button className="custom-button">I am a student</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

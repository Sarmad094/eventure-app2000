import React from "react";
import { useNavigate } from 'react-router-dom'; 
import "../Styles/WelcomePage.css";
import logo from '../Styles/logo.png';

export default function WelcomePage() {
  const navigate = useNavigate(); 

 
  const handleStudentClick = () => {
    navigate('/login/1'); 
  };

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
              <button className="custom-button" onClick={handleStudentClick}>I am a student</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import "../Styles/OrganizationPublish.css";


const OrganizationPublish = () => {
  const navigate = useNavigate();
  
  const handleOrganizationHomeClick = () => {
    navigate('/comphome');
  };
  
  return (
    <div className="publish-container">
      <div className="publish-card">
        {/* Success Message */}
        <h1 className="success-title">
          Congratulations your event is now published
        </h1>
        
        {/* Event Details Card */}
        <div className="event-details">
          <h2 className="event-title">
            IT COURSE USN RINGERIKE
          </h2>
          
          <div className="detail-row">
            <span className="detail-label">Location:</span>
            <span className="detail-value">usn ringerike</span>
          </div>
          <div className="detail-row">
            <span className="detail-label">date:</span>
            <span className="detail-value">05.02.2025</span>
          </div>
          <div className="detail-row">
            <span className="detail-label">time:</span>
            <span className="detail-value">09.30</span>
          </div>
          <div className="detail-row">
            <span className="detail-label">leader:</span>
            <span className="detail-value">Sahil Singh</span>
          </div>
          
          <div className="status-section">
            <div className="detail-row">
              <span className="detail-label">status:</span>
              <span className="status-active">active</span>
            </div>
          </div>
          
          <div className="confirmation-section">
            <div className="detail-row">
              <span className="detail-label">confirmation number:</span>
              <span className="detail-value">xau11</span>
            </div>
          </div>
        </div>
        
        {/* Eventure Branding */}
        <div className="branding-section">
          <p className="thank-you-text">Thank you for choosing:</p>
          <div className="eventure-logo">
            <div className="logo-icon">E</div>
            <span className="logo-text">eventure</span>
          </div>
        </div>
        
        {/* Home Button */}
        <button
          type="button"
          onClick={handleOrganizationHomeClick}
          className="home-button"
        >
          HOME
        </button>
      </div>
    </div>
  );
};

export default OrganizationPublish;

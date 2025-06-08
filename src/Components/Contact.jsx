import React from 'react';
import '../Styles/Contact.css';

const Contact = () => {
  return (
    <>
      <header className="header">
        <nav className="nav">
          <ul className="nav-links">
            <li><a href="#home" onClick={(e) => { e.preventDefault(); window.location.href = '/home/1'; }}>Home</a></li>
            <li><a href="#contact" onClick={(e) => { e.preventDefault(); window.location.href = '/contact'; }}>Contact</a></li>
            <li><a href="#profile" onClick={(e) => { e.preventDefault(); window.location.href = '/profile'; }}>Profile</a></li>
          </ul>
        </nav>
      </header>
      <div className="contact-container">
        <div className="contact-card">
          <h2 className="contact-title">Contact Us</h2>
          <div className="contact-info">
            <div className="contact-item">
              <span className="contact-label">Telephone:</span>
              <span className="contact-value">12345678</span>
            </div>
            <div className="contact-item">
              <span className="contact-label">Email:</span>
              <span className="contact-value">Eventure@gmail.com</span>
            </div>
          </div>
          <p className="contact-response-time">We will get to you in 24 hours.</p>
        </div>
      </div>
    </>
  );
};

export default Contact;
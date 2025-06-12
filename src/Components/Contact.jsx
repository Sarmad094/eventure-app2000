import React from 'react';
import '../Styles/Contact.css';

const Contact = ({ isOrganization = false, onNavigate, showStatistics, setShowStatistics }) => {

  const profileNavigation = [
    { label: 'Home', href: '/home/1' },
    { label: 'Contact', href: '/contact' },
    { label: 'Profile', href: '/profile' }
  ];

  const navigation = profileNavigation;

  return (
    <div>
      {/* Profil header - vises bare hvis IKKE organisasjon */}
      {!isOrganization && (
        <header className="header">
          <nav className="nav">
            <ul className="nav-links">
              {navigation.map((item, index) => (
                <li key={index}>
                  <a 
                    href={item.href || "#"} 
                    onClick={(e) => { 
                      e.preventDefault(); 
                      if (item.href) {
                        window.location.href = item.href;
                      }
                    }}
                  >
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
        </header>
      )}

      {/* Organisasjon header - vises bare hvis organisasjon */}
      {isOrganization && (
        <nav className="top-nav">
          <div className="logo">
            <img src="/eventure-logo.svg" alt="Eventure" />
          </div>
          <div className="nav-links">
            <button 
              onClick={() => onNavigate && onNavigate('home')} 
              className={`nav-button ${!showStatistics ? 'active' : ''}`}
            >
              Home
            </button>
            <button 
              onClick={() => onNavigate && onNavigate('statistics')} 
              className={`nav-button ${showStatistics ? 'active' : ''}`}
            >
              Statistics
            </button>
            <a href="/faq" onClick={(e) => {
              e.preventDefault();
              onNavigate && onNavigate('/organization-faq');
            }}>FAQ</a>
            <a href="/contact" onClick={(e) => {
              e.preventDefault();
            }} className="nav-button active">Contact</a>
          </div>
        </nav>
      )}

      <div className={isOrganization ? "organization-home" : "contact-page"}>
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

        {/* Footer for organisasjon */}
        {isOrganization && (
          <footer className="footer">
            <img src="/eventure-logo.png" alt="Eventure" />
          </footer>
        )}
      </div>
    </div>
  );
};

export default Contact;
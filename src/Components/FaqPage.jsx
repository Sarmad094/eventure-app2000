import React from "react";
import "../Styles/FaqPage.css";

export default function FaqPage({ isOrganization = false, onNavigate, showStatistics, setShowStatistics }) {
  
  // Profil navigasjon (standard)
  const profileNavigation = [
    { label: 'Home', href: '/home/1' },
    { label: 'Contact', href: '/contact' },
    { label: 'Profile', href: '/profile' }
  ];

  return (
    <>
      {/* Profil header - vises bare hvis IKKE organisasjon */}
      {!isOrganization && (
        <header className="header">
          <nav className="nav">
            <ul className="nav-links">
              {profileNavigation.map((item, index) => (
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
              // Gjør ingenting siden vi allerede er på FAQ
            }} className="nav-button active">FAQ</a>
            <a href="/contact" onClick={(e) => {
              e.preventDefault();
              onNavigate && onNavigate('/organization-contact');
            }}>Contact</a>
          </div>
        </nav>
      )}

      <div className={isOrganization ? "organization-home" : "faq-page"}>
        <div className="faq-container">
          <div className="faq-card">
            <h1 className="faq-title">Frequently Asked Questions</h1>
            <div className="faq-item">
              <h2 className="faq-question">What is this app for?</h2>
              <p className="faq-answer">This app is designed to help users connect with relevant services based on their role.</p>
            </div>
            <div className="faq-item">
              <h2 className="faq-question">How do I get started?</h2>
              <p className="faq-answer">Simply choose whether you're a company or a student on the welcome page to proceed.</p>
            </div>
            <div className="faq-item">
              <h2 className="faq-question">Is this service free?</h2>
              <p className="faq-answer">Yes, this service is completely free to use for both companies and students.</p>
            </div>
          </div>
        </div>

        {/* Footer for organisasjon */}
        {isOrganization && (
          <footer className="footer">
            <img src="/eventure-logo.png" alt="Eventure" />
          </footer>
        )}
      </div>
    </>
  );
}
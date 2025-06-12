import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../State management/AuthContext';
import '../Styles/OrganizationHome.css';

const OrganizationLayout = ({ children, currentPage }) => {
  const navigate = useNavigate();
  const { logout } = useAuth();

  const handleNavigation = (path) => {
    navigate(path);
  };

  const handleLogout = () => {
    logout();
    navigate('/orglogin');
  };

  return (
    <div className="organization-home">
      <nav className="top-nav">
        <div className="logo">
          <img src="/eventure-logo.svg" alt="Eventure" />
        </div>
        <div className="nav-links">
          <button
            className={`nav-button ${currentPage === 'home' ? 'active' : ''}`}
            onClick={() => handleNavigation('/comphome')}
          >
            Home
          </button>
          <button
            className={`nav-button ${currentPage === 'statistics' ? 'active' : ''}`}
            onClick={() => handleNavigation('/statistics')}
          >
            Statistics
          </button>
          <a 
            href="/faq" 
            className={currentPage === 'faq' ? 'active' : ''}
            onClick={(e) => { e.preventDefault(); handleNavigation('/organization-faq'); }}
          >
            FAQ
          </a>
          <a 
            href="/contact" 
            className={currentPage === 'contact' ? 'active' : ''}
            onClick={(e) => { e.preventDefault(); handleNavigation('/organization-contact'); }}
          >
            Contact
          </a>
        </div>
        {currentPage === 'home' && (
          <button className="logout-nav-btn" onClick={handleLogout}>
            Logg ut
          </button>
        )}
      </nav>

      <main className="main-content">
        {children}
      </main>

      <footer className="footer">
        <img src="/eventure-logo.png" alt="Eventure" />
      </footer>
    </div>
  );
};

export default OrganizationLayout;

import React, { useState } from 'react';
import '../Styles/OrganizationHome.css';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../State management/AuthContext';

const OrganizationHome = () => {
  const [formData, setFormData] = useState({
    OrganizationId: '',
    organizationName: '',
    email: '',
    field: 'IT and Informatics',
    location: 'Oslo',
    participants: '10',
    price: '',
    description: '',
    date: '',
    agreeToTerms: false
  });

  const navigate = useNavigate();
  const { logout } = useAuth();

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
    navigate('/OrganizationPublish');
  };

  const handleNavigation = (path) => {
    if (path === '/' || path === '/comphome') {
      return;
    }
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
          <button className="nav-button active" onClick={() => handleNavigation('/comphome')}>
            Home
          </button>
          <button className="nav-button" onClick={() => handleNavigation('/statistics')}>
            Statistics
          </button>
          <a href="/faq" onClick={(e) => { e.preventDefault(); handleNavigation('/organization-faq'); }}>FAQ</a>
          <a href="/contact" onClick={(e) => { e.preventDefault(); handleNavigation('/organization-contact'); }}>Contact</a>
        </div>
        <button className="logout-nav-btn" onClick={handleLogout}>Logg ut</button>
      </nav>

      <main className="main-content">
        <form onSubmit={handleSubmit} className="event-form">
          <div className="form-grid">
            <div className="form-column">
              <div className="form-group">
                <label>Organization Id</label>
                <input
                  type="text"
                  name="OrganizationId"
                  value={formData.OrganizationId}
                  onChange={handleInputChange}
                  className="blue-input"
                  required
                />
              </div>

              <div className="form-group">
                <label>Organization name</label>
                <input
                  type="text"
                  name="organizationName"
                  value={formData.organizationName}
                  onChange={handleInputChange}
                  className="blue-input"
                  required
                />
              </div>

              <div className="form-group">
                <label>Email address</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  className="blue-input"
                  required
                />
              </div>
            </div>

            <div className="form-column">
              <div className="form-group">
                <label>Field</label>
                <select
                  name="field"
                  value={formData.field}
                  onChange={handleInputChange}
                  className="blue-select"
                >
                  <option value="IT and Informatics">IT and Informatics</option>
                  <option value="Health and Care">Health and Care</option>
                  <option value="Construction">Construction</option>
                  <option value="Education">Education</option>
                  <option value="Management and Admin">Management and Admin</option>
                </select>
              </div>

              <div className="form-group">
                <label>Number of participants</label>
                <select
                  name="participants"
                  value={formData.participants}
                  onChange={handleInputChange}
                  className="blue-select"
                >
                  <option value="10">10</option>
                  <option value="20">20</option>
                  <option value="30">30</option>
                </select>
              </div>

              <div className="form-group">
                <label>Description</label>
                <textarea
                  name="description"
                  value={formData.description}
                  onChange={handleInputChange}
                  className="blue-textarea"
                />
              </div>

              <div className="form-group">
                <label>Price per participant (NOK)</label>
                <div style={{ display: 'flex', alignItems: 'center' }}>
                  <input
                    type="number"
                    name="price"
                    value={formData.price}
                    onChange={handleInputChange}
                    className="blue-input"
                    min="0"
                    step="1"
                  />
                  <span style={{ marginLeft: '0.5rem' }}>kr</span>
                </div>
              </div>
            </div>

            <div className="form-column">
              <div className="form-group">
                <label>Location</label>
                <select
                  name="location"
                  value={formData.location}
                  onChange={handleInputChange}
                  className="blue-select"
                >
                  <option value="Oslo">Oslo</option>
                  <option value="Bergen">Bergen</option>
                  <option value="Trondheim">Trondheim</option>
                  <option value="Stavanger">Stavanger</option>
                  <option value="Tromsø">Tromsø</option>
                  <option value="Hønefoss">Hønefoss</option>
                </select>
              </div>

              <div className="form-group">
                <label>Date</label>
                <input
                  type="date"
                  name="date"
                  value={formData.date}
                  onChange={handleInputChange}
                  className="blue-input"
                />
              </div>
            </div>
          </div>

          <div className="terms-section">
            <label className="blue-checkbox">
              <input
                type="checkbox"
                name="agreeToTerms"
                checked={formData.agreeToTerms}
                onChange={handleInputChange}
                required
              />
              I agree to the terms
            </label>
          </div>

          <div className="button-group">
            <button type="submit" className="publish-btn">Publish</button>
            <button
              type="button"
              className="contact-btn"
              onClick={() => handleNavigation('/organization-contact')}
            >
              Contact
            </button>
          </div>
        </form>
      </main>

      <footer className="footer">
        <img src="/eventure-logo.png" alt="Eventure" />
      </footer>
    </div>
  );
};

export default OrganizationHome;

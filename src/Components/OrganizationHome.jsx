import React, { useState } from 'react';
import '../Styles/OrganizationHome.css';
import { useNavigate } from 'react-router-dom';

const OrganizationHome = () => {
  const [showStatistics, setShowStatistics] = useState(false);
  const [formData, setFormData] = useState({
    courseName: '',
    companyId: '',
    organizationName: '',
    email: '',
    subjectArea: 'IT and Informatics',
    participants: '10',
    price: '',
    description: '',
    date: '',
    agreeToTerms: false
  });

  const navigate = useNavigate();

  const courseStats = {
    courseName: "IT MICROSOFT COURSE",
    totalSpots: 30,
    appliedParticipants: 25,
    paidParticipants: 22,
    startDate: "2025-03-15",
    endDate: "2025-06-15",
    revenue: 1078,
    status: "Active",
    completionRate: 73,
    waitlist: 5
  };

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
    navigate('/OrganizationPublish');
  };
  

  const handleNavigation = (path) => {
    navigate(path);
  };

  return (
    <div className="organization-home">
      <nav className="top-nav">
        <div className="logo">
          <img src="/eventure-logo.svg" alt="Eventure" />
        </div>
        <div className="nav-links">
          <button 
            onClick={() => setShowStatistics(false)} 
            className={`nav-button ${!showStatistics ? 'active' : ''}`}
          >
            Home
          </button>
          <button 
            onClick={() => setShowStatistics(true)} 
            className={`nav-button ${showStatistics ? 'active' : ''}`}
          >
            Statistics
          </button>
          <a href="/faq" onClick={(e) => {
            e.preventDefault();
            handleNavigation('/FaqPage');
          }}>FAQ</a>
          <a href="/contact" onClick={(e) => {
            e.preventDefault();
            handleNavigation('/contact');
          }}>Contact</a>
        </div>
      </nav>

      {!showStatistics ? (
        <main className="main-content">
          <form onSubmit={handleSubmit} className="event-form">
            <div className="form-grid">
              <div className="form-column">
                <div className="form-group">
                  <label>Name of the course leader</label>
                  <input type="text" name="courseName" value={formData.courseName} onChange={handleInputChange} />
                </div>

                <div className="form-group">
                  <label>Company Id</label>
                  <input type="text" name="companyId" value={formData.companyId} onChange={handleInputChange} />
                </div>

                <div className="form-group">
                  <label>Organization name</label>
                  <input type="text" name="organizationName" value={formData.organizationName} onChange={handleInputChange} />
                </div>

                <div className="form-group">
                  <label>Email address</label>
                  <input type="email" name="email" value={formData.email} onChange={handleInputChange} />
                </div>
              </div>

              <div className="form-column">
                <div className="form-group">
                  <label>Subject area</label>
                  <select name="subjectArea" value={formData.subjectArea} onChange={handleInputChange}>
                    <option value="IT and Informatics">IT and Informatics</option>
                  </select>
                </div>

                <div className="form-group">
                  <label>Participants</label>
                  <select name="participants" value={formData.participants} onChange={handleInputChange}>
                    <option value="10">10</option>
                  </select>
                </div>

                <div className="form-group">
                  <label>Description</label>
                  <textarea name="description" value={formData.description} onChange={handleInputChange} />
                </div>

                <div className="form-group">
                  <label>Price</label>
                  <input type="number" name="price" value={formData.price} onChange={handleInputChange} />
                </div>
              </div>

              <div className="form-column">
                <div className="form-group date-picker">
                  <label>Select date</label>
                  <input type="date" name="date" value={formData.date} onChange={handleInputChange} />
                </div>
              </div>
            </div>

            <div className="terms-section">
              <label>
                <input type="checkbox" name="agreeToTerms" checked={formData.agreeToTerms} onChange={handleInputChange} />
                Agree to terms
              </label>
            </div>

            <div className="button-group">
              <button type="submit" className="publish-btn">Publish</button>
              <button type="button" className="contact-btn" onClick={() => handleNavigation('/contact')}>Contact</button>
            </div>
          </form>
        </main>
      ) : (
        <section className="statistics-section">
          <h3>Course Statistics</h3>
          <div className="stats-card">
            <div className="stats-header">
              <h4>{courseStats.courseName}</h4>
              <span className={`status-badge ${courseStats.status.toLowerCase()}`}>
                {courseStats.status}
              </span>
            </div>
            <div className="stats-grid">
              <div className="stat-item">
                <span>Total Spots: {courseStats.totalSpots}</span>
              </div>
              <div className="stat-item">
                <span>Applied: {courseStats.appliedParticipants}</span>
              </div>
              <div className="stat-item">
                <span>Paid: {courseStats.paidParticipants}</span>
              </div>
              <div className="stat-item">
                <span>Start Date: {courseStats.startDate}</span>
              </div>
              <div className="stat-item">
                <span>End Date: {courseStats.endDate}</span>
              </div>
              <div className="stat-item">
                <span>Revenue: ${courseStats.revenue}</span>
              </div>
              <div className="stat-item">
                <span>Completion Rate: {courseStats.completionRate}%</span>
              </div>
              <div className="stat-item">
                <span>Waitlist: {courseStats.waitlist}</span>
              </div>
            </div>
            <div className="stats-actions">
              <button>View Details</button>
              <button>Export Report</button>
            </div>
          </div>
        </section>
      )}

      <footer className="footer">
        <img src="/eventure-logo.png" alt="Eventure" />
      </footer>
    </div>
  );
};

export default OrganizationHome;
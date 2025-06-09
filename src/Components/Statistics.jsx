import React, { useState } from 'react';
import '../Styles/Statistics.css';
import { useNavigate } from 'react-router-dom';

const Statistics = () => {
  const [selectedCourse, setSelectedCourse] = useState('');
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [confirmationType, setConfirmationType] = useState('');
  
  const navigate = useNavigate();

  // Mock data - replace with real data from your backend
  const courses = [
    {
      id: 'course1',
      name: 'React Development Workshop',
      subjectArea: 'IT and Informatics',
      location: 'Oslo',
      totalSpots: 30,
      applied: 25,
      paid: 18,
      startDate: '2025-07-15',
      endDate: '2025-07-17',
      price: 2500,
      status: 'active'
    },
    {
      id: 'course2',
      name: 'Healthcare Management Course',
      subjectArea: 'Health and Care',
      location: 'Bergen',
      totalSpots: 20,
      applied: 20,
      paid: 15,
      startDate: '2025-08-10',
      endDate: '2025-08-12',
      price: 3000,
      status: 'active'
    },
    {
      id: 'course3',
      name: 'Construction Safety Training',
      subjectArea: 'Construction',
      location: 'Stavanger',
      totalSpots: 25,
      applied: 22,
      paid: 20,
      startDate: '2025-09-05',
      endDate: '2025-09-07',
      price: 1800,
      status: 'active'
    }
  ];

  const selectedCourseData = courses.find(course => course.id === selectedCourse);

  const calculateCompletionRate = (paid, total) => {
    return total > 0 ? Math.round((paid / total) * 100) : 0;
  };

  const handleCourseSelect = (e) => {
    setSelectedCourse(e.target.value);
  };

  const handleNavigation = (path) => {
    navigate(path);
  };

  const handleCancelEvent = () => {
    setConfirmationType('cancel');
    setShowConfirmation(true);
  };

  const handleDeleteEvent = () => {
    setConfirmationType('delete');
    setShowConfirmation(true);
  };

  const confirmAction = () => {
    if (confirmationType === 'cancel') {
      console.log('Event cancelled:', selectedCourse);
      // Add your cancel logic here
    } else if (confirmationType === 'delete') {
      console.log('Event deleted:', selectedCourse);
      // Add your delete logic here
    }
    setShowConfirmation(false);
    setSelectedCourse('');
  };

  const cancelAction = () => {
    setShowConfirmation(false);
    setConfirmationType('');
  };

  return (
    <div className="statistics-page">
      <nav className="top-nav">
        <div className="logo">
          <img src="/eventure-logo.svg" alt="Eventure" />
        </div>
        <div className="nav-links">
          <button
            className="nav-button"
            onClick={() => handleNavigation('/comphome')}
          >
            Home
          </button>
          <button
            className="nav-button active"
            onClick={() => handleNavigation('/statistics')}
          >
            Statistics
          </button>
          <a href="/faq" onClick={(e) => { e.preventDefault(); handleNavigation('/organization-faq'); }}>FAQ</a>
          <a href="/contact" onClick={(e) => { e.preventDefault(); handleNavigation('/organization-contact'); }}>Contact</a>
        </div>
      </nav>

      <main className="main-content">
        <div className="statistics-container">
          <h1 className="blue-heading">Course Statistics</h1>
          <p className="blue-subheading">Select a course to view detailed statistics</p>

          <div className="course-selector">
            <div className="form-group">
              <label>Select Course</label>
              <select
                value={selectedCourse}
                onChange={handleCourseSelect}
                className="blue-select course-select"
              >
                <option value="">Choose a course...</option>
                {courses.map(course => (
                  <option key={course.id} value={course.id}>
                    {course.name} - {course.location} ({course.startDate})
                  </option>
                ))}
              </select>
            </div>
          </div>

          {selectedCourseData && (
            <div className="stats-display">
              <div className="course-header">
                <h2 className="blue-card-title">{selectedCourseData.name}</h2>
                <span className={`status-badge ${selectedCourseData.status}`}>
                  {selectedCourseData.status.toUpperCase()}
                </span>
              </div>

              <div className="course-info">
                <div className="info-item">
                  <span className="info-label">Subject Area:</span>
                  <span className="info-value">{selectedCourseData.subjectArea}</span>
                </div>
                <div className="info-item">
                  <span className="info-label">Location:</span>
                  <span className="info-value">{selectedCourseData.location}</span>
                </div>
                <div className="info-item">
                  <span className="info-label">Price:</span>
                  <span className="info-value">{selectedCourseData.price} NOK</span>
                </div>
              </div>

              <div className="stats-grid">
                <div className="stat-item">
                  <span className="stat-label">Total Spots</span>
                  <span className="blue-stat">{selectedCourseData.totalSpots}</span>
                </div>
                
                <div className="stat-item">
                  <span className="stat-label">Applications Received</span>
                  <span className="blue-stat">{selectedCourseData.applied}</span>
                </div>
                
                <div className="stat-item">
                  <span className="stat-label">Payments Completed</span>
                  <span className="blue-stat">{selectedCourseData.paid}</span>
                </div>
                
                <div className="stat-item">
                  <span className="stat-label">Completion Rate</span>
                  <span className="blue-stat">
                    {calculateCompletionRate(selectedCourseData.paid, selectedCourseData.applied)}%
                  </span>
                </div>
              </div>

              <div className="date-info">
                <div className="date-item">
                  <span className="date-label">Start Date:</span>
                  <span className="date-value">{new Date(selectedCourseData.startDate).toLocaleDateString('en-GB')}</span>
                </div>
                <div className="date-item">
                  <span className="date-label">End Date:</span>
                  <span className="date-value">{new Date(selectedCourseData.endDate).toLocaleDateString('en-GB')}</span>
                </div>
              </div>

              <div className="action-buttons">
                <button
                  className="cancel-btn"
                  onClick={handleCancelEvent}
                  disabled={selectedCourseData.status !== 'active'}
                >
                  Cancel Event
                </button>
                <button
                  className="delete-btn"
                  onClick={handleDeleteEvent}
                >
                  Delete Event
                </button>
              </div>
            </div>
          )}

          {!selectedCourse && (
            <div className="no-selection">
              <p>Please select a course to view its statistics</p>
            </div>
          )}
        </div>
      </main>

      {showConfirmation && (
        <div className="confirmation-overlay">
          <div className="confirmation-modal">
            <h3>Confirm Action</h3>
            <p>
              Are you sure you want to {confirmationType} the event "{selectedCourseData?.name}"?
            </p>
            <div className="confirmation-buttons">
              <button className="confirm-btn" onClick={confirmAction}>
                Yes, {confirmationType}
              </button>
              <button className="cancel-confirmation-btn" onClick={cancelAction}>
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      <footer className="footer">
        <img src="/eventure-logo.png" alt="Eventure" />
      </footer>
    </div>
  );
};

export default Statistics;
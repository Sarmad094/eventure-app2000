import React, { useState, useEffect } from 'react';
import '../Styles/OrganizationHome.css';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../State management/AuthContext';
import axios from 'axios';

const OrganizationHome = () => {
  const [formData, setFormData] = useState({
    title: '',
    e_description: '',
    participants: 10,
    startDate: '',
    endDate: '',
    price: '',
    organizationId: '',
    fieldId: '',
    locationId: '',
    agreeToTerms: false
  });

  const [locations, setLocations] = useState([]);
  const [fields, setFields] = useState([]);
  const [organizations, setOrganizations] = useState([]);
  const [loading, setLoading] = useState(false);
  const [submitMessage, setSubmitMessage] = useState('');

  const navigate = useNavigate();
  const { logout, organizationId } = useAuth();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [locationsRes, fieldsRes, organizationsRes] = await Promise.all([
          axios.get('http://localhost:8081/api/locations'),
          axios.get('http://localhost:8081/api/fields'),
          axios.get('http://localhost:8081/api/organizations')
        ]);
        
        setLocations(locationsRes.data);
        setFields(fieldsRes.data);
        setOrganizations(organizationsRes.data);
        
        if (organizationId) {
          setFormData(prev => ({
            ...prev,
            organizationId: organizationId
          }));
        }
        
      } catch (error) {
        console.error('Error fetching data:', error);
        setSubmitMessage('Error loading form data. Please refresh the page.');
      }
    };

    fetchData();
  }, [organizationId]);

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    let processedValue = value;

    if (name === 'participants') {
      processedValue = parseInt(value, 10);
    } else if (name === 'price') {
      processedValue = value === '' ? '' : parseFloat(value);
    } else if (name === 'organizationId' || name === 'fieldId' || name === 'locationId') {
      processedValue = value === '' ? '' : parseInt(value, 10);
    }

    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : processedValue
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setSubmitMessage('');

    try {
      if (!formData.title || !formData.startDate || !formData.endDate) {
        setSubmitMessage('Please fill in all required fields (Title, Start Date, End Date).');
        setLoading(false);
        return;
      }

      const startDate = new Date(formData.startDate);
      const endDate = new Date(formData.endDate);
      
      if (endDate <= startDate) {
        setSubmitMessage('End date must be after start date.');
        setLoading(false);
        return;
      }

      const eventData = {
        title: formData.title,
        e_description: formData.e_description || '',
        participants: formData.participants,
        startDate: formData.startDate + 'T00:00:00', 
        endDate: formData.endDate + 'T23:59:59', 
        price: formData.price === '' ? 0 : parseFloat(formData.price),
        organizationId: formData.organizationId || null,
        fieldId: formData.fieldId || null,
        locationId: formData.locationId || null
      };

      console.log('Submitting event data:', eventData);

      const response = await axios.post('http://localhost:8081/api/events', eventData);
      
      if (response.status === 200) {
        setSubmitMessage('Event created successfully!');
        
        setFormData({
          title: '',
          e_description: '',
          participants: 10,
          startDate: '',
          endDate: '',
          price: '',
          organizationId: organizationId || '', 
          fieldId: '',
          locationId: '',
          agreeToTerms: false
        });

        setTimeout(() => {
          navigate('/OrganizationPublish', { 
            state: { 
              eventId: response.data,
              eventData: eventData 
            }
          });
        }, 2000);
      }
    } catch (error) {
      console.error('Error creating event:', error);
      setSubmitMessage('Error creating event. Please try again.');
    } finally {
      setLoading(false);
    }
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
        <button className="logout-nav-btn blue-button" onClick={handleLogout}>Log out</button>
      </nav>

      <main className="main-content">
        <form onSubmit={handleSubmit} className="event-form">
          <div className="form-grid">
            <div className="form-column">
              <div className="form-group">
                <label>Event Title *</label>
                <input
                  type="text"
                  name="title"
                  value={formData.title}
                  onChange={handleInputChange}
                  className="blue-input"
                  required
                />
              </div>

              <div className="form-group">
                <label>Organization</label>
                <select
                  name="organizationId"
                  value={formData.organizationId}
                  onChange={handleInputChange}
                  className="blue-select"
                  disabled={organizationId} 
                >
                  <option value="">Select Organization</option>
                  {organizations.map((org) => (
                    <option key={org.orgId} value={org.orgId}>
                      {org.orgName}
                    </option>
                  ))}
                </select>
              </div>

              <div className="form-group">
                <label>Description</label>
                <textarea
                  name="e_description"
                  value={formData.e_description}
                  onChange={handleInputChange}
                  className="blue-textarea"
                  rows="4"
                />
              </div>
            </div>

            <div className="form-column">
              <div className="form-group">
                <label>Field</label>
                <select
                  name="fieldId"
                  value={formData.fieldId}
                  onChange={handleInputChange}
                  className="blue-select"
                >
                  <option value="">Select Field</option>
                  {fields.map((field) => (
                    <option key={field.fieldId} value={field.fieldId}>
                      {field.fieldName}
                    </option>
                  ))}
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
                  <option value={10}>10</option>
                  <option value={20}>20</option>
                  <option value={30}>30</option>
                  <option value={50}>50</option>
                  <option value={100}>100</option>
                </select>
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
                    step="0.01"
                    placeholder="0 for free event"
                  />
                  <span style={{ marginLeft: '0.5rem' }}>kr</span>
                </div>
              </div>
            </div>

            <div className="form-column">
              <div className="form-group">
                <label>Location</label>
                <select
                  name="locationId"
                  value={formData.locationId}
                  onChange={handleInputChange}
                  className="blue-select"
                >
                  <option value="">Select Location</option>
                  {locations.map((location) => (
                    <option key={location.locationId} value={location.locationId}>
                      {location.locationName}
                    </option>
                  ))}
                </select>
              </div>

              <div className="form-group">
                <label>Start Date *</label>
                <input
                  type="date"
                  name="startDate"
                  value={formData.startDate}
                  onChange={handleInputChange}
                  className="blue-input"
                  required
                />
              </div>

              <div className="form-group">
                <label>End Date *</label>
                <input
                  type="date"
                  name="endDate"
                  value={formData.endDate}
                  onChange={handleInputChange}
                  className="blue-input"
                  required
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
              I agree to the terms *
            </label>
          </div>

          {submitMessage && (
            <div className={`submit-message ${submitMessage.includes('Error') ? 'error' : 'success'}`}>
              {submitMessage}
            </div>
          )}

          <div className="button-group">
            <button type="submit" className="publish-btn" disabled={loading}>
              {loading ? 'Publishing...' : 'Publish'}
            </button>
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
        
      </footer>
    </div>
  );
};

export default OrganizationHome;
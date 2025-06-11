import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import axios from 'axios';
import "../Styles/OrganizationPublish.css";

const OrganizationPublish = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [eventDetails, setEventDetails] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchEventDetails = async () => {
      try {
        // Get event data from navigation state
        const { eventId, eventData } = location.state || {};
        
        if (!eventId) {
          // If no event ID, redirect to home
          navigate('/comphome');
          return;
        }

        // Fetch the complete event details from the database
        const eventResponse = await axios.get(`http://localhost:8081/api/events/${eventId}`);
        const event = eventResponse.data;

        // Fetch related data (organization, field, location)
        const [organizationRes, fieldRes, locationRes] = await Promise.all([
          event.organizationId ? axios.get(`http://localhost:8081/api/organizations/${event.organizationId}`) : Promise.resolve(null),
          event.fieldId ? axios.get(`http://localhost:8081/api/fields/${event.fieldId}`) : Promise.resolve(null),
          event.locationId ? axios.get(`http://localhost:8081/api/locations/${event.locationId}`) : Promise.resolve(null)
        ]);

        // Format the event details
        const formattedEvent = {
          eventId: event.eventId,
          title: event.title || 'No Title',
          description: event.e_description || 'No Description',
          participants: event.participants || 0,
          price: event.price === 0 ? 'Free' : event.price ? `${event.price} NOK` : 'N/A',
          startDate: event.startDate ? new Date(event.startDate).toLocaleDateString('no-NO') : 'N/A',
          endDate: event.endDate ? new Date(event.endDate).toLocaleDateString('no-NO') : 'N/A',
          startTime: event.startDate ? new Date(event.startDate).toLocaleTimeString('no-NO', { 
            hour: '2-digit', 
            minute: '2-digit' 
          }) : 'N/A',
          endTime: event.endDate ? new Date(event.endDate).toLocaleTimeString('no-NO', { 
            hour: '2-digit', 
            minute: '2-digit' 
          }) : 'N/A',
          organizationName: organizationRes?.data?.orgName || 'No Organization',
          fieldName: fieldRes?.data?.fieldName || 'No Field',
          locationName: locationRes?.data?.locationName || 'No Location'
        };

        setEventDetails(formattedEvent);
        setLoading(false);
      } catch (err) {
        console.error('Error fetching event details:', err);
        setError('Failed to load event details');
        setLoading(false);
      }
    };

    fetchEventDetails();
  }, [location.state, navigate]);

  const handleOrganizationHomeClick = () => {
    navigate('/comphome');
  };

  if (loading) {
    return (
      <div className="publish-container">
        <div className="publish-card">
          <h1 className="success-title">Loading event details...</h1>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="publish-container">
        <div className="publish-card">
          <h1 className="success-title">Error: {error}</h1>
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
  }

  if (!eventDetails) {
    return (
      <div className="publish-container">
        <div className="publish-card">
          <h1 className="success-title">No event data found</h1>
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
  }

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
            {eventDetails.title}
          </h2>
          
          <div className="detail-row">
            <span className="detail-label">Location:</span>
            <span className="detail-value">{eventDetails.locationName}</span>
          </div>
          
          <div className="detail-row">
            <span className="detail-label">Field:</span>
            <span className="detail-value">{eventDetails.fieldName}</span>
          </div>
          
          <div className="detail-row">
            <span className="detail-label">Organization:</span>
            <span className="detail-value">{eventDetails.organizationName}</span>
          </div>
          
          <div className="detail-row">
            <span className="detail-label">start date:</span>
            <span className="detail-value">{eventDetails.startDate}</span>
          </div>
          
          <div className="detail-row">
            <span className="detail-label">end date:</span>
            <span className="detail-value">{eventDetails.endDate}</span>
          </div>
          
          <div className="detail-row">
            <span className="detail-label">Participants:</span>
            <span className="detail-value">{eventDetails.participants}</span>
          </div>
          
          <div className="detail-row">
            <span className="detail-label">Price:</span>
            <span className="detail-value">{eventDetails.price}</span>
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
              <span className="detail-value">{eventDetails.eventId}</span>
            </div>
          </div>
          
          {eventDetails.description && (
            <div className="description-section">
              <div className="detail-row">
                <span className="detail-label">Description:</span>
              </div>
              <div className="description-text">
                {eventDetails.description}
              </div>
            </div>
          )}
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


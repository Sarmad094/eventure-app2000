import React, { useState, useEffect } from 'react';
import '../Styles/Statistics.css';
import OrganizationLayout from './OrganizationLayout';
import axios from 'axios';
import { useAuth } from '../State management/AuthContext';

const Statistics = () => {
  const [selectedEvent, setSelectedEvent] = useState('');
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [events, setEvents] = useState([]);
  const [bookings, setBookings] = useState([]);
  const [payments, setPayments] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const { organizationId, isAuthenticated } = useAuth();

  useEffect(() => {
    const fetchData = async () => {
      if (!isAuthenticated || !organizationId) {
        setError('You must be logged in to view statistics.');
        return;
      }

      setLoading(true);
      try {
        const [eventsRes, bookingsRes, paymentsRes] = await Promise.all([
          axios.get(`http://localhost:8081/api/events?organizationId=${organizationId}`),
          axios.get('http://localhost:8081/api/bookings'),
          axios.get('http://localhost:8081/api/payments')
        ]);
        
        const organizationEvents = eventsRes.data.filter(event => 
          event.organizationId === organizationId
        );
        
        setEvents(organizationEvents);
        setBookings(bookingsRes.data);
        setPayments(paymentsRes.data);
        setError('');
      } catch (error) {
        console.error('Error fetching data:', error);
        setError('Error loading data. Please refresh the page.');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [organizationId, isAuthenticated]);

  const selectedEventData = events.find(event => event.eventId === parseInt(selectedEvent));

  const getEventStatistics = (eventId) => {
    if (!eventId) return { totalBookings: 0, totalPayments: 0, totalRevenue: 0 };

    const eventBookings = bookings.filter(booking => booking.eventId === parseInt(eventId));
    const eventPayments = payments.filter(payment => 
      eventBookings.some(booking => booking.bookId === payment.bookId)
    );

    return {
      totalBookings: eventBookings.length,
      totalPayments: eventPayments.length,
      totalRevenue: eventPayments.reduce((sum, payment) => sum + (payment.amount || 0), 0)
    };
  };

  const calculateCompletionRate = (payments, bookings) => {
    return bookings > 0 ? Math.round((payments / bookings) * 100) : 0;
  };

  const handleEventSelect = (e) => {
    setSelectedEvent(e.target.value);
    setError('');
  };

  const handleDeleteEvent = () => {
    setShowConfirmation(true);
  };

  const confirmDelete = async () => {
    try {
      setLoading(true);
      
      if (selectedEventData.organizationId !== organizationId) {
        setError('You can only delete events from your own organization.');
        setLoading(false);
        return;
      }

      await axios.delete(`http://localhost:8081/api/events/${selectedEvent}?organizationId=${organizationId}`);
      
      setEvents(prevEvents => prevEvents.filter(event => event.eventId !== parseInt(selectedEvent)));
      setSelectedEvent('');
      setShowConfirmation(false);
      setError('');
    } catch (error) {
      console.error('Error deleting event:', error);
      setError('Error deleting event. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const cancelDelete = () => {
    setShowConfirmation(false);
  };

  const statistics = getEventStatistics(selectedEvent);

  if (!isAuthenticated || !organizationId) {
    return (
      <OrganizationLayout currentPage="statistics">
        <div className="statistics-container">
          <div className="error-message" style={{ color: 'red', textAlign: 'center', padding: '2rem' }}>
            You must be logged in to view statistics.
          </div>
        </div>
      </OrganizationLayout>
    );
  }

  if (loading && events.length === 0) {
    return (
      <OrganizationLayout currentPage="statistics">
        <div className="statistics-container">
          <div className="loading">Loading...</div>
        </div>
      </OrganizationLayout>
    );
  }

  return (
    <OrganizationLayout currentPage="statistics">
      <div className="statistics-container">
        <h1 className="blue-heading">Event Statistics</h1>
        <p className="blue-subheading">Select an event to view detailed statistics</p>

        {error && (
          <div className="error-message" style={{ color: 'red', marginBottom: '1rem' }}>
            {error}
          </div>
        )}

        <div className="course-selector">
          <div className="form-group">
            <label>Select Event</label>
            <select
              value={selectedEvent}
              onChange={handleEventSelect}
              className="blue-select course-select"
              disabled={loading}
            >
              <option value="">Choose an event...</option>
              {events.map(event => (
                <option key={event.eventId} value={event.eventId}>
                  {event.title} - {new Date(event.startDate).toLocaleDateString('en-GB')}
                </option>
              ))}
            </select>
          </div>
        </div>

        {events.length === 0 && !loading && (
          <div className="no-selection">
            <p>No events found for your organization. Create an event first!</p>
          </div>
        )}

        {selectedEventData && (
          <div className="stats-display">
            <div className="course-header">
              <h2 className="blue-card-title">{selectedEventData.title}</h2>
            </div>

            <div className="course-info">
              <div className="info-item">
                <span className="info-label">Description:</span>
                <span className="info-value">{selectedEventData.e_description || 'No description'}</span>
              </div>
              <div className="info-item">
                <span className="info-label">Max Participants:</span>
                <span className="info-value">{selectedEventData.participants}</span>
              </div>
              <div className="info-item">
                <span className="info-label">Price:</span>
                <span className="info-value">{selectedEventData.price} NOK</span>
              </div>
            </div>

            <div className="stats-grid">
              <div className="stat-item">
                <span className="stat-label">Max Participants</span>
                <span className="blue-stat">{selectedEventData.participants}</span>
              </div>
              
              <div className="stat-item">
                <span className="stat-label">Total Bookings</span>
                <span className="blue-stat">{statistics.totalBookings}</span>
              </div>
              
              <div className="stat-item">
                <span className="stat-label">Payments Completed</span>
                <span className="blue-stat">{statistics.totalPayments}</span>
              </div>
              
              <div className="stat-item">
                <span className="stat-label">Payment Completion Rate</span>
                <span className="blue-stat">
                  {calculateCompletionRate(statistics.totalPayments, statistics.totalBookings)}%
                </span>
              </div>

              <div className="stat-item">
                <span className="stat-label">Total Revenue</span>
                <span className="blue-stat">{statistics.totalRevenue.toFixed(2)} NOK</span>
              </div>
            </div>

            <div className="date-info">
              <div className="date-item">
                <span className="date-label">Start Date:</span>
                <span className="date-value">
                  {new Date(selectedEventData.startDate).toLocaleDateString('en-GB')}
                </span>
              </div>
              <div className="date-item">
                <span className="date-label">End Date:</span>
                <span className="date-value">
                  {new Date(selectedEventData.endDate).toLocaleDateString('en-GB')}
                </span>
              </div>
            </div>

            <div className="action-buttons">
              <button
                className="cancel-btn"
                onClick={handleDeleteEvent}
                disabled={loading}
              >
                {loading ? 'Deleting...' : 'Delete Event'}
              </button>
            </div>
          </div>
        )}

        {!selectedEvent && !loading && events.length > 0 && (
          <div className="no-selection">
            <p>Please select an event to view its statistics</p>
          </div>
        )}
      </div>

      {showConfirmation && (
        <div className="confirmation-overlay">
          <div className="confirmation-modal">
            <h3>Confirm Deletion</h3>
            <p>
              Are you sure you want to delete the event "{selectedEventData?.title}"?
              This action cannot be undone.
            </p>
            <div className="confirmation-buttons">
              <button className="confirm-btn" onClick={confirmDelete} disabled={loading}>
                {loading ? 'Deleting...' : 'Yes, Delete'}
              </button>
              <button className="cancel-confirmation-btn" onClick={cancelDelete} disabled={loading}>
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </OrganizationLayout>
  );
};

export default Statistics;
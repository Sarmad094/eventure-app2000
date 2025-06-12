import React, { useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import axios from 'axios';
import "../Styles/StudentConfirm.css";


const StudentConfirm = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [bookingDetails, setBookingDetails] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchConfirmation = async () => {
      try {
        const { bookingId } = location.state || {};
        if (!bookingId) {
          navigate('/home/1');
          return;
        }

        const bookingRes = await axios.get(`http://localhost:8081/api/bookings/${bookingId}`);
        const booking = bookingRes.data;

        const [eventRes, studentRes] = await Promise.all([
          axios.get(`http://localhost:8081/api/events/${booking.eventId}`),
          axios.get(`http://localhost:8081/api/students/${booking.studentId}`)
        ]);

        setBookingDetails({
          bookingId: booking.bookId,
          student: studentRes.data,
          event: eventRes.data,
          paymentStatus: booking.paymentStatus ? "Paid" : "Unpaid",
          bookDate: booking.bookDate
        });

        setLoading(false);
      } catch (err) {
        console.error("Error loading booking confirmation:", err);
        setError("Failed to load booking confirmation");
        setLoading(false);
      }
    };

    fetchConfirmation();
  }, [location.state, navigate]);

  const handleHomeClick = () => {
    navigate('/home/1');
  };

  if (loading) {
    return (
      <div className="publish-container">
        <div className="publish-card">
          <h1 className="success-title">Loading confirmation...</h1>
        </div>
      </div>
    );
  }

  if (error || !bookingDetails) {
    return (
      <div className="publish-container">
        <div className="publish-card">
          <h1 className="success-title">{error || "No booking data found."}</h1>
          <button className="home-button" onClick={handleHomeClick}>HOME</button>
        </div>
      </div>
    );
  }

  const { student, event, bookingId, paymentStatus, bookDate } = bookingDetails;

  return (
    <div className="publish-container">
      <div className="publish-card">
        <h1 className="success-title">Your registration is confirmed!</h1>

        <div className="event-details">
          <h2 className="event-title">{event.title}</h2>

          <div className="detail-row">
            <span className="detail-label">Location:</span>
            <span className="detail-value">{event.locationId}</span>
          </div>

          <div className="detail-row">
            <span className="detail-label">Start Date:</span>
            <span className="detail-value">{event.startDate?.slice(0, 10)}</span>
          </div>

          <div className="detail-row">
            <span className="detail-label">End Date:</span>
            <span className="detail-value">{event.endDate?.slice(0, 10)}</span>
          </div>

          <div className="detail-row">
            <span className="detail-label">Participants:</span>
            <span className="detail-value">{event.participants}</span>
          </div>

          <div className="detail-row">
            <span className="detail-label">Price:</span>
            <span className="detail-value">{event.price === 0 ? "Free" : `${event.price} NOK`}</span>
          </div>

          <div className="detail-row">
            <span className="detail-label">Status:</span>
            <span className="status-active">{paymentStatus}</span>
          </div>

          <div className="confirmation-section">
            <div className="detail-row">
              <span className="detail-label">Booking #:</span>
              <span className="detail-value">{bookingId}</span>
            </div>
            <div className="detail-row">
              <span className="detail-label">Booking Date:</span>
              <span className="detail-value">{bookDate}</span>
            </div>
          </div>

          <div className="detail-row">
            <span className="detail-label">Student:</span>
            <span className="detail-value">{student.firstName} {student.lastName}</span>
          </div>
        </div>

        <div className="branding-section">
          <p className="thank-you-text">Thank you for registering through:</p>
          <div className="eventure-logo">
            <div className="logo-icon">E</div>
            <span className="logo-text">eventure</span>
          </div>
        </div>

        <button className="home-button" onClick={handleHomeClick}>HOME</button>
      </div>
    </div>
  );
};

export default StudentConfirm;


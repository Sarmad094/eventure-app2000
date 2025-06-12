import React, { useState, useEffect } from "react";
import axios from "axios";
import "../Styles/EventDetail.css";

export default function EventDetail(props) {
  const {
    event,
    onClose,
    onPay,
    onLike = () => {},
  } = props;

  const [isLiked, setIsLiked] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);
  const [remainingSlots, setRemainingSlots] = useState(0);
  const [alreadyBooked, setAlreadyBooked] = useState(false);
  const [loading, setLoading] = useState(false);

  // Get current user from sessionStorage
  useEffect(() => {
    const userData = sessionStorage.getItem('currentUser');
    if (userData) {
      setCurrentUser(JSON.parse(userData));
    }
  }, []);
  useEffect(() => {
  if (event && event.endDate) {
    const now = new Date();
    const endDate = new Date(event.endDate);

    if (endDate < now) {
      onClose(); // Lukk modalen hvis eventet er over
    }
  }
}, [event, onClose]);

  // Check if event is liked and get remaining slots
  useEffect(() => {
    if (currentUser && event) {
      checkIfLiked();
      fetchRemainingSlots();
      checkIfAlreadyBooked();
    }
  }, [currentUser, event]);

  const checkIfLiked = async () => {
    try {
      const response = await axios.get(`http://localhost:8081/api/likedevents/exists`, {
        params: {
          studentId: currentUser.studentId,
          eventId: event.eventId
        }
      });
      setIsLiked(response.data);
    } catch (error) {
      console.error("Error checking like status:", error);
      setIsLiked(false);
    }
  };

  const fetchRemainingSlots = async () => {
    try {
      const response = await axios.get(`http://localhost:8081/api/events/${event.eventId}/remaining-slots`);
      setRemainingSlots(response.data);
    } catch (error) {
      console.error("Error fetching remaining slots:", error);
      setRemainingSlots(0);
    }
  };

  const checkIfAlreadyBooked = async () => {
    try {
      const response = await axios.get(`http://localhost:8081/api/bookings`);
      const bookings = response.data;
      const userBooking = bookings.find(booking => 
        booking.studentId === currentUser.studentId && booking.eventId === event.eventId
      );
      setAlreadyBooked(!!userBooking);
    } catch (error) {
      console.error("Error checking booking status:", error);
      setAlreadyBooked(false);
    }
  };

  const handleLike = async () => {
    if (!currentUser) {
      alert("Please log in to like events");
      return;
    }

    try {
      if (isLiked) {
        // Unlike event
        await axios.delete(`http://localhost:8081/api/likedevents/unlike`, {
          params: {
            studentId: currentUser.studentId,
            eventId: event.eventId
          }
        });
        setIsLiked(false);
        console.log("Event unliked successfully");
      } else {
        // Like event
        await axios.post(`http://localhost:8081/api/likedevents/like`, null, {
          params: {
            studentId: currentUser.studentId,
            eventId: event.eventId
          }
        });
        setIsLiked(true);
        console.log("Event liked successfully");
      }
      onLike(event.title);
    } catch (error) {
      console.error("Error:", error);
      alert("Could not update like status. Please try again.");
    }
  };

  const handlePayAndApply = () => {
    if (!currentUser) {
      alert("Please log in to book an event");
      return;
    }

    if (alreadyBooked) {
      alert("You have already booked this event!");
      return;
    }

    if (remainingSlots <= 0) {
      alert("Sorry, this event is fully booked!");
      return;
    }

    setLoading(true);
    onPay(event);
  };

  if (!event) return null;

  const canBook = currentUser && !alreadyBooked && remainingSlots > 0;

  return (
    <div className="modal-overlay">
      <div className="modal">
        <button className="close-btn" onClick={onClose}>×</button>
        <h2>{event.title}</h2>
        <div className="event-subtitle">{event.subjectArea}</div>

        <div className="event-detail-grid">
          <div className="event-detail-item">
            <span className="label">Start Date</span>
            <span className="value">{event.startDate}</span>
          </div>
          <div className="event-detail-item">
            <span className="label">End Date</span>
            <span className="value">{event.endDate}</span>
          </div>
          <div className="event-detail-item">
            <span className="label">Location</span>
            <span className="value">{event.location}</span>
          </div>
          <div className="event-detail-item">
            <span className="label">Max Participants</span>
            <span className="value">{event.participants}</span>
          </div>
          <div className="event-detail-item">
            <span className="label">Price</span>
            <span className="value">{event.price}</span>
          </div>
          <div className="event-detail-item">
            <span className="label">Remaining Slots</span>
            <span className={`value ${remainingSlots === 0 ? 'fully-booked' : remainingSlots <= 5 ? 'low-availability' : ''}`}>
              {remainingSlots}
            </span>
          </div>
        </div>

        <div className="modal-description">
          <p>{event.description}</p>
        </div>

        <div className="event-actions">
          <button className="like-btn" onClick={handleLike}>
            {isLiked ? "♥" : "♡"}
          </button>
          
          {alreadyBooked ? (
            <button className="already-booked-btn" disabled>
              Already Booked
            </button>
          ) : remainingSlots <= 0 ? (
            <button className="fully-booked-btn" disabled>
              Fully Booked
            </button>
          ) : (
            <button 
              className="pay-apply-btn" 
              onClick={handlePayAndApply}
              disabled={loading || !currentUser}
            >
              {loading ? "Processing..." : "Pay and Apply"}
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
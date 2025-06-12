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

  // Get current user on component mount
  useEffect(() => {
    const userData = sessionStorage.getItem('currentUser');
    if (userData) {
      setCurrentUser(JSON.parse(userData));
    }
  }, []);

  // Check if event is liked when user or event changes
  useEffect(() => {
    if (currentUser && event) {
      checkIfLiked();
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
    onPay(event);
  };

  if (!event) return null;

  const remainingSlots = 50 - (event.participants || 0);

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
            <span className="label">Participants</span>
            <span className="value">{event.participants}</span>
          </div>
          <div className="event-detail-item">
            <span className="label">Price</span>
            <span className="value">{event.price}</span>
          </div>
          <div className="event-detail-item">
            <span className="label">Remaining Slots</span>
            <span className="value">{remainingSlots}</span>
          </div>
        </div>

        <div className="modal-description">
          <p>{event.description}</p>
        </div>

        <div className="event-actions">
          <button className="like-btn" onClick={handleLike}>
            {isLiked ? "♥" : "♡"}
          </button>
          <button className="pay-apply-btn" onClick={handlePayAndApply}>
            Pay and Apply
          </button>
        </div>
      </div>
    </div>
  );
}
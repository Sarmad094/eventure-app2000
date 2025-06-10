// EventDetail.jsx

import React, { useState, useEffect } from "react";
import "../Styles/EventDetail.css";

export default function EventDetail(props) {
  const {
    event,
    onClose,
    onPay,
    onLike = () => {}, // fallback hvis ikke sendt inn
  } = props;

  const [isLiked, setIsLiked] = useState(false);

  useEffect(() => {
    const liked = JSON.parse(localStorage.getItem("likedCourses")) || [];
    setIsLiked(liked.includes(event.title));
  }, [event.title]);

  const handleLike = () => {
    const liked = JSON.parse(localStorage.getItem("likedCourses")) || [];
    let updated;

    if (liked.includes(event.title)) {
      updated = liked.filter((title) => title !== event.title);
    } else {
      updated = [...liked, event.title];
    }

    localStorage.setItem("likedCourses", JSON.stringify(updated));
    setIsLiked(!isLiked);
    onLike(event.title);
  };

  if (!event) return null;

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
            <span className="value">{event.price} NOK</span>
          </div>
        </div>

        <div className="modal-description">
          <p>{event.description}</p>
        </div>

        <div className="event-actions">
          <button className="like-btn" onClick={handleLike}>
            {isLiked ? "♥" : "♡"}
          </button>
          <button className="pay-apply-btn" onClick={() => onPay(event)}>
            Pay and Apply
          </button>
        </div>
      </div>
    </div>
  );
}

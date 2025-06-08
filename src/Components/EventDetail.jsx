import React from "react";
import "../Styles/EventDetail.css";

export default function EventDetail({ event, onClose, onPay }) {
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

        <button className="pay-apply-btn" onClick={() => onPay(event)}>
          Pay and Apply
        </button>
      </div>
    </div>
  );
}

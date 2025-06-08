import React, { useState } from "react";
import "../Styles/Home.css";
import { useNavigate } from "react-router-dom";
import EventDetail from "./EventDetail";

export default function Home() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedEvent, setSelectedEvent] = useState(null);
  const navigate = useNavigate();

  const events = [
    {
      id: 1,
      title: "Tech Conference 2025",
      subjectArea: "Technology",
      description: "Explore future trends in tech with industry leaders.",
      participants: 200,
      startDate: "2025-02-15",
      endDate: "2025-02-17",
      price: "Free",
    },
    {
      id: 2,
      title: "Coding Bootcamp",
      subjectArea: "Programming",
      description: "Intensive training in full-stack web development.",
      participants: 150,
      startDate: "2025-02-20",
      endDate: "2025-02-25",
      price: "$199",
    },
    {
      id: 3,
      title: "AI Workshop",
      subjectArea: "Artificial Intelligence",
      description: "Hands-on with machine learning tools and techniques.",
      participants: 100,
      startDate: "2025-02-25",
      endDate: "2025-02-26",
      price: "$99",
    },
  ];

  const handleNavigation = (path) => {
    navigate(path);
  };

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const handleEventClick = (event) => {
    setSelectedEvent(event);
  };

  const handleCloseDetail = () => {
    setSelectedEvent(null);
  };

  // Når "Pay and Apply" klikkes, naviger til /payment
  const handlePay = (event) => {
    // Hvis du vil sende med event, kan du bruke context, state eller query params
    navigate("/payment");
  };

  return (
    <div className="homepage">
      <header className="header">
        <nav className="nav">
          <ul className="nav-links">
            <li><a href="#other">Other</a></li>
            <li><a href="#events">Events</a></li>
            <li>
              <a
                href="#faq"
                onClick={(e) => {
                  e.preventDefault();
                  handleNavigation("/FaqPage");
                }}
              >
                FAQ
              </a>
            </li>
            <li>
              <a
                href="#contact"
                onClick={(e) => {
                  e.preventDefault();
                  handleNavigation("/contact");
                }}
              >
                Contact
              </a>
            </li>
            <li>
              <a
                href="#profile"
                className="profile"
                onClick={(e) => {
                  e.preventDefault();
                  handleNavigation("/profile");
                }}
              >
                Profile
              </a>
            </li>
          </ul>
        </nav>
      </header>

      <div className="hello-message">
        <h1>Hello Student</h1>
      </div>

      <div className="search-container">
        <input
          type="text"
          placeholder="Search events/courses..."
          value={searchQuery}
          onChange={handleSearchChange}
          className="search-bar"
        />
      </div>

      <div className="upcoming-events" id="events">
        <h2>Upcoming Events</h2>
        <div className="event-row">
          {events
            .filter((event) =>
              event.title.toLowerCase().includes(searchQuery.toLowerCase())
            )
            .map((event) => (
              <div
                key={event.id}
                className="event-card"
                onClick={() => handleEventClick(event)}
              >
                <h3>{event.title}</h3>
                <p>{event.startDate}</p>
              </div>
            ))}
        </div>
      </div>

      {/* Event Detail Modal */}
      {selectedEvent && (
        <EventDetail
          event={selectedEvent}
          onClose={handleCloseDetail}
          onPay={handlePay}
        />
      )}
    </div>
  );
}

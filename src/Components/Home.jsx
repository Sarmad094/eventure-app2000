import React, { useState } from "react";
import "../Styles/Home.css";
import { useNavigate } from "react-router-dom";

export default function Home() {
  const [searchQuery, setSearchQuery] = useState("");
  
  const navigate = useNavigate();
  
  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };
  
  const events = [
    { id: 1, title: "Tech Conference 2025", date: "Feb 15, 2025" },
    { id: 2, title: "Coding Bootcamp", date: "Feb 20, 2025" },
    { id: 3, title: "AI Workshop", date: "Feb 25, 2025" },
  ];
  
  const handleEventRegistration = (eventTitle) => {
    alert(`You have registered for ${eventTitle}`);
  };
  
  const handleNavigation = (path) => {
    navigate(path);
  };
  
  return (
    <div className="homepage">
      
      <header className="header">
        <nav className="nav">
          <ul className="nav-links">
            <li><a href="#other">Other</a></li>
            <li><a href="#events">Events</a></li>
            <li><a href="#faq" onClick={(e) => {
              e.preventDefault();
              handleNavigation('/FaqPage');
            }}>FAQ</a></li>
            <li><a href="#contact" onClick={(e) => {
              e.preventDefault();
              handleNavigation('/contact');
            }}>Contact</a></li>
            <li><a href="#profile" className="profile" onClick={(e) => {
              e.preventDefault();
              handleNavigation('/profile');
            }}>Profile</a></li>
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
                onClick={() => handleEventRegistration(event.title)}
              >
                <h3>{event.title}</h3>
                <p>{event.date}</p>
              </div>
            ))}
        </div>
      </div>
    </div>
  );
}

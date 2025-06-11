import React, { useState } from "react";
import "../Styles/Home.css";
import { useNavigate } from "react-router-dom";
import EventDetail from "./EventDetail";

export default function Home() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [filters, setFilters] = useState({
    location: "",
    subjectArea: "",
  });
  const navigate = useNavigate();

  const events = [
    {
      id: 1,
<<<<<<< Updated upstream
      title: "Tech Conference 2025",
      subjectArea: "Technology",
      description: "Explore future trends in tech with industry leaders.",
      participants: 200,
      startDate: "2025-02-15",
      endDate: "2025-02-17",
      price: "Free",
      location: "Lier"
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
      location: "Jevnaker"
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
      location: "Oslo"
=======
      title: "Informatikk Introduksjon",
      subjectArea: "Informatikk",
      location: "Oslo",
      description: "Bli kjent med informatikkens verden.",
      participants: 100,
      startDate: "2025-08-10",
      endDate: "2025-08-12",
      price: "Gratis",
    },
    {
      id: 2,
      title: "Samfunnsfag i Praksis",
      subjectArea: "Samfunnsfag",
      location: "Bergen",
      description: "Lær om samfunn og politikk.",
      participants: 80,
      startDate: "2025-08-15",
      endDate: "2025-08-17",
      price: "$50",
    },
    {
      id: 3,
      title: "Avansert Informatikk",
      subjectArea: "Informatikk",
      location: "Trondheim",
      description: "Dypdykk i datastrukturer og algoritmer.",
      participants: 120,
      startDate: "2025-08-20",
      endDate: "2025-08-23",
      price: "$100",
>>>>>>> Stashed changes
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

  const handlePay = (event) => {
    navigate("/payment");
  };

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const filteredEvents = events.filter((event) => {
    return (
      event.title.toLowerCase().includes(searchQuery.toLowerCase()) &&
      (!filters.location || event.location === filters.location) &&
      (!filters.subjectArea || event.subjectArea === filters.subjectArea)
    );
  });

  return (
    <div className="homepage">
      <header className="header">
        <nav className="nav">
          <ul className="nav-links">
            <li><a href="#other">Other</a></li>
            <li><a href="#events">Events</a></li>
            <li>
              <a href="#faq" onClick={(e) => { e.preventDefault(); handleNavigation("/FaqPage"); }}>
                FAQ
              </a>
            </li>
            <li>
              <a href="#contact" onClick={(e) => { e.preventDefault(); handleNavigation("/contact"); }}>
                Contact
              </a>
            </li>
            <li>
              <a href="#profile" className="profile" onClick={(e) => { e.preventDefault(); handleNavigation("/profile"); }}>
                Profile
              </a>
            </li>
          </ul>
        </nav>
      </header>

      <div className="hello-message">
        <h1>Hello Student</h1>
      </div>

      <div className="search-filter-container">
        <input
          type="text"
          placeholder="Search events/courses..."
          value={searchQuery}
          onChange={handleSearchChange}
          className="search-bar"
        />
        <div className="filters">
          <select name="location" value={filters.location} onChange={handleFilterChange}>
            <option value="">Location</option>
            <option value="Oslo">Oslo</option>
            <option value="Bergen">Bergen</option>
            <option value="Trondheim">Trondheim</option>
          </select>

          <select name="subjectArea" value={filters.subjectArea} onChange={handleFilterChange}>
            <option value="">Field of subject</option>
            <option value="Informatikk">Informatikk</option>
            <option value="Samfunnsfag">Samfunnsfag</option>
          </select>
        </div>
      </div>

      <div className="upcoming-events" id="events">
        <h2 className="centered-title">Upcoming Events</h2>
        <div className="event-row">
          {filteredEvents.map((event) => (
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

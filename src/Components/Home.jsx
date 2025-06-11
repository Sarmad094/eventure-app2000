import React, { useState, useEffect } from "react";
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
  const [events, setEvents] = useState([]);
  const [locations, setLocations] = useState([]);
  const [fields, setFields] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchLocations = async () => {
      try {
        const res = await fetch("http://localhost:8081/api/locations");
        if (!res.ok) throw new Error("Failed to fetch locations");
        const data = await res.json();
        setLocations(data);
      } catch (err) {
        setError(err.message);
      }
    };
    fetchLocations();
  }, []);

  useEffect(() => {
    const fetchFields = async () => {
      try {
        const res = await fetch("http://localhost:8081/api/fields");
        if (!res.ok) throw new Error("Failed to fetch fields");
        const data = await res.json();
        setFields(data);
      } catch (err) {
        setError(err.message);
      }
    };
    fetchFields();
  }, []);

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await fetch("http://localhost:8081/api/events");
        if (!response.ok) throw new Error("Failed to fetch events");
        const data = await response.json();

        const formattedEvents = data.map((ev) => {
          const locationObj = locations.find((loc) => loc.locationId === ev.locationId);
          const fieldObj = fields.find((fld) => fld.fieldId === ev.fieldId);
          return {
            ...ev,
            startDate: ev.startDate ? ev.startDate.slice(0, 10) : "",
            endDate: ev.endDate ? ev.endDate.slice(0, 10) : "",
            location: locationObj ? locationObj.locationName : "Unknown",
            subjectArea: fieldObj ? fieldObj.fieldName : "Unknown",
            price:
              ev.price !== null && ev.price !== undefined
                ? ev.price === 0
                  ? "Free"
                  : ev.price + " NOK"
                : "N/A",
            description: ev.e_description || "",
            participants: ev.participants || 0,
            title: ev.title || "No title",
          };
        });

        setEvents(formattedEvents);
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };

    if (locations.length > 0 && fields.length > 0) {
      fetchEvents();
    }
  }, [locations, fields]);

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

  const handlePay = () => {
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
    const matchesSearch = event.title.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesLocation =
      !filters.location ||
      (event.location && event.location.toLowerCase().includes(filters.location.toLowerCase()));

    const matchesSubjectArea =
      !filters.subjectArea ||
      (event.subjectArea && event.subjectArea.toLowerCase().includes(filters.subjectArea.toLowerCase()));

    return matchesSearch && matchesLocation && matchesSubjectArea;
  });

  if (loading) return <div className="loading">Loading events...</div>;
  if (error) return <div className="error">Error: {error}</div>;

  return (
    <div className="homepage">
      {/* Blå toppmeny */}
      <header className="header">
        <nav>
          <ul className="nav-links">
            <li>
              <a href="#" onClick={() => handleNavigation("/home/1")}>Home</a>
            </li>
            <li>
              <a href="#" onClick={() => handleNavigation("/profile")}>Profile</a>
            </li>
            <li>
              <a href="#" onClick={() => handleNavigation("/contact")}>Contact</a>
            </li>
            <li>
              <a href="#" onClick={() => handleNavigation("/faq")}>FAQ</a>
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
            {locations.map((loc) => (
              <option key={loc.locationId} value={loc.locationName}>
                {loc.locationName}
              </option>
            ))}
          </select>

          <select name="subjectArea" value={filters.subjectArea} onChange={handleFilterChange}>
            <option value="">Field of subject</option>
            {fields.map((fld) => (
              <option key={fld.fieldId} value={fld.fieldName}>
                {fld.fieldName}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="upcoming-events" id="events">
        <h2 className="centered-title">Upcoming Events</h2>
        <div className="event-row">
          {filteredEvents.length === 0 && <p>No events found.</p>}
          {filteredEvents.map((event) => (
            <div
              key={event.eventId}
              className="event-card"
              onClick={() => handleEventClick(event)}
            >
              <h3>{event.title}</h3>
              <p>{event.startDate}</p>
              <p>
                <em>{event.location}</em>
              </p>
              <p>
                <small>{event.subjectArea}</small>
              </p>
            </div>
          ))}
        </div>
      </div>

      {selectedEvent && (
        <EventDetail event={selectedEvent} onClose={handleCloseDetail} onPay={handlePay} />
      )}
    </div>
  );
}

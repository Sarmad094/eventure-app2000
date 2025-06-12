import React, { useEffect, useState } from "react";
import axios from "axios";
import "../Styles/StudentProfile.css";
import { useNavigate } from "react-router-dom";

const StudentProfile = () => {
  const [profile, setProfile] = useState(null);
  const [currentUser, setCurrentUser] = useState(null);
  const [userBookings, setUserBookings] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const userData = sessionStorage.getItem('currentUser');
    if (userData) {
      setCurrentUser(JSON.parse(userData));
    } else {
      navigate('/login/1');
      return;
    }
  }, [navigate]);

  useEffect(() => {
    const fetchData = async () => {
      if (!currentUser) return;

      try {
        const response = await axios.get(`http://localhost:8081/api/students/${currentUser.studentId}`);
        const studentData = response.data;
        
        const bookingsResponse = await axios.get(`http://localhost:8081/api/bookings`);
        const allBookings = bookingsResponse.data;
        
        const userBookings = allBookings.filter(booking => 
          booking.studentId === currentUser.studentId
        );

        const appliedEventsPromises = userBookings.map(async (booking) => {
          try {
            const eventResponse = await axios.get(`http://localhost:8081/api/events/${booking.eventId}`);
            const eventData = eventResponse.data;
            
            let paymentStatus = "Pending";
            try {
              const paymentResponse = await axios.get(`http://localhost:8081/api/payments/book/${booking.bookId}`);
              if (paymentResponse.data) {
                paymentStatus = "Paid";
              }
            } catch (paymentError) {
              console.log("No payment found for booking:", booking.bookId);
            }

            return {
              name: eventData.title || "Unknown Event",
              paymentStatus: paymentStatus,
              bookingDate: booking.bookDate,
              eventDate: eventData.startDate
            };
          } catch (error) {
            console.error("Error fetching event details:", error);
            return {
              name: "Unknown Event",
              paymentStatus: booking.paymentStatus ? "Paid" : "Pending",
              bookingDate: booking.bookDate
            };
          }
        });

        const appliedEvents = await Promise.all(appliedEventsPromises);

        const likedEventsResponse = await axios.get(`http://localhost:8081/api/likedevents/${currentUser.studentId}`);
        const likedEventsData = likedEventsResponse.data;
        
        const likedEventsWithDetails = await Promise.all(
          likedEventsData.map(async (likedEvent) => {
            try {
              const eventResponse = await axios.get(`http://localhost:8081/api/events/${likedEvent.eventId}`);
              return {
                ...likedEvent,
                eventTitle: eventResponse.data.title || "Unknown Event",
                eventDate: eventResponse.data.startDate
              };
            } catch (error) {
              console.error("Error fetching event details for liked event:", error);
              return {
                ...likedEvent,
                eventTitle: "Unknown Event"
              };
            }
          })
        );

        setProfile({
          ...studentData,
          likedEvents: likedEventsWithDetails,
          appliedEvents
        });

        setUserBookings(userBookings);

      } catch (error) {
        console.error("Error fetching profile:", error);
        alert("Could not load profile");
      }
    };

    fetchData();
  }, [currentUser]);

  const handleNavigation = (path) => {
    navigate(path);
  };

  const handleLogout = () => {
    sessionStorage.removeItem("currentUser");
    sessionStorage.removeItem("selectedEvent");
    
    navigate('/login/1');
  };

  if (!currentUser) {
    return <div className="loading">Please log in...</div>;
  }

  if (!profile) {
    return <div className="loading">Loading profile...</div>;
  }

  return (
    <div className="profile-page">
      <header className="header">
        <nav className="nav">
          <ul className="nav-links">
            <li><a href="#home" onClick={(e) => { e.preventDefault(); handleNavigation('/home/1'); }}>Home</a></li>
            <li><a href="#events">Events</a></li>
            <li><a href="#faq" onClick={(e) => { e.preventDefault(); handleNavigation('/faq'); }}>FAQ</a></li>
            <li><a href="#contact" onClick={(e) => { e.preventDefault(); handleNavigation('/contact'); }}>Contact</a></li>
            <li><a href="#profile" className="profile" onClick={(e) => { e.preventDefault(); handleNavigation('/profile'); }}>Profile</a></li>
          </ul>
        </nav>
      </header>

      <div className="hello-message">
        <h1>Hello {profile.name}</h1>
      </div>

      <div className="profile-section">
        <h2>Profile Information</h2>
        <ul className="profile-list">
          <li><strong>Student ID:</strong> {profile.studentId}</li>
          <li><strong>Name:</strong> {profile.name}</li>
          <li><strong>Email:</strong> {profile.email}</li>
          <li><strong>Phone:</strong> {profile.phonenumber || 'Not provided'}</li>
          <li><strong>University:</strong> {profile.university || 'Not provided'}</li>
          <li><strong>Field of Study:</strong> {profile.s_field || 'Not provided'}</li>
        </ul>

        <h2>Liked Events</h2>
        {profile.likedEvents && profile.likedEvents.length > 0 ? (
          <ul className="simple-list">
            {profile.likedEvents.map((likedEvent, i) => (
              <li key={i}>
                <strong>{likedEvent.eventTitle}</strong>
                {likedEvent.eventDate && <small> | Event Date: {likedEvent.eventDate}</small>}
              </li>
            ))}
          </ul>
        ) : (
          <p>No liked events</p>
        )}

        <h2>My Event Bookings & Payment Status</h2>
        {profile.appliedEvents && profile.appliedEvents.length > 0 ? (
          <ul className="simple-list">
            {profile.appliedEvents.map((event, i) => (
              <li key={i}>
                <strong>{event.name}</strong><br/>
                <small>Booked: {event.bookingDate}</small>
                {event.eventDate && <small> | Event Date: {event.eventDate}</small>}<br/>
                Payment Status: {" "}
                <span className={event.paymentStatus === "Paid" ? "paid" : "pending"}>
                  {event.paymentStatus}
                </span>
              </li>
            ))}
          </ul>
        ) : (
          <p>No event bookings yet</p>
        )}

        {/* Logout Button Section */}
        <div className="logout-section">
          <button 
            className="logout-btn"
            onClick={handleLogout}
            type="button"
          >
            Log Out
          </button>
        </div>
      </div>
    </div>
  );
};

export default StudentProfile;
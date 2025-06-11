import React, { useEffect, useState } from "react";
import axios from "axios";
import "../Styles/StudentProfile.css";
import { useNavigate, useParams } from "react-router-dom";

const StudentProfile = () => {
  const [profile, setProfile] = useState(null);
  const navigate = useNavigate();
  const { studentId } = useParams();

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Hent student data
        const studentResponse = await axios.get(`http://localhost:8081/api/students/${studentId}`);
        const studentData = studentResponse.data;
        
        // Hent bookings for studenten
        const bookingsResponse = await axios.get(`http://localhost:8081/api/bookings/student/${studentId}`);
        const bookingsData = bookingsResponse.data;
        
        // Hent liked events for studenten  
        const likedResponse = await axios.get(`http://localhost:8081/api/likedevents/${studentId}`);
        const likedData = likedResponse.data;
        
        // Hent event info for hver booking og liked event
        const bookingsWithEventInfo = await Promise.all(
          bookingsData.map(async (booking) => {
            try {
              const eventResponse = await axios.get(`http://localhost:8081/api/events/${booking.eventId}`);
              return {
                ...booking,
                eventName: eventResponse.data.eventName || `Event ${booking.eventId}`,
                paymentStatus: booking.paymentStatus ? "Paid" : "Unpaid"
              };
            } catch (error) {
              return {
                ...booking,
                eventName: `Event ${booking.eventId}`,
                paymentStatus: booking.paymentStatus ? "Paid" : "Unpaid"
              };
            }
          })
        );
        
        const likedEventsWithInfo = await Promise.all(
          likedData.map(async (liked) => {
            try {
              const eventResponse = await axios.get(`http://localhost:8081/api/events/${liked.eventId}`);
              return {
                ...liked,
                eventName: eventResponse.data.eventName || `Event ${liked.eventId}`
              };
            } catch (error) {
              return {
                ...liked,
                eventName: `Event ${liked.eventId}`
              };
            }
          })
        );

        setProfile({
          ...studentData,
          bookings: bookingsWithEventInfo,
          likedEvents: likedEventsWithInfo
        });
      } catch (error) {
        console.error("Error fetching profile:", error);
        alert("Could not load profile");
      }
    };

    if (studentId) {
      fetchData();
    }
  }, [studentId]);

  const handleNavigation = (path) => {
    navigate(path);
  };

  const handleLogout = () => {
    // Clear any stored user data if needed
    localStorage.removeItem("likedCourses");
    // Navigate to WelcomePage
    navigate('/welcome/1');
  };

  if (!profile) return <div className="loading">Loading...</div>;

  return (
    <div className="profile-page">
      <header className="header">
        <nav className="nav">
          <ul className="nav-links">
            <li><a href="#home" onClick={(e) => { e.preventDefault(); handleNavigation(`/home/${studentId}`); }}>Home</a></li>
            <li><a href="#events">Events</a></li>
            <li><a href="#faq" onClick={(e) => { e.preventDefault(); handleNavigation('/FaqPage'); }}>FAQ</a></li>
            <li><a href="#contact" onClick={(e) => { e.preventDefault(); handleNavigation('/contact'); }}>Contact</a></li>
            <li><a href="#profile" className="profile" onClick={(e) => { e.preventDefault(); handleNavigation(`/profile/${studentId}`); }}>Profile</a></li>
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

        <h2>My Bookings</h2>
        {profile.bookings && profile.bookings.length > 0 ? (
          <ul className="simple-list">
            {profile.bookings.map((booking, i) => (
              <li key={i}>
                {booking.eventName} - 
                <span className={booking.paymentStatus === "Paid" ? "paid" : "pending"}>
                  {booking.paymentStatus}
                </span>
                <span className="booking-date"> (Booked: {booking.bookDate})</span>
              </li>
            ))}
          </ul>
        ) : (
          <p>No bookings yet</p>
        )}

        <h2>Liked Events</h2>
        {profile.likedEvents && profile.likedEvents.length > 0 ? (
          <ul className="simple-list">
            {profile.likedEvents.map((liked, i) => (
              <li key={i}>{liked.eventName}</li>
            ))}
          </ul>
        ) : (
          <p>No liked events</p>
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
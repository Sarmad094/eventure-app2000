import React, { useEffect, useState } from "react";
import axios from "axios";
import "../Styles/StudentProfile.css";
import { useNavigate, useParams } from "react-router-dom";

const StudentProfile = () => {
  const [profile, setProfile] = useState(null);
  const navigate = useNavigate();
  const { studentId } = useParams() || { studentId: "1" }; // Fallback til 1 for testing

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Hent student data fra backend
        const response = await axios.get(`http://localhost:8081/api/students/${studentId}`);
        const studentData = response.data;
        
        // Mock data for liked courses og applied events
        const likedCourses = [
          "JavaScript Bootcamp",
          "AI & Machine Learning Workshop", 
          "Design Thinking Seminar"
        ];
        
        const appliedEvents = [
          { name: "Tech Conference 2025", paymentStatus: "Paid" },
          { name: "Career Fair", paymentStatus: "Pending" },
          { name: "Startup Networking", paymentStatus: "Paid" }
        ];

        setProfile({
          ...studentData,
          likedCourses,
          appliedEvents
        });
      } catch (error) {
        console.error("Error fetching profile:", error);
        alert("Could not load profile");
      }
    };

    if (studentId) {
      fetchData();
    } else {
      // Bruk studentId = 1 som default for testing
      const testStudentId = "1";
      axios.get(`http://localhost:8081/api/students/${testStudentId}`)
        .then(response => {
          const studentData = response.data;
          const likedCourses = [
            "JavaScript Bootcamp",
            "AI & Machine Learning Workshop", 
            "Design Thinking Seminar"
          ];
          const appliedEvents = [
            { name: "Tech Conference 2025", paymentStatus: "Paid" },
            { name: "Career Fair", paymentStatus: "Pending" },
            { name: "Startup Networking", paymentStatus: "Paid" }
          ];
          setProfile({
            ...studentData,
            likedCourses,
            appliedEvents
          });
        })
        .catch(error => {
          console.error("Error:", error);
        });
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

        <h2>Liked Courses</h2>
        {profile.likedCourses.length > 0 ? (
          <ul className="simple-list">
            {profile.likedCourses.map((course, i) => (
              <li key={i}>{course}</li>
            ))}
          </ul>
        ) : (
          <p>No liked courses</p>
        )}

        <h2>Applied Events & Payment Status</h2>
        {profile.appliedEvents.length > 0 ? (
          <ul className="simple-list">
            {profile.appliedEvents.map((event, i) => (
              <li key={i}>
                {event.name} -{" "}
                <span className={event.paymentStatus === "Paid" ? "paid" : "pending"}>
                  {event.paymentStatus}
                </span>
              </li>
            ))}
          </ul>
        ) : (
          <p>No applied events</p>
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
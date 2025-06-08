import React, { useEffect, useState } from "react";
import { getstudentProfile } from "../Services/getStudentProfile";
import "../Styles/StudentProfile.css";
import { useNavigate } from "react-router-dom";

const StudentProfile = () => {
  const [profile, setProfile] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      const data = await getstudentProfile();
      setProfile({
        ...data,
        likedCourses: data.likedCourses || [],
        appliedEvents: data.appliedEvents || [],
      });
    };
    fetchData();
  }, []);

  const handleNavigation = (path) => {
    navigate(path);
  };

  if (!profile) return <div className="loading">Loading...</div>;

  return (
    <div className="profile-page">
      <header className="header">
        <nav className="nav">
          <ul className="nav-links">
            <li><a href="#other" onClick={(e) => { e.preventDefault(); handleNavigation('/home/1'); }}>Home</a></li>
            <li><a href="#events">Events</a></li>
            <li><a href="#faq" onClick={(e) => { e.preventDefault(); handleNavigation('/FaqPage'); }}>FAQ</a></li>
            <li><a href="#contact" onClick={(e) => { e.preventDefault(); handleNavigation('/contact'); }}>Contact</a></li>
            <li><a href="#profile" className="profile" onClick={(e) => { e.preventDefault(); handleNavigation('/profile'); }}>Profile</a></li>
          </ul>
        </nav>
      </header>

      <div className="hello-message">
        <h1>Hello Student</h1>
      </div>

      <div className="profile-section">
        <h2>Profile Information</h2>
        <ul className="profile-list">
          <li><strong>First Name:</strong> {profile.firstName}</li>
          <li><strong>Last Name:</strong> {profile.lastName}</li>
          <li><strong>Age:</strong> {profile.age}</li>
          <li><strong>University:</strong> {profile.university}</li>
          <li><strong>Field of Study:</strong> {profile.fieldOfStudy}</li>
          <li><strong>Phone:</strong> {profile.phone}</li>
          <li><strong>Email:</strong> {profile.email}</li>
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
      </div>
    </div>
  );
};

export default StudentProfile;

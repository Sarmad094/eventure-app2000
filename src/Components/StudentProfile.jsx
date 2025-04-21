import React, { useEffect, useState } from "react";
import { getstudentProfile } from '../Services/getStudentProfile';  
import "../Styles/StudentProfile.css";

const StudentProfile = () => {
  const [profile, setProfile] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      const data = await getstudentProfile();
      setProfile({
        ...data,
        likedCourses: data.likedCourses || [],
        appliedEvents: data.appliedEvents || []
      });
    };
    fetchData();
  }, []);

  if (!profile) {
    return <div className="loading">Loading...</div>;
  }

  return (
    <div className="profile-container">
      <h1 className="profile-header">Student Profile</h1>
      
      <div className="info-section">
        <div className="profile-info">
          <h2 className="section-title">Personal Information</h2>
          <p><strong>First Name:</strong> {profile.firstName}</p>
          <p><strong>Last Name:</strong> {profile.lastName}</p>
          <p><strong>Age:</strong> {profile.age}</p>
          <p><strong>University:</strong> {profile.university}</p>
          <p><strong>Field of Study:</strong> {profile.fieldOfStudy}</p>
          <p><strong>Phone Number:</strong> {profile.phone}</p>
          <p><strong>Email:</strong> {profile.email}</p>
        </div>
      </div>

      <div className="courses-section">
        <h2 className="section-title">Liked Courses</h2>
        <div className="courses-container">
          {profile.likedCourses && profile.likedCourses.length > 0 ? (
            profile.likedCourses.map((course, index) => (
              <div key={index} className="course-box">
                <p>{course}</p>
              </div>
            ))
          ) : (
            <p>No liked courses</p>
          )}
        </div>
      </div>

      <div className="events-section">
        <h2 className="section-title">Applied Events & Payment Status</h2>
        <div className="events-container">
          {profile.appliedEvents && profile.appliedEvents.length > 0 ? (
            profile.appliedEvents.map((event, index) => (
              <div key={index} className="event-box">
                <p>{event.name}</p>
                <div className={`payment-status ${event.paymentStatus === "Paid" ? "paid" : "pending"}`}>
                  {event.paymentStatus === "Paid" ? (
                    <span className="status-dot green"></span>
                  ) : (
                    <span className="status-dot orange"></span>
                  )}
                  <span>{event.paymentStatus}</span>
                </div>
              </div>
            ))
          ) : (
            <p>No applied events</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default StudentProfile;

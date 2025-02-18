// src/Components/Services/getStudentProfile.js
export const getstudentProfile = async () => {
    return {
      firstName: "Ola",
      lastName: "Nordmann",
      age: 23,
      university: "University of Oslo",
      fieldOfStudy: "Computer Science",
      phone: "+47 123 45 678",
      email: "ola.nordmann@example.com",
      likedCourses: ["React Workshop", "AI Conference"],
      appliedEvents: [
        { name: "Hackathon 2025", paymentStatus: "Paid" },
        { name: "Tech Meetup", paymentStatus: "Pending" }
      ]
    };
  };
  
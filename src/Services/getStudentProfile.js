export const getStudentProfile = async () => {
  return {
    firstName: "Ola",
    lastName: "Nordmann",
    age: 23,
    university: "University of Oslo",
    fieldOfStudy: "Computer Science",
    phone: "12345678",
    email: "ola@example.com",
    appliedEvents: [
      { name: "Tech Conference 2025", paymentStatus: "Paid" }
    ]
  };
};

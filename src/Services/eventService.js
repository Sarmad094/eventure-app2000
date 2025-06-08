export const fetchEventById = async (id) => {
  // Simulert tjeneste. I ekte applikasjon kan du bruke axios/fetch fra API.
  const dummyData = [
    {
      id: 1,
      title: "Tech Conference 2025",
      subjectArea: "Technology",
      description: "A major conference on the latest in tech.",
      participants: 250,
      startDate: "2025-02-15",
      endDate: "2025-02-17",
      price: 1200
    },
    // Flere eventer ...
  ];

  return dummyData.find(event => event.id === id);
};

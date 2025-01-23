import React, { createContext, useContext, useState } from 'react';

// Create Event Context
const EventContext = createContext();

// Event Provider Component
export const EventProvider = ({ children }) => {
  const [events, setEvents] = useState([]); // Array of events
  const [bookings, setBookings] = useState([]); // User's bookings

  const addEvent = (event) => {
    setEvents((prev) => [...prev, event]);
  };

  const bookEvent = (eventId) => {
    setBookings((prev) => [...prev, eventId]);
  };

  return (
    <EventContext.Provider value={{ events, bookings, addEvent, bookEvent }}>
      {children}
    </EventContext.Provider>
  );
};

// Custom Hook for accessing event context
export const useEvent = () => {
  const context = useContext(EventContext);
  if (!context) {
    throw new Error('useEvent must be used within an EventProvider');
  }
  return context;
};

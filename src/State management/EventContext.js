import React, { createContext, useContext, useState } from 'react';

const EventContext = createContext();

export const EventProvider = ({ children }) => {
  const [events, setEvents] = useState([]); 
  const [bookings, setBookings] = useState([]); 

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

export const useEvent = () => {
  const context = useContext(EventContext);
  if (!context) {
    throw new Error('useEvent must be used within an EventProvider');
  }
  return context;
};

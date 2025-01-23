import React, { createContext, useContext, useState } from 'react';

// Create User Context
const UserContext = createContext();

// User Provider Component
const UserProvider = ({ children }) => {
  const [userRole, setUserRole] = useState(null); // 'student' or 'company'
  const [isLoggedIn, setIsLoggedIn] = useState(false); // Login status

  const login = (role) => {
    setUserRole(role);
    setIsLoggedIn(true);
  };

  const logout = () => {
    setUserRole(null);
    setIsLoggedIn(false);
  };

  return (
    <UserContext.Provider value={{ userRole, isLoggedIn, login, logout }}>
      {children}
    </UserContext.Provider>
  );
};

// Custom Hook for accessing user context
const useUser = () => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error('useUser must be used within a UserProvider');
  }
  return context;
};

export default UserProvider;
export { useUser };

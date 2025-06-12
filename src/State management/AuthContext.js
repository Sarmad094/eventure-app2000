import React, { createContext, useContext, useState, useEffect } from 'react';

// Create AuthContext
const AuthContext = createContext();

// AuthProvider Component
const AuthProvider = ({ children }) => {
  const [user, setUser] = useState({
    isAuthenticated: false,
    organizationId: null,
    organizationName: null,
    email: null
  });

  // Load user data from localStorage on app start
  useEffect(() => {
    const savedUser = localStorage.getItem('userAuth');
    if (savedUser) {
      try {
        const userData = JSON.parse(savedUser);
        setUser(userData);
      } catch (error) {
        console.error('Error loading saved user data:', error);
        localStorage.removeItem('userAuth');
      }
    }
  }, []);

  const login = (userData) => {
    const newUser = {
      isAuthenticated: true,
      organizationId: userData.organizationId || userData.orgId,
      organizationName: userData.organizationName || userData.orgName,
      email: userData.email
    };
    
    setUser(newUser);
    // Save to localStorage for persistence
    localStorage.setItem('userAuth', JSON.stringify(newUser));
  };

  const logout = () => {
    setUser({
      isAuthenticated: false,
      organizationId: null,
      organizationName: null,
      email: null
    });
    localStorage.removeItem('userAuth');
  };

  // For backward compatibility, also provide isAuthenticated directly
  const contextValue = {
    ...user,
    isAuthenticated: user.isAuthenticated,
    login,
    logout
  };

  return (
    <AuthContext.Provider value={contextValue}>
      {children}
    </AuthContext.Provider>
  );
};

// Custom Hook for AuthContext
const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export default AuthProvider;
export { useAuth };
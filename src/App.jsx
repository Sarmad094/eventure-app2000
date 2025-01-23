import React from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import AuthProvider from './State management/AuthContext';  
import UserProvider from './State management/UserContext';  
import { EventProvider } from './State management/EventContext';  
import HomePage from './Components/Home';  
import Welcome from './Components/Welcome';  
import Login from './Components/Login';  
import Profile from './Components/Profile';  
import './Styles/Login.css'; // Import the CSS file



const App = () => {
  return (
    <Router>
      <AuthProvider>
        <UserProvider>
          <EventProvider>
            <div>
              <nav>
                <ul>
                  <li><Link to="/home/1">Home</Link></li>
                  <li><Link to="/welcome/1">Welcome</Link></li>
                  <li><Link to="/login/1">Login</Link></li>
                  <li><Link to="/profile/1">Profile</Link></li>
                  <li><Link to="/cuser/1">Create user</Link></li>
                  
                </ul>
              </nav>

              <Routes>
                <Route path="/home/:id" element={<HomePage />} />
                <Route path="/welcome/:id" element={<Welcome />} />
                <Route path="/login/:id" element={<Login />} />
                <Route path="/profile/:id" element={<Profile />} />
              </Routes>
            </div>
          </EventProvider>
        </UserProvider>
      </AuthProvider>
    </Router>
  );
};

export default App;

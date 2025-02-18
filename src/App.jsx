// src/App.jsx
import React from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import AuthProvider from './State management/AuthContext';
import UserProvider from './State management/UserContext';
import { EventProvider } from './State management/EventContext';
import Home from './Components/Home';
import Login from './Components/Login';
import CreateUser from './Components/CreateUser';
import WelcomePage from './Components/WelcomePage';
import StudentProfile from './Components/StudentProfile';
import './Styles/StudentProfile.css';
import './Styles/Login.css';
import './Styles/CreateUser.css';
import './Styles/WelcomePage.css';
import './Styles/Home.css';

const App = () => {
  return (
    <Router>
      <AuthProvider>
        <UserProvider>
          <EventProvider>
            <div>
              <nav>
                <ul>
                  <li><Link to="/welcome/1">Welcome</Link></li>
                  <li><Link to="/home/1">Home</Link></li>
                  <li><Link to="/login/1">Login</Link></li>
                  <li><Link to="/profile">Profile</Link></li>
                  <li><Link to="/cuser">Create User</Link></li>
                </ul>
              </nav>

              <Routes>
                <Route path="/welcome/:id" element={<WelcomePage />} />
                <Route path="/home/:id" element={<Home />} />
                <Route path="/login/:id" element={<Login />} />
                <Route path="/profile" element={<StudentProfile />} /> {/* Korrekt import */}
                <Route path="/cuser" element={<CreateUser />} />
              </Routes>
            </div>
          </EventProvider>
        </UserProvider>
      </AuthProvider>
    </Router>
  );
};

export default App;

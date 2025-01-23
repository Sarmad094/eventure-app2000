import React from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import Welcome from './Components/Welcome';
import Login from './Components/Login';
import Home from './Components/Home';
import Profile from './Components/Profile';

const App = () => {
  return (
    <Router>
      <div>
        <nav>
          <ul>
            <li><Link to="/home/1">Home</Link></li>
            <li><Link to="/welcome/1">Welcome</Link></li>
            <li><Link to="/login/1">Login</Link></li>
            <li><Link to="/profile/1">Profile</Link></li>
          </ul>
        </nav>

        <Routes>
          <Route path="/home/:id" element={<Home />} />
          <Route path="/welcome/:id" element={<Welcome />} />
          <Route path="/login/:id" element={<Login />} />
          <Route path="/profile/:id" element={<Profile />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;

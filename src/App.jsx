import React from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import UserProfile from './Components/UserProfile'; // Importerer UserProfile fra en ekstern fil

const App = () => {
  return (
    <Router>
      <div>
        <nav>
          <ul>
            <li><Link to="/">Home</Link></li>
            <li><Link to="/user/1">User 1</Link></li>
            <li><Link to="/user/2">User 2</Link></li>
          </ul>
        </nav>

        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/user/:id" element={<UserProfile />} />
        </Routes>
      </div>
    </Router>
  );
};

const Home = () => <h1>Home Page</h1>; // Holder Home-komponenten lokalt

export default App;

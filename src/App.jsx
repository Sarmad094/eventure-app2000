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

<<<<<<< HEAD:src/App.jsx
=======
const UserProfile = () => {
  // We'll implement this component next
};

>>>>>>> 3e050958db41868817147732ee1d16ae1e85af89:src/App.js
export default App;

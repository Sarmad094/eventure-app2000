
<<<<<<< HEAD

// src/App.jsx
// hanjii

=======
>>>>>>> 1e468ee02c643e79dffbc49e2fda2855eb946bc3
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
import OrganizationHome from './Components/OrganizationHome';
import OrgLoginPage from './Components/OrgLoginPage'; // ✅ default import
import CreateOrganization from './Components/CreateOrganization';
import './Styles/CreateOrganization.css';
import './Styles/StudentProfile.css';
import './Styles/Login.css';
import './Styles/CreateUser.css';
import './Styles/WelcomePage.css';
import './Styles/Home.css';
import './Styles/OrganizationHome.css';
import './Styles/OrgLoginPage.css';

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
                  <li><Link to="/comphome">Company Home</Link></li>
                  <li><Link to="/orglogin">Company Login</Link></li>
                  <li><Link to="/corganization">Create organization account</Link></li>
                </ul>
              </nav>

              <Routes>
                <Route path="/welcome/:id" element={<WelcomePage />} />
                <Route path="/home/:id" element={<Home />} />
                <Route path="/login/:id" element={<Login />} />
                <Route path="/profile" element={<StudentProfile />} />
                <Route path="/cuser" element={<CreateUser />} />
                <Route path="/comphome" element={<OrganizationHome />} />
                <Route path="/orglogin" element={<OrgLoginPage />} />
                <Route path="/corganization" element={<CreateOrganization />} />
              </Routes>
            </div>
          </EventProvider>
        </UserProvider>
      </AuthProvider>
    </Router>
  );
};

export default App;

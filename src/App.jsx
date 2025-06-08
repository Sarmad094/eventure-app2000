import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes, Link, Navigate, useNavigate } from 'react-router-dom';
import AuthProvider from './State management/AuthContext';
import UserProvider from './State management/UserContext';
import { EventProvider } from './State management/EventContext';
import Home from './Components/Home';
import Login from './Components/Login';
import CreateUser from './Components/CreateUser';
import WelcomePage from './Components/WelcomePage';
import StudentProfile from './Components/StudentProfile';
import OrganizationHome from './Components/OrganizationHome';
import OrgLoginPage from './Components/OrgLoginPage';
import CreateOrganization from './Components/CreateOrganization';
import FaqPage from './Components/FaqPage';
import Contact from './Components/Contact';
import StudentConfirm from './StudentConfirm';
import PaymentPage from './Components/PaymentPage';
import OrganizationPublish from './Components/OrganizationPublish';

import './Styles/StudentConfirm.css';
import './Styles/CreateOrganization.css';
import './Styles/StudentProfile.css';
import './Styles/Login.css';
import './Styles/CreateUser.css';
import './Styles/WelcomePage.css';
import './Styles/Home.css';
import './Styles/OrganizationHome.css';
import './Styles/OrgLoginPage.css';
import './Styles/FaqPage.css';
import './Styles/Contact.css';
import OrganizationWelcome from './Components/OrganizationWelcome';

// Organization Contact Component
const OrganizationContact = () => {
  const navigate = useNavigate();
  const [showStatistics, setShowStatistics] = useState(false);
  
  return (
    <Contact 
      isOrganization={true}
      showStatistics={showStatistics}
      setShowStatistics={setShowStatistics}
      onNavigate={(action) => {
        if (action === 'home') {
          navigate('/comphome', { state: { showStatistics: false } });
        }
        if (action === 'statistics') {
          navigate('/comphome', { state: { showStatistics: true } });
        }
        if (action.startsWith('/')) {
          navigate(action);
        }
      }} 
    />
  );
};

// Organization FAQ Component
const OrganizationFaq = () => {
  const navigate = useNavigate();
  const [showStatistics, setShowStatistics] = useState(false);
  
  return (
    <FaqPage 
      isOrganization={true}
      showStatistics={showStatistics}
      onNavigate={(action) => {
        if (action === 'home') {
          navigate('/comphome', { state: { showStatistics: false } });
        }
        if (action === 'statistics') {
          navigate('/comphome', { state: { showStatistics: true } });
        }
        if (action === '/organization-contact') {
          navigate('/organization-contact');
        }
        if (action.startsWith('/')) {
          navigate(action);
        }
      }} 
    />
  );
};

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
                  <li><Link to="/organization-faq">Organization FAQ</Link></li>
                  <li><Link to="/contact">Contact</Link></li>
                  <li><Link to="/organization-contact">Organization Contact</Link></li>
                  <li><Link to="/studentconfirm">Student confirm</Link></li>
                  <li><Link to="/OrganizationWelcome">Welcome organization </Link></li>
                  <li><Link to="/OrganizationPublish">Publish page</Link></li>
                  <li><Link to="/Payment">Payment Page </Link></li>
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
                <Route path="/FaqPage" element={<FaqPage />} />
                <Route path="/organization-faq" element={<OrganizationFaq />} />
                <Route path="/contact" element={<Contact />} />
                <Route path="/organization-contact" element={<OrganizationContact />} />
                <Route path="/" element={<Navigate to="Welcome/1" replace />} />
                <Route path="/studentconfirm" element={<StudentConfirm />} />
                <Route path="/OrganizationWelcome" element={<OrganizationWelcome />} />
                <Route path="/OrganizationPublish" element={<OrganizationPublish />} />
                <Route path="/payment" element={<PaymentPage />} />
               </Routes>
            </div>
          </EventProvider>
        </UserProvider>
      </AuthProvider>
    </Router>
  );
};

export default App;
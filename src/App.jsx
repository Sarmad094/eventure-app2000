import React from 'react';
import { BrowserRouter as Router, Route, Routes, Link, Navigate } from 'react-router-dom';
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
import StudentConfirm from './Components/StudentConfirm';
import PaymentPage from './Components/PaymentPage';
import OrganizationPublish from './Components/OrganizationPublish';
import Statistics from './Components/Statistics';
import OrganizationLayout from './Components/OrganizationLayout';


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
import './Styles/Statistics.css';

// Organization wrapper components
const OrganizationContact = () => (
  <OrganizationLayout currentPage="contact">
    <div className="contact-container">
      <div className="contact-card">
        <h2 className="contact-title">Contact Us</h2>
        <div className="contact-info">
          <div className="contact-item">
            <span className="contact-label">Telephone:</span>
            <span className="contact-value">12345678</span>
          </div>
          <div className="contact-item">
            <span className="contact-label">Email:</span>
            <span className="contact-value">Eventure@gmail.com</span>
          </div>
        </div>
        <p className="contact-response-time">We will get to you in 24 hours.</p>
      </div>
    </div>
  </OrganizationLayout>
);

const OrganizationFaq = () => (
  <OrganizationLayout currentPage="faq">
    <FaqPage isOrganization={true} />
  </OrganizationLayout>
);

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
                
                  <li><Link to="/OrganizationPublish">Publish page</Link></li>
                  <li><Link to="/Payment">Payment Page </Link></li>
                  <li><Link to="/statistics">Statistics</Link></li>
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
                <Route path="/faq" element={<FaqPage />} />
                <Route path="/contact" element={<Contact />} />
                <Route path="/organization-contact" element={<OrganizationContact />} />
                <Route path="/" element={<Navigate to="Welcome/1" replace />} />
                <Route path="/studentconfirm" element={<StudentConfirm />} />
            
                <Route path="/OrganizationPublish" element={<OrganizationPublish />} />
                <Route path="/payment" element={<PaymentPage />} />
                <Route path="/statistics" element={<Statistics />} />
               </Routes>
            </div>
          </EventProvider>
        </UserProvider>
      </AuthProvider>
    </Router>
  );
};

export default App;
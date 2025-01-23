import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import '../Styles/Login.css';


const Login = () => {
  const { id } = useParams(); // Hent ID fra URL-en
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });

  // Simulere data basert på ID-en
  const loginData = {
    1: { data: '' },
    2: { data: '' },
    3: { data: '' }
  };

  const user = loginData[id];

  // Håndter endringer i inputfeltene
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  // Håndter innsending av skjemaet
  const handleSubmit = (e) => {
    e.preventDefault();
    // Legg til logikk for innsending av skjema her
    console.log('Form submitted:', formData);
  };

  return (
    <div className="container">
      <div className="login-container">
        <h1>Login</h1>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="email" className="label">Email</label>
            <input
              type="email"
              id="email"
              name="email"
              placeholder="Enter your email"
              value={formData.email}
              onChange={handleChange}
              className="input"
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="password" className="label">Password</label>
            <input
              type="password"
              id="password"
              name="password"
              placeholder="Enter your password"
              value={formData.password}
              onChange={handleChange}
              className="input"
              required
            />
          </div>
          <div className="form-group">
            <button type="submit" className="button">Login</button>
          </div>
        </form>
        
        <div className="form-footer">
          <p>Don't have an account? <a href="/register" className="link">Register here</a></p>
        </div>

        {/* Dynamisk visning av data basert på ID */}
        <div className="user-data">
          <p>Login page ID: {id}</p>
          <p>Username: {user ? user.data : 'Not found'}</p>
          <p>Password: {user ? user.data : 'Not found'}</p>
          <p>Create new user: {user ? user.data : 'Not found'}</p>
        </div>
      </div>
    </div>
  );
};

export default Login;

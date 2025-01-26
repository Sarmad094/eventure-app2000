import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import '../Styles/Login.css';

<<<<<<< HEAD
=======

const mockUsers = {
  "sarmad@usn.no": { id: 1, password: "sarmad" },
  "zaurbek@usn.no": { id: 2, password: "zaurbek" }
};


>>>>>>> e717dfe55bf79b5c1db7afdea5d2af407bfa77e6
const Login = () => {
  const { id } = useParams(); // Hent ID fra URL-en
  const navigate = useNavigate(); // Hook for navigasjon
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
  };

  const handleRegister = () => {
    navigate(`/cuser/${id}`); // Naviger til CreateUser-siden med ID
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
          <p>
            Don't have an account?{' '}
            <button onClick={handleRegister} className="link-button">
              Register here
            </button>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;

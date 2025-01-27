import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../Styles/Login.css';

const Login = () => {
  const navigate = useNavigate();
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

    // Hent lagrede brukerdata fra localStorage
    const storedUser = JSON.parse(localStorage.getItem('user'));

    // Sjekk om de lagrede dataene matcher det brukeren har skrevet inn
    if (storedUser && formData.email === storedUser.email && formData.password === storedUser.password) {
      navigate(`/home/1`); // Naviger til Home med ID 1
    } else {
      alert('Invalid credentials');
    }
  };

  const handleRegister = () => {
    navigate('/cuser'); // Naviger til CreateUser-siden
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

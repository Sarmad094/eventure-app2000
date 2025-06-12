import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import '../Styles/Login.css';

const Login = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const response = await axios.post('http://localhost:8081/api/students/login', {
        email: formData.email,
        password: formData.password
      });

      console.log('Login successful:', response.data);
      sessionStorage.setItem('currentUser', JSON.stringify(response.data));
      navigate('/home/1');
    } catch (error) {
      console.error('Login error:', error);
      if (error.response?.status === 401) {
        setError('Invalid email or password');
      } else {
        setError('Login failed. Please try again.');
      }
    } finally {
      setLoading(false);
    }
  };

  const handleBackToWelcome = () => {
    navigate('/');
  };

  return (
    <div className="center-content">
      <div className="login-container card">
        <h1>Login</h1>

        {error && (
          <div className="error-message" style={{ color: 'red', marginBottom: '1rem' }}>
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Enter your email"
              required
              disabled={loading}
            />
          </div>

          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="Enter your password"
              required
              disabled={loading}
            />
          </div>

          <div className="form-group">
            <button type="submit" disabled={loading}>
              {loading ? 'Logging in...' : 'Login'}
            </button>
          </div>
        </form>

        <div className="form-footer">
          <p>Don't have an account? <a href="/cuser">Register here</a></p>
          <div style={{ display: 'flex', justifyContent: 'center', marginTop: '1rem' }}>
            <button 
              onClick={handleBackToWelcome} 
              className="custom-button"
              disabled={loading}
            >
              ← Back to Welcome
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;

import React from 'react';
import { useNavigate } from 'react-router-dom';

const StudentConfirm = () => {
  const navigate = useNavigate();

  const handleHomeClick = () => {
    navigate('/home/1'); // Navigerer til Home-siden med ID 1
  };

  return (
    <div style={{ padding: '20px' }}>
      <h1 style={{ color: '#238aff' }}>
        You have now booked this event! You will get an email from the company soon.
      </h1>
      <button
        type="button"
        onClick={handleHomeClick}
        style={{
          backgroundColor: '#238aff',
          color: 'white',
          padding: '10px 20px',
          border: 'none',
          borderRadius: '5px',
          marginTop: '20px',
          cursor: 'pointer',
        }}
      >
        Home
      </button>
    </div>
  );
};

export default StudentConfirm;

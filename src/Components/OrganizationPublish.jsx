import React from 'react';
import { useNavigate } from 'react-router-dom';

const OrganizationPublish = () => {
  const navigate = useNavigate();

  const handleOrganizationHomeClick = () => {
    navigate('/OrganizationHome'); // Navigerer til Home-siden med ID 1
  };

  return (
    <div style={{ padding: '20px' }}>
      <h1 style={{ color: 'blue' }}>
        You have now published this event. Students can now join your event.
      </h1>
      <button
        type="button"
        onClick={handleOrganizationHomeClick}
        style={{
          backgroundColor: 'blue',
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

export default OrganizationPublish;

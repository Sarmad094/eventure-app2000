import React from 'react';
import { useParams } from 'react-router-dom';

const Welcome = () => {
  const { id } = useParams();
  
  // In a real application, you might fetch user data based on this ID
  const welcomeElements = {
    1: { element: 'Student' },
    2: { element: 'Company/Organization' }
  };

  const elements = welcomeElements[id];

  return (
    <div>
      <h1>Welcome! Choose what fits your position:</h1>
      <p>ID: {id}</p>
      <p>Name: {elements ? elements.element : 'Not found'}</p>
    </div>
  );
};

export default Welcome;

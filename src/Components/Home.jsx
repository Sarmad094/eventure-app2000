import React from 'react';
import { useParams } from 'react-router-dom';

const Home = () => {
  const { id } = useParams();
  
  // Simulated user data
  const userData = {
    1: { name: 'Alice', email: 'alice@example.com' },
    2: { name: 'Bob', email: 'bob@example.com' }
  };

  const user = userData[id];

  return (
    <div>
      <h1>Welcome to the Homepage!</h1>
      <p>ID: {id}</p>
      {user ? (
        <>
          <p>Hello, {user.name}!</p>
          <p>This is the homepage where you can explore the services, upcoming events, and resources. We offer courses, events, and various information sites for you!</p>
          <p>Email: {user.email}</p>
        </>
      ) : (
        <p>User not found. Please try with a valid ID.</p>
      )}
    </div>
  );
};

export default Home;

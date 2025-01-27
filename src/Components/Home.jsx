import React from 'react';
import { useParams } from 'react-router-dom';

const Home = () => {
  const { id } = useParams();

  // Hent lagret bruker fra localStorage
  const storedUser = JSON.parse(localStorage.getItem('user'));

  return (
    <div>
      <h1>Welcome to the Homepage!</h1>
      <p>ID: {id}</p>
      {storedUser ? (
        <>
          <p>Hello, {storedUser.email}!</p>
          <p>This is the homepage where you can explore the services, upcoming events, and resources.</p>
        </>
      ) : (
        <p>User not found. Please try with a valid ID.</p>
      )}
    </div>
  );
};

export default Home;

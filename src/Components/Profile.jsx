import React from 'react';
import { useParams } from 'react-router-dom';

const Profile = () => {
  const { id } = useParams();
  
  // In a real application, you might fetch user data based on this ID
  const userData = {
    1: { name: 'Alice', email: 'alice@example.com' },
    2: { name: 'Bob', email: 'bob@example.com' }
  };

  const user = userData[id];

  return (
    <div>
      <h1>User Profile</h1>
      <p>ID: {id}</p>
      {user ? (
        <>
          <p>Name: {user.name}</p>
          <p>Email: {user.email}</p>
        </>
      ) : (
        <p>User not found</p>
      )}
    </div>
  );
};

export default Profile;

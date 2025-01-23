import React from 'react';
import { useParams } from 'react-router-dom';

const UserProfile = () => {
  const { id } = useParams();
  
  // In a real application, you might fetch user data based on this ID
  const userData = {
    1: { name: 'Alice', email: 'alice@example.com' },
    2: { name: 'Bob', email: 'bob@example.com' }
  };

  const user = userData[id];

  if (!user) {
    return <h1>User not found</h1>;
  }

  return (
    <div>
      <h1>User Profile</h1>
      <p>ID: {id}</p>
      <p>Name: {user.name}</p>
      <p>Email: {user.email}</p>
    </div>
  );
};

export default UserProfile;
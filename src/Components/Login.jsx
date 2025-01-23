import React from 'react';
import { useParams } from 'react-router-dom';

const Login = () => {
  const { id } = useParams();
  
  // In a real application, you might fetch user data based on this ID
  const loginData = {
    1: { data: 'Username' },
    2: { data: 'Password' },
    3: { data: 'Create new user' }
  };

  const user = loginData[id];

  return (
    <div>
      <h1>Login: Enter username and password to log in. Or create a new account</h1>
      <p>ID: {id}</p>
      <p>Username: {user ? user.data : 'Not found'}</p>
      <p>Password: {user ? user.data : 'Not found'}</p>
      <p>Create new user: {user ? user.data : 'Not found'}</p>
    </div>
  );
};

export default Login;

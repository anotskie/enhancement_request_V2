// Login.jsx
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom'; // Import useNavigate
import ApiService from '../API/userAPI';

function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate(); // Use useNavigate for navigation

  const handleLogin = async () => {
    try {
      const accessToken = await ApiService.login(username, password);
      const user_id = localStorage.getItem('user_id'); // Retrieve the user ID from local storage
  
      localStorage.setItem('access_token', accessToken);
      localStorage.setItem('user_id', user_id);
  
      console.log('Logged in successfully with access token:', accessToken);
      console.log('User ID:', user_id);
  
      // Redirect to the /test page after successful login
      navigate('/test');
    } catch (error) {
      console.error('Login error:', error);
    }
  };
  
  return (
    <div>
      <h2>Login</h2>
      <div>
        <label>
          Username:
          <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} />
        </label>
      </div>
      <div>
        <label>
          Password:
          <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
        </label>
      </div>
      <button onClick={handleLogin}>Login</button>
      <p>
        Don't have an account? <Link to="/register">Register</Link>
      </p>
    </div>
  );
}

export default Login;

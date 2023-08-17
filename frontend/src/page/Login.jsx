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
      localStorage.setItem('access_token', accessToken);
      console.log('Logged in successfully with access token:', accessToken);

      // Redirect to the /test page after successful login
      navigate('/test'); // Use navigate instead of history.push
    } catch (error) {
      console.error('Login error:', error);
      // Handle login error, show error message, etc.
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

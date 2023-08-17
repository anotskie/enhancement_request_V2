import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import ApiService from '../API/userAPI'; // Import the ApiService you created

function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async () => {
    try {
      const accessToken = await ApiService.login(username, password);
      // Store the access token in local storage or context for future API requests
      console.log('Logged in successfully with access token:', accessToken);
      // Redirect or perform other actions after successful login
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

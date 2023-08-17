import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import ApiService from '../API/userAPI'; // Import the ApiService you created

function Register() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');

  const handleRegister = async () => {
    try {
      await ApiService.register(username, password, email);
      // Registration successful, you can redirect to the login page or show a success message
      console.log('Registration successful');
    } catch (error) {
      console.error('Registration error:', error);
      // Handle registration error, show error message, etc.
    }
  };

  return (
    <div>
      <h2>Register</h2>
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
      <div>
        <label>
          Email:
          <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
        </label>
      </div>
      <button onClick={handleRegister}>Register</button>
      <p>
        Already have an account? <Link to="/">Login</Link>
      </p>
    </div>
  );
}

export default Register;

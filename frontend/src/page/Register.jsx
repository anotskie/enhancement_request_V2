import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import ApiService from '../API/userAPI';
import { Card } from 'react-bootstrap';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';

function Register() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [email, setEmail] = useState('');

  const handleRegister = async () => {
    try {
      await ApiService.register(username, password, email);
      console.log('Registration successful');
    } catch (error) {

      if (error.response && error.response.status === 400) {
        setErrorMessage('Please input the required fields.');
      } 
      
      else if (statusCode === 401) {
        setErrorMessage('Invalid username or password.');
      }
      
      else {
        setErrorMessage('An error occurred while logging in. Please try again later.');
      }

      console.error('Registration error:', error);
    }
  };

  return (
    <div className="d-flex justify-content-center align-items-center" style={{ minHeight: "100vh", background: "linear-gradient(to bottom, midnightblue, skyblue)"  }}>
      <Card className="p-3" style={{ backgroundColor: "#FFF", width: "30rem" }}>
      <h2>Register</h2>

      <Form>

      <Form.Group className="mb-3" controlId="formBasicPassowrd">
        <Form.Label style={{width:"25rem"}}>
          Username:
        </Form.Label>
        <Form.Control type="text" value={username} onChange={(e) => setUsername(e.target.value)} />
      </Form.Group>

      <Form.Group className="mb-3" controlId="formBasicPassowrd">
        <Form.Label style={{width:"25rem"}}>
          Password:
        </Form.Label>
        <Form.Control type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
      </Form.Group>


      <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Label style={{width:"25rem"}}>
          Email:
        </Form.Label>
        <Form.Control type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
      </Form.Group>
  
      {errorMessage && <p className="text-danger">{errorMessage}</p>}

      <Button onClick={handleRegister}>Register</Button>
      <p>
        Already have an account? <Link to="/">Login</Link>
      </p>

      </Form>
    </Card>
    </div>
  );
}

export default Register;

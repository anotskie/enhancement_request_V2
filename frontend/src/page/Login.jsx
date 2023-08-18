import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import ApiService from '../API/userAPI';
import { Card } from 'react-bootstrap';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';

function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate();
  const [validated, setValidated] = useState(false);

  const handleLogin = async () => {


    try {



      const accessToken = await ApiService.login(username, password);
      const user_id = localStorage.getItem('user_id');
      const name = localStorage.getItem('name');
      localStorage.setItem('access_token', accessToken);
      localStorage.setItem('user_id', user_id);
      localStorage.setItem('name', username);
  
      console.log('Logged in successfully with access token:', accessToken);
      console.log('User ID:', user_id);
      console.log('Name:', username);

      navigate('/home');
    } catch (error) {

      if (error.response && error.response.status === 401) {
        setErrorMessage('Invalid username or password.');
      } 
      
      else if (error.response && error.response.status === 400) {
        setErrorMessage('Please input the required fields.');
      } 

      else {
        setErrorMessage('An error occurred while logging in. Please try again later.');
      }

      console.error('Login error:', error);
    }
  };
  
  return (
    <div className="d-flex justify-content-center align-items-center" style={{ minHeight: "100vh", background: "linear-gradient(to bottom, midnightblue, skyblue)"  }}>
      <Card className="p-3" style={{ backgroundColor: "#FFF", width: "30rem" }}>
      <h2>Login</h2>

      <Form>

      <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Label style={{width:"25rem"}}>
          Username:
        </Form.Label>
        <Form.Control type="text" value={username} onChange={(e) => setUsername(e.target.value)} />
      </Form.Group>


      <Form.Group className="mb-3" controlId="formBasicPassword">
        <Form.Label style={{width:"25rem"}}>
          Password:
         
        </Form.Label>
        <Form.Control type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
      </Form.Group>

      {errorMessage && <p className="text-danger">{errorMessage}</p>}
      
      <Button onClick={handleLogin}>Login</Button>

          <p>
            Don't have an account? <Link to="/register">Register</Link>
          </p>

      </Form>

      </Card>
    </div>
  );
}

export default Login;

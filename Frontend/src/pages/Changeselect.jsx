import React, { useState } from 'react';
import './Changeselect.css';
import axios from 'axios';
import { FloatingLabel, Form, Button, Button as RBButton } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';

export default function Changeselect() {
  const [userName, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:5000/signin', {
        userName,
        password
      });

      // Check if the response status is 2xx (success)
      if (response.status >= 200 && response.status < 300) {
        navigate('/Changepassword');
      } else {
        console.error('Authentication failed');
      }

    } catch (error) {
      // Handle the case where the response status is not in the 2xx range
      if (error.response) {
        console.error('Authentication failed:', error.response.status);
      } else {
        console.error('Error:', error);
      }
    }
  };

  return (
    <div className='changepro'>
      <div className='changeselect'>
        <Link to="/Edit" style={{ marginLeft: '80%', marginBottom: '30px' }}>
          <RBButton variant="dark">Back</RBButton>
        </Link>
        <Form onSubmit={handleSubmit}>
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>Email address</Form.Label>
            <Form.Control type="text" placeholder="Enter username" value={userName} onChange={(e) => setUsername(e.target.value)} />
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Label>Password</Form.Label>
            <Form.Control type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
          </Form.Group>
          <Button variant="dark" type='submit'>
            Change password
          </Button>
        </Form>
      </div>
    </div>
  );
}

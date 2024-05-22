import React, { useState } from 'react';
import './Signin.css';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Leftcomponent from './Leftcomponent';
import Button from 'react-bootstrap/Button';

const Signin = () => {
  const [userName, setUserName] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:5000/signin', {
        userName,
        password
      });

      // Extract the token from the response
      const token = response.data.token;
      // Store the token in local storage
      localStorage.setItem('token', token);
      localStorage.setItem('jobPosition', response.data.jobPosition);
      localStorage.setItem('firstName', response.data.firstName);
      localStorage.setItem('userID', response.data.userID);

      // Navigate to appropriate page based on job position
      switch (response.data.jobPosition) {
        case 'owner':
          navigate('/owner/Addusers');
          break;
        case 'stock manager':
          navigate('/stockmanager/Addquantity');
          break;
        case 'sales representative':
          navigate('/salesrep/Placeshoporders');
          break;
        default:
          // Handle other job positions or scenarios
          break;
      }
    } catch (error) {
      console.error('Error authenticating user:', error.response.data.error);
      setErrorMessage('Invalid username or password');
    }
  };

  return (
    <div className='App1'>
      <div className='left-component'>
        <Leftcomponent />
      </div>
      <div className='right-component'>
        <div className='signin-container'>
        <h2 style={{ fontSize: '80px', color: 'black',fontFamily: 'cursive', fontStyle: 'bold', paddingTop: '150px'}}>Sign In</h2>
        <form onSubmit={handleSubmit}>
          <div className='form-group' style={{ marginTop: '50px'}}>
            <label style={{ fontSize: '25px',fontFamily: 'cursive', marginTop: '50px' }}>Username</label>
            <input
              type="text"
              style={{ fontSize: '23px', justifyContent: 'center', textAlign: 'center', width: '50%', marginTop: '20px', border: '2px solid black'}}
              value={userName}
              onChange={(e) => setUserName(e.target.value)}
              required
            />
          </div>
          <div className='form-group'>
            <label style={{ fontSize: '25px',fontFamily: 'cursive', marginTop: '50px' }}>Password</label>
            <input
              type="password"
              style={{ fontSize: '23px', justifyContent: 'center', textAlign: 'center', width: '50%' , marginTop: '20px', border: '2px solid black'}}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <div className='form-group'>
            <Button variant="dark" type="submit" style={{ fontSize: '25px',fontFamily: 'cursive', marginTop: '50px', width: '50%' }}>Sign In</Button>
          </div>
          {errorMessage && <p className="error-message" style={{ color: 'white', fontSize: '25px', marginTop: '35px' }}>{errorMessage}</p>}
        </form>
        </div>
        </div>
    </div>
  );
};

export default Signin;

import React, { useState } from 'react';
import './Register.css';
import axios from 'axios';
import Button from 'react-bootstrap/Button';
import { toast } from 'react-toastify';

export default function Register() {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '', // Added lastName field
    userName: '',
    password: '',
    dob: '',
    jobPosition: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:5000/add_user', formData);
      console.log('User added successfully');
      setFormData({
        firstName: '',
        lastName: '',
        userName: '',
        password: '',
        dob: '',
        jobPosition: ''
      });

      toast.success('User added successfully', {
        position: "top-center",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    } catch (error) {
      console.error('Error adding user:', error);
      toast.error('Error adding user', {
        position: "top-center",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    }
  };

  return (
    <div className='register'>
      <h2 className="form-heading">REGISTER</h2>
      <form onSubmit={handleSubmit} className="user-form">
        <div className="form-group">
          <label htmlFor="firstName">First Name:</label>
          <input
            type="text"
            id="firstName"
            name="firstName"
            value={formData.firstName}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="lastName">Last Name:</label>
          <input
            type="text"
            id="lastName"
            name="lastName"
            value={formData.lastName}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="userName">User Name:</label>
          <input
            type="text"
            id="userName"
            name="userName"
            value={formData.userName}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            id="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="dob">Date of Birth:</label>
          <input
            type="date"
            id="dob"
            name="dob"
            value={formData.dob}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="jobPosition">Job Position:</label>
          <select
            id="jobPosition"
            name="jobPosition"
            value={formData.jobPosition}
            onChange={handleChange}
            required
            style={{ width: '100%', padding: '8px', borderRadius: '4px' }}  
          >
            <option value="">Select Job Position</option>
            <option value="stock manager">Stock Manager</option>
            <option value="sales representative">Sales Representative</option>
          </select>
        </div>
        <center><Button variant="primary" type="submit" className="submit-button" style={{ marginTop: '20px', padding: '10px 20px', fontSize: '20px', backgroundColor: "black"}}>Submit</Button></center>
      </form>
    </div>
  );
}

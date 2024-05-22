import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Updateprofile.css';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { Link } from 'react-router-dom';

export default function Updateprofile() {

    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        dob: '',
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };
    const formatDate = (dateString) => {
        const date = new Date(dateString);
        return date.toISOString().split('T')[0];
      };

    const userID = localStorage.getItem('userID');

    useEffect(() => {
        const fetchUser = async () => {
            try {
                const response = await axios.get(`http://localhost:5000/get_user/${userID}`);
                const userData = response.data;
                setFormData({
                    firstName: userData.firstName,
                    lastName: userData.lastName,
                    dob: userData.dob ? formatDate(userData.dob) : '', // Assuming dob is a string representing date of birth
                });
            } catch (error) {
                console.log(error);
            }
        };

        fetchUser();
    }, [userID]);



    const handleSubmit = async(e) => {
        e.preventDefault();
            try { 
                const UserId = localStorage.getItem('userID');
                console.log(UserId);          
                await axios.put(`http://localhost:5000/update_user/${UserId}`, formData);
                console.log('User updated successfully',formData);
                setFormData({
                  firstName: '',
                  lastName: '',
                  dob: '',
                });
                alert('User updated successfully');
              } catch (error) {
                console.error('Error adding user:', error);
              }
    };

    return (
        <div className='Updateprofile'>
            <div className='tt'>
            <Link to="/Edit" style={{ marginLeft: '80%', marginBottom: '30px' }}>
                <Button variant="dark">Back</Button>
            </Link>
            </div>
            <h1 className='h00'>Update Profile</h1>
            <Form onSubmit={handleSubmit} className='formedit'>
                <Form.Group controlId="firstName">
                    <Form.Label>First Name</Form.Label>
                    <Form.Control 
                        type="text" 
                        placeholder="Enter your first name" 
                        name="firstName"
                        value={formData.firstName}
                        onChange={handleChange}
                    />
                </Form.Group>

                <Form.Group controlId="lastName">
                    <Form.Label>Last Name</Form.Label>
                    <Form.Control 
                        type="text" 
                        placeholder="Enter your last name" 
                        name="lastName"
                        value={formData.lastName}
                        onChange={handleChange}
                    />
                </Form.Group>

                <Form.Group controlId="dob">
                    <Form.Label>Date of Birth</Form.Label>
                    <Form.Control 
                        type="date" 
                        placeholder="Enter your date of birth" 
                        name="dob"
                        value={formData.dob}
                        onChange={handleChange}
                    />
                </Form.Group>
                <Button variant="dark" type="submit" className='btn'>
                    Submit
                </Button>
            </Form>
        </div>
    );
}

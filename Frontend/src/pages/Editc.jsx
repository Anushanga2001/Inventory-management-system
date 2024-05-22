import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Editc.css';
import { useNavigate } from 'react-router-dom';
import { useParams } from 'react-router-dom';

export default function Editc() {
    const navigate = useNavigate();
  const { userID } = useParams();
  const [user, setUser] = useState({
      firstName: '',
      lastName: '',
      userName: '',
      password: '',
      jobPosition: ''
  });

  useEffect(() => {
      const fetchUser = async () => {
          try {
            console.log(userID);
            const response = await axios.get(`http://localhost:5000/get_user/${userID}`);
            setUser(response.data);
            console.log(response.data);
          } catch (error) {
              console.log(error);
          }
      };

      fetchUser();
  }, [userID]);

  const handleChange = (e) => {
      setUser({
          ...user,
          [e.target.name]: e.target.value,
      });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!user.firstName || !user.lastName || !user.userName || !user.password || !user.jobPosition) {
        alert('Please fill out all fields.');
        return;
    }
    try {
        await axios.put(`http://localhost:5000/update_users/${userID}`, user);
        alert('User updated successfully');
        navigate('/owner/Addusers');
    } catch (error) {
        console.log(error);
        alert('Failed to update user');
    }
};

  return (
      <div>
          <h2 className='ds1'><center>Edit User</center></h2>
          <form className="edit-user-form" onSubmit={handleSubmit}>
              <div>
                  <label className='sq1'>First Name:</label>
                  <input type='text' name='firstName' value={user.firstName} onChange={handleChange} />
              </div>
              <div>
                  <label className='sq1'>Last Name:</label>
                  <input type="text" name="lastName" value={user.lastName} onChange={handleChange} />
              </div>
              <div>
                  <label className='sq1'>User Name:</label>
                  <input type="text" name="userName" value={user.userName} onChange={handleChange} />
              </div>
              <div>
                  <label className='sq1'>Password:</label>
                  <input type="text" name="password" value={user.password} onChange={handleChange} />
              </div>
              <div>
                  <label className='sq1'>Job Position:</label>
                  <input type="text" name="jobPosition" value={user.jobPosition} onChange={handleChange} />
              </div>
              <button type="submit">Update</button>
          </form>
      </div>
  );
}

import React, { useState, useEffect } from 'react';
import './Addusers.css';
import axios from 'axios';
import { Link } from 'react-router-dom'
import {useNavigate} from 'react-router-dom'

export default function Addusers() {
  const [users, setUsers] = useState([]);

  const handleDelete = async (userID) => {
    const confirmDelete = window.confirm("Are you sure you want to delete?");
    if (confirmDelete) {
        try {
            console.log(userID);
            await axios.delete(`http://localhost:5000/delete_users/${userID}`);     
            setUsers(users.filter(user => user.userID !== userID));
        } catch (e) {
            console.log(e)
        }
    }
}

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get("http://localhost:5000/get_users");
        setUsers(response.data);
      } catch (error) {
        console.log(error);
      }
    };

    fetchUsers();
  }, []);

  return (
    <div className="Home">
      <div className='fge1'><center>USERS OF THE SYSTEM</center></div><br/>
      <table className="user-table">
        <thead>
          <tr>
            <th>ID</th>
            <th>First Name</th>
            <th>Last Name</th>
            <th>User Name</th>
            <th>Date of Birth</th>
            <th>Job Position</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user.userID}>
              <td>{user.userID}</td>
              <td>{user.firstName}</td>
              <td>{user.lastName}</td>
              <td>{user.userName}</td>
              <td>{new Date(user.dob).toLocaleDateString()}</td>
              <td>{user.jobPosition}</td>
              <td>
                <div className="action-buttons" style={{ justifyContent: 'center' }}>
                  <Link to={`/owner/ed/${user.userID}`} className="action-button edit">Edit</Link>
                  <Link className="action-button delete" onClick={() => handleDelete(user.userID)}>Delete</Link>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className='under'>
        <Link to='/owner/Register' className="add">Add User</Link>
      </div>
    </div>
  );
}

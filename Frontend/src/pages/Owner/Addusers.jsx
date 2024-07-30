import React, { useState, useEffect } from 'react';
import './Addusers.css';
import axios from 'axios';
import { Link } from 'react-router-dom'

export default function Addusers() {
  const [users, setUsers] = useState([]);

  // const handleUpdate = async (userID) => {
  //   try {
  //     console.log(userID);
  //     await axios.put(`http://localhost:5000/update_users/${userID}`);
  //     setUsers(users.filter(user => user.userID !== userID));
  //   } catch (e) {
  //     console.error(e);
  //   }
  // };

  const handleDelete = async (userID) => {
    try {
      console.log(userID);
      await axios.delete(`http://localhost:5000/delete_users/${userID}`);
      setUsers(users.filter(user => user.userID !== userID));
    } catch (e) {
      console.error(e);
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
          <tr style={{position:"sticky", top:"0"}}>
            <th  style={{color: "rgba(255, 255, 0, 0.8)", backgroundColor: "rgba(0, 0, 0, 0.8)"}}>ID</th>
            <th  style={{color: "rgba(255, 255, 0, 0.8)", backgroundColor: "rgba(0, 0, 0, 0.8)"}}>First Name</th>
            <th  style={{color: "rgba(255, 255, 0, 0.8)", backgroundColor: "rgba(0, 0, 0, 0.8)"}}>Last Name</th>
            <th  style={{color: "rgba(255, 255, 0, 0.8)", backgroundColor: "rgba(0, 0, 0, 0.8)"}}>User Name</th>
            <th  style={{color: "rgba(255, 255, 0, 0.8)", backgroundColor: "rgba(0, 0, 0, 0.8)"}}>Date of Birth</th>
            <th  style={{color: "rgba(255, 255, 0, 0.8)", backgroundColor: "rgba(0, 0, 0, 0.8)"}}>Job Position</th>
            <th  style={{color: "rgba(255, 255, 0, 0.8)", backgroundColor: "rgba(0, 0, 0, 0.8)"}}>Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.filter(user => user.status !== 'invalid').map(user => (
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
                  {/* <button style={{backgroundColor: "black", color: 'white', width: '90px', borderRadius: '5px'}} onClick={() => handleUpdate(user.userID)}>Remove</button> */}
                  <button style={{backgroundColor: "black", color: 'white', width: '90px', borderRadius: '5px'}} onClick={() => handleDelete(user.userID)}>Delete</button>
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

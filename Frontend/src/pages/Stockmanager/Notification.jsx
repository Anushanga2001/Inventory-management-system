import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Notification.css';
import { Table } from 'react-bootstrap';

export default function Notification() {
  const [items, setItems] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("http://localhost:5000/get_itemszz");
        console.log(response.data);
  
        const data = response.data;
        const newNotifications = [];
  
        for (const item of data) {
          // Check if the notification already exists in the database
          const existingNotification = items.find(
            (notification) =>
              notification.itemNo === item.itemNo &&
              notification.batchNo === item.batchNo &&
              notification.statusMessage === item.statusMessage
          );
  
          if (!existingNotification) {
            // Add the notification to the database
            const notificationResponse = await axios.post(
              "http://localhost:5000/add_notificationss",
              item
            );
            console.log(item);
  
            // Add the notification to the newNotifications array
            newNotifications.push(notificationResponse.data);
          }
        }
  
        // Update the items state with the new notifications
        setItems((prevItems) => [...prevItems, ...newNotifications]);
  
        // Fetch the notifications from the database
        const data1 = await axios.get("http://localhost:5000/get_notifications");
        setItems(data1.data);
  
      } catch (error) {
        console.error(error);
      }
    };
  
    fetchData();
  }, []);  

  return (
    <div className='Notification'>
      <h2 style={{color:"#000000", fontWeight:"bold", fontSize:"40px", textAlign:"center"}}>Notification Items</h2>
      {items.length === 0 ? (
        <p>No items found matching the criteria.</p>
      ) : Array.isArray(items) && (
        <div className='cis1'>
        <Table striped bordered hover className='wwe1'>
          <thead>
            <tr>
              <th>Item No</th>
              <th>Batch No</th>
              <th>Item Name</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
              {items.map((item, index) => {
                const { itemNo, batchNo, itemName, statusMessage } = item;
                return (
                  <tr key={index}>
                    <td>{itemNo}</td>
                    <td>{batchNo}</td>
                    <td>{itemName}</td>
                    <td>{statusMessage}</td>
                  </tr>
                );
              })}
          </tbody>
        </Table>
        </div>
      )}
    </div>
  );
}

import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import './Notification.css';
import { Table } from 'react-bootstrap';
import io from 'socket.io-client';

const socket = io.connect('http://localhost:5000'); 

export default function Notification() {
  const [items, setItems] = useState([]);
  const itemsRef = useRef(items);
  const [notificationsDeleted, setNotificationsDeleted] = useState(false);
  const [newNotifications, setNewNotifications] = useState(false);

  useEffect(() => {
    itemsRef.current = items;
  }, [items]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        
        const response = await axios.get("http://localhost:5000/get_item040");

        const itemsWithMessage = response.data.map(item => {
          let message = '';
          if (item.quantity === 0) {
            message = 'Empty stock';
          } else if (item.quantity < item.noOfQuantity) {
            message = 'Less stock';
          } else {
            message = 'Expire date is close';
          }
          return { ...item, message };
        });        

        setItems(itemsWithMessage);

        setNewNotifications(true);

      } catch (error) {
        console.error(error);
      }
    };

    if (!notificationsDeleted) {
      fetchData();
    }

    // WebSocket event handlers
    const handleNewNotification = (newItem) => {
      setItems(prevItems => [...prevItems, { ...newItem, message: 'expire date is close' }]);
      setNewNotifications(true);
    };

    // Subscribe to WebSocket events
    socket.on('new_notification', handleNewNotification);

    // Cleanup: Unsubscribe from WebSocket events and disconnect
    return () => {
      socket.off('new_notification', handleNewNotification);
      socket.disconnect();
    };
  }, [notificationsDeleted]);

  return (
    <div className='Notification'>
      <h2 style={{color:"#000000", fontWeight:"bold", fontSize:"40px", textAlign:"center"}}>
        Notification Items {newNotifications && <span className="notice-mark">🔔</span>}
      </h2>
      {items.length === 0 ? (
        <p>No items found matching the criteria.</p>
      ) : Array.isArray(items) && (
        <div className='cis1'>
        <Table striped bordered hover className='wwe1'>
          <thead>
            <tr style={{fontSize: "20px", position:"sticky", top:"0"}}>
              <th style={{color: "rgba(255, 255, 0, 0.8)", backgroundColor: "rgba(0, 0, 0, 0.8)"}}>Item No</th>
              <th style={{color: "rgba(255, 255, 0, 0.8)", backgroundColor: "rgba(0, 0, 0, 0.8)"}}>Batch No</th>
              <th style={{color: "rgba(255, 255, 0, 0.8)", backgroundColor: "rgba(0, 0, 0, 0.8)"}}>Item Name</th>
              <th style={{color: "rgba(255, 255, 0, 0.8)", backgroundColor: "rgba(0, 0, 0, 0.8)"}}>Message</th>
            </tr>
          </thead>
          <tbody>
              {items.map((item, index) => {

                let messageColor = '';

                if (item.message === 'Empty stock') {
                  messageColor = 'red';
                } else if (item.message === 'Less stock') {
                  messageColor = 'brown';
                } else {
                  messageColor = 'blue';
                }

                const { itemNo, batchNo, itemName } = item;
                return (
                  <tr key={index}>
                    <td>{itemNo}</td>
                    <td>{batchNo}</td>
                    <td>{itemName}</td>
                    <td style={{ color: messageColor }}><b>{item.message}</b></td>             
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

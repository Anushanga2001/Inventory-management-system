import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Notification.css';
import { Table } from 'react-bootstrap';

export default function Notification() {
  const [items, setItems] = useState([]);
  const [notificationsDeleted, setNotificationsDeleted] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("http://localhost:5000/get_item040");

        // Add the message to each item based on the quantity and expiry date
        const itemsWithMessage = response.data.map(item => {
          let message = '';
          if (item.quantity < 10) {
            message = 'less stock';
          } else {
            message = 'expire date is close';
          }
          return { ...item, message };
        });

        setItems(itemsWithMessage);

        // Make a POST request to the server to add the items to another table
        await axios.post(`http://localhost:5000/add_notifications`, response.data);
        console.log(response.data);

      } catch (error) {
        console.error(error);
      }
    };

    if (!notificationsDeleted) {
      fetchData();
    }
  }, [notificationsDeleted]);

  const handleDelete = async (itemNo, batchNo) => {
    try {
      await axios.delete(`http://localhost:5000/delete_notification/${itemNo}/${batchNo}`);
      setItems(items.filter(item => item.itemNo !== itemNo || item.batchNo !== batchNo));
      setNotificationsDeleted(true);
    } catch (error) {
      console.error(error);
    }
  };

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
              <th>Message</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
              {items.map((item, index) => {
                const { itemNo, batchNo, itemName } = item;
                return (
                  <tr key={index}>
                    <td>{itemNo}</td>
                    <td>{batchNo}</td>
                    <td>{itemName}</td>
                    <td>{item.message}</td>
                    <td>
                      <button className="action-button-delete1" onClick={() => handleDelete(itemNo, batchNo)} style={{marginTop: '0px'}}>
                        Delete
                      </button>
                    </td>
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

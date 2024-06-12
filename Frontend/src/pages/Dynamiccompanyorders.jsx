import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

function Dynamiccompanyorders() {
  let { orderno } = useParams();
  let { orderNo } = useParams();
  const [orderDetails, setOrderDetails] = useState([]);
  const [orderDate, setOrderDate] = useState('');
  const [userID, setUserID] = useState('');

  useEffect(() => {
    const fetchOrderDetails = async () => {
      try {
        console.log(orderno);
        const response = await axios.get(`http://localhost:5000/get_order_details/${orderno}`);
        console.log(response.data);
        setOrderDetails(response.data);

        const date = new Date(response.data[0].orderDate);
        date.setDate(date.getDate() + 1); 
        setOrderDate(date.toISOString().substring(0, 10));
        setUserID(response.data[0].userID);
        
      } catch (error) {
        console.log(error);
      }
    };

    fetchOrderDetails();
  }, [orderno, orderNo]);


  return (
    <div>
      <center><h2 className='fr1'>Company Order</h2></center>
      <div className='companyorders_no' style={{ marginLeft: "70px" }}>
        <p>Order Number : <b>{orderno}</b></p>
        <p>Order Date : <b>{orderDate}</b></p>
        <p>Stock manager ID : <b>{userID}</b></p>
      </div>
      <table className='tablew'>
        <thead>
          <tr>
            <th>Item Name</th>
            <th>Unit Price</th>
            <th>Quantity</th>
            <th>Total</th>
          </tr>
        </thead>
        <tbody>
          {Array.isArray(orderDetails) && orderDetails.map((item, id) => (
            <tr key={id}>
              <td>{item.itemName}</td>
              <td>{item.unitPrice}</td>
              <td>{item.quantity}</td>
              <td>{(item.unitPrice * item.quantity).toFixed(2)}</td>
            </tr>
          ))}
        </tbody>
        <tfoot>
          <tr>
            <td colSpan="3" style={{ textAlign: "right" }}><b>Total</b></td>
            <td>{orderDetails.reduce((acc, item) => acc + item.unitPrice * item.quantity, 0).toFixed(2)}</td>
          </tr>
        </tfoot>
      </table>
    </div>
  );
  
}

export default Dynamiccompanyorders

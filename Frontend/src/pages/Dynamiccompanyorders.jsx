import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

function Dynamiccompanyorders() {

  let { orderno } = useParams();
  const [orderDetails, setOrderDetails] = useState([]);
  

  useEffect(() => {
    const fetchOrderDetails = async () => {
      try {
        console.log(orderno);
        const response = await axios.get(`http://localhost:5000/get_order_details/${orderno}`);
        console.log(response.data);
        setOrderDetails(response.data);
      } catch (error) {
        console.log(error);
      }
    };

    fetchOrderDetails();
  }, [orderno]);

  return (
    <div>
      <center><h2 className='fr1'>Order Details</h2></center>
      <div className='companyorders_no' style={{ marginLeft: "70px" }}>
        <p>Order Number: <b>{orderno}</b></p>
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
              <td>{item.unitPrice * item.quantity}</td>
            </tr>
          ))}
        </tbody>
        <tfoot>
          <tr>
            <td colSpan="3" style={{ textAlign: "right" }}><b>Total</b></td>
            <td>{orderDetails.reduce((acc, item) => acc + item.unitPrice * item.quantity, 0)}</td>
          </tr>
        </tfoot>
      </table>
    </div>
  );
  
}

export default Dynamiccompanyorders

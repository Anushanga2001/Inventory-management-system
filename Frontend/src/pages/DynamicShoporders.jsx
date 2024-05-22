import React from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import './Dynamicorders.css';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';

function DynamicShoporders() {
  
  let { orderNo } = useParams();
  const [orderDetails, setOrderDetails] = useState([]);
  const [shop, setShop] = useState([]);

  const downloadPDF = async () => {
    const input = document.getElementById('content-to-download');
    html2canvas(input, { scale: 0.8 }) // Adjust the scale value here
      .then((canvas) => {
        const imgData = canvas.toDataURL('image/png');
        const pdf = new jsPDF('p', 'mm', [input.offsetWidth, input.offsetHeight]);
        pdf.addImage(imgData, 'JPEG', 0, 0);
        pdf.save('table.pdf');
      });
  };
  
  useEffect(() => {
    const fetchOrderDetails = async () => {
      try {
        console.log(orderNo);
        const response = await axios.get(`http://localhost:5000/get_shoporder_details/${orderNo}`);
        // console.log(response.data);
        setOrderDetails(response.data);
      } catch (error) {
        console.log(error);
      }
    };

    fetchOrderDetails();
  }, [orderNo]);

  useEffect(() => {
    const fetchShop = async () => {
      try {
        console.log(orderNo);
        const response = await axios.get(`http://localhost:5000/get_shoporders/${orderNo}`);
        console.log(response.data);
        setShop(response.data);
      } catch (error) {
        console.log(error);
      }
    };

    fetchShop();
  }, [orderNo]);

  return (
    <div className='a23'>
    <div id="content-to-download" style={{ width: '100%', height: '100%'}}>
      <center><h2 style={{color:"#000000", fontFamily:"arial", fontSize:"40px",marginTop:"30px"}}><b>Order Details</b></h2></center>
      {Array.isArray(shop) && shop.map((item, id) => (
        <div className="shop-details" key={id}>
          <p>Shop Name : <b>{item.shopName}</b></p>
          <p>Address : <b>{item.address}</b></p>
        </div>
      ))}
      <table className='tablew'>
        <thead>
          <tr>
            <th><center>Item No</center></th>
            <th><center>Item Name</center></th>
            <th><center>Unit Price</center></th>
            <th><center>Quantity</center></th>
            <th><center>Total Price</center></th>
          </tr>
        </thead>
        <tbody>
          {Array.isArray(orderDetails) && orderDetails.map((item, id) => (
            <tr key={id}>
              <td><center>{item.itemNo}</center></td>
              <td><center>{item.itemName}</center></td>
              <td><center>{item.unitPrice}</center></td>
              <td><center>{item.quantity}</center></td>
              <td><center>{item.unitPrice * item.quantity}</center></td>
            </tr>
          ))}
          {/* Display the total of all total prices */}
          <tr>
            <td colSpan="4" style={{ textAlign: "right" }}><b>Total</b></td>
            <td><center>{orderDetails.reduce((acc, cur) => acc + cur.unitPrice * cur.quantity, 0)}</center></td>
          </tr>
        </tbody>
      </table> 
      </div>
        <button onClick={downloadPDF} className='btn77' style={{border:"2px solid black", fontFamily:"arial", width:"150px", color:"white", backgroundColor:"black", height:"40px"}}><b>PRINT BILL</b></button>
      </div>
  );
}

export default DynamicShoporders;

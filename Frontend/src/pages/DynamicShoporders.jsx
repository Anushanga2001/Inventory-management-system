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
  const [isSalesRep, setIsSalesRep] = useState(false);

  const downloadPDF = async () => {
    const input = document.getElementById('content-to-download');
    html2canvas(input, { scale: 1 }) // Adjust the scale value here to 1 for better resolution
      .then((canvas) => {
        const imgData = canvas.toDataURL('image/png');
        const pdf = new jsPDF('p', 'mm', 'a4'); // Set the format to A4

        // Calculate dimensions
        const imgProps = pdf.getImageProperties(imgData);
        const pdfWidth = pdf.internal.pageSize.getWidth();
        const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;

        // Add image with margins (10mm)
        const margin = 10;
        pdf.addImage(imgData, 'PNG', margin, margin, pdfWidth - 2 * margin, pdfHeight - 2 * margin);
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

  // validate only sales rep only see the print option
  useEffect(() => {
    const jobPosition = localStorage.getItem('jobPosition');
    if (jobPosition === 'sales representative') {
      setIsSalesRep(true);
    }
  }, []);


  return (
    <div className='a23'>
    <div id="content-to-download" style={{ width: '100%', height: '100%'}}>
      <center><h2 style={{color:"#000000", fontFamily:"arial", fontSize:"40px",marginTop:"30px", marginBottom:"-15px"}}><b>Radeepa Distributors</b></h2><br/><span className='a29'>Colombo Road <br/>Yatiyantota<br/>036-2233567 / 077-234543213</span></center>
        {Array.isArray(shop) && shop.map((item, id) => {
          const orderDate = new Date(item.orderDate).toISOString().slice(0, 10); // get only date
          return (
            <div className="shop-details" key={id}>
              <div className="shop-details1">
                <p>Shop Name : <b>{item.shopName}</b></p>
                <p>Address : <b>{item.address}</b></p>
              </div>
              <div className="shop-details2">
                <p>Order No : <b>{item.orderNo}</b></p>
                <p>Order Date : <b>{orderDate}</b></p>
              </div>
            </div>
          );
})}
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
      {isSalesRep && (<center><h3 className='fr1'>THANK YOU!</h3></center>)}
      </div>
      {isSalesRep && (<button onClick={downloadPDF} className='btn77' style={{border:"2px solid black", fontFamily:"arial", width:"150px", color:"white", backgroundColor:"black", height:"40px"}}><b>PRINT BILL</b></button>)}
      </div>
  );
}

export default DynamicShoporders;

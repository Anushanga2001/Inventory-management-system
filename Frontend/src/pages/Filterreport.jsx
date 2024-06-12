import React, { useEffect, useState } from 'react';
import Table from 'react-bootstrap/Table';
import axios from 'axios';
import * as XLSX from 'xlsx';

export default function Filterreport() {
  const [orders, setOrders] = useState([]);
  const [orderNo, setOrderNo] = useState("");
  const [itemNo, setItemNo] = useState("");

  useEffect(() => {
    const fetchReports = async () => {
      try {
        const res = await axios.get("http://localhost:5000/get_salesreport", {
          params: { orderNo, itemNo },
        });
        // Sort the data in descending order by order number
        const sortedData = res.data.sort((a, b) => b.orderNo - a.orderNo);
        setOrders(sortedData);
      } catch (err) {
        console.log(err);
      }
    };
    fetchReports();
  }, [orderNo, itemNo]);

  const handleDownloadExcel = () => {
    const formattedOrders = orders.map(order => ({
      ...order,
      orderDate: new Date(order.orderDate).toLocaleDateString()
    }));
    const worksheet = XLSX.utils.json_to_sheet(formattedOrders);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Sales');
    XLSX.writeFile(workbook, 'sales.xlsx');
  };

  return (
    <div>
      <center><h1 style={{ marginTop: "30px",fontSize: "50px", fontWeight: "bold" }}>SALES REPORTS</h1></center>
      <div className='searchF' style={{ display: "flex", justifyContent: "center", marginBottom: "10px", marginTop: "20px" }}>
        <label style={{ marginRight: "20px", fontWeight: "bold", color: "black" }}>
          Order No:
          <input type="text" value={orderNo} onChange={(e) => setOrderNo(e.target.value)} style={{ marginLeft: "10px" }}/>
        </label>
        <label style={{ fontWeight: "bold", color: "black" }}>
          Item No:
          <input type="text" value={itemNo} onChange={(e) => setItemNo(e.target.value)} style={{ marginLeft: "10px" }}/>
        </label>
      </div>
      <div className='contain' style={{ marginLeft: "40px", marginRight: "40px", marginTop: "20px", marginBottom: "20px" }}>
        <button onClick={handleDownloadExcel} style={{ marginBottom: "10px" }}>Download Excel</button>
        <div style={{ width: "100%", justifyContent: "center", textAlign: "center", overflowY: "auto", height: "650px", marginTop: "10px" }}>
          <Table striped bordered hover>
            <thead>
              <tr style={{ position: "sticky", top: "0" }}>
                <th style={{ color: "rgba(255, 255, 0, 0.8)", backgroundColor: "rgba(0, 0, 0, 0.8)" }}>Order Date</th>
                <th style={{ color: "rgba(255, 255, 0, 0.8)", backgroundColor: "rgba(0, 0, 0, 0.8)" }}>Order No</th>
                <th style={{ color: "rgba(255, 255, 0, 0.8)", backgroundColor: "rgba(0, 0, 0, 0.8)" }}>Item No</th>
                <th style={{ color: "rgba(255, 255, 0, 0.8)", backgroundColor: "rgba(0, 0, 0, 0.8)" }}>Item Name</th>
                <th style={{ color: "rgba(255, 255, 0, 0.8)", backgroundColor: "rgba(0, 0, 0, 0.8)" }}>Unit Price</th>
                <th style={{ color: "rgba(255, 255, 0, 0.8)", backgroundColor: "rgba(0, 0, 0, 0.8)" }}>Quantity</th>
              </tr>
            </thead>
            <tbody>
              {orders.map((order) => (
                <tr key={order.orderNo}>
                  <td>{new Date(order.orderDate).toLocaleDateString()}</td>
                  <td>{order.orderNo}</td>
                  <td>{order.itemNo}</td>
                  <td>{order.itemName}</td>
                  <td>{order.unitPrice}</td>
                  <td>{order.quantity}</td>
                </tr>
              ))}
            </tbody>
          </Table>
        </div>
      </div>
    </div>
  );
}

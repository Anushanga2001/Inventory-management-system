import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './Companyorders.css'
import Table from 'react-bootstrap/Table';
import { Link } from 'react-router-dom';

export default function Companyorders() {
  const [orders, setOrders] = useState([]);
  const [filteredOrders, setFilteredOrders] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    const fetchcompanyorders = async () => {
      try {
        const response = await axios.get("http://localhost:5000/get_companyorders");
        setOrders(response.data);
      } catch (error) {
        console.log(error);
      }
    };

    fetchcompanyorders();
  }, []);

  useEffect(() => {
    if (!searchTerm) {
      setFilteredOrders(orders);
      return;
    }

    // according to the orderNo and date searching happen
    const filtered = orders.filter((order) =>
      order.orderNo.toString().includes(searchTerm)
      || new Date(order.orderDate).toLocaleDateString().includes(searchTerm)
    );
    setFilteredOrders(filtered);
  }, [searchTerm, orders]);

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  return (
    <div className='Companyorders'>
      <div style={{display:"flex"}}>
        <h1 className='hh001' style={{color:"#000000", fontWeight:"bold", fontSize:"40px", position:"fixed", top:"0", left:"0", marginLeft:"300px", marginTop:"30px"}}>Company Orders</h1>
        <div className="search3">
            <form action="/search" method="get">
              <input type="text" placeholder="Search..." name="q" value={searchTerm} onChange={handleSearchChange} />
            </form>
        </div>
      </div>
      <div className='table13'>
        <Table striped bordered hover className='table003'>
          <thead>
            <tr>
              <th><center>OrderNo</center></th>
              <th><center>Date</center></th>
              <th><center>Time</center></th>
            </tr>
          </thead>
          <tbody>
          {filteredOrders.map((order) => (
              <tr key={order.orderNo}>
                <td><center><Link to={`/owner/add/${order.orderNo}`}>{order.orderNo}</Link></center></td>
                <td><center>{new Date(order.orderDate).toLocaleDateString()}</center></td>
                <td><center>{order.orderTime}</center></td>
              </tr>
            ))}
          </tbody>
        </Table>
      </div>
    </div>
  );
}

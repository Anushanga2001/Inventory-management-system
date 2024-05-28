import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './Companyorders2.css';
import { Link } from 'react-router-dom';
import Table from 'react-bootstrap/Table';
import Button from 'react-bootstrap/Button';

export default function Companyorders2() {
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
    <div className='Companyorders2'>
      <div style={{display:"flex"}}>
        <h1 className='hh001' style={{color:"#000000", fontWeight:"bold", fontSize:"40px", position:"fixed", top:"0", left:"0", marginLeft:"300px", marginTop:"30px"}}>Company Orders</h1>
        <div className="search3">
            <form action="/search" method="get">
              <input type="text" placeholder="Search..." name="q" value={searchTerm} onChange={handleSearchChange} />
            </form>
        </div>
      </div>
      <div className='de'>
        <Table striped bordered hover className='c1'>
          <thead>
            <tr>
              <th>OrderNo</th>
              <th>Date</th>
              <th>Time</th>
            </tr>
          </thead>
          <tbody>
          {filteredOrders.map((order) => (
              <tr key={order.orderNo}>
                <td>
                  <Link to={`/stockmanager/add/${order.orderNo}`}>
                    {order.orderNo}
                  </Link>
                </td>
                <td>{new Date(order.orderDate).toLocaleDateString()}</td>
                <td>{order.orderTime}</td>
              </tr>
            ))}
          </tbody>
        </Table>
      </div>
      <div className='companyordersbottom'>
        <Link to='/stockmanager/Placecompanyorders'><Button variant="success" style={{color: 'yellow', backgroundColor: 'black', width: '150px', fontSize: '20px'}}>Place order</Button></Link>
      </div>
    </div>
  );
}

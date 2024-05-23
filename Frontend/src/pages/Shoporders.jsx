import React from 'react';
import axios from 'axios';
import { useState, useEffect } from 'react';
import './Shoporders.css'
import Table from 'react-bootstrap/Table';
import { Link } from 'react-router-dom';

function ShopOrders() {
  const [orders, setOrders] = useState([]);
  const [filteredOrders, setFilteredOrders] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    const fetchshoporders = async () => {
      try {
        const response = await axios.get("http://localhost:5000/get_shoporders");
        setOrders(response.data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchshoporders();
  }, []);

  useEffect(() => {
    if (!searchTerm) {
      setFilteredOrders(orders);
      return;
    }

    // Enable searching by orderNo, shopName, and orderDate
    const filtered = orders.filter((order) =>
      order.orderNo.toString().includes(searchTerm)
      || order.shopName.toLowerCase().includes(searchTerm.toLowerCase())
      || order.orderDate.substring(0, 10).includes(searchTerm)
    );
    setFilteredOrders(filtered);
  }, [searchTerm, orders]);

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  return (
    <div className="OrdersTable">
      <div className="search2">
        <div className='re23'>SHOP ORDERS</div>
        <form action="/search" method="get">
          <input type="text" placeholder="Search..." name="q" value={searchTerm} onChange={handleSearchChange} />
          <button type="submit">Search</button>
        </form>
      </div>
      <div className='re1'>
        <Table  striped bordered hover className='table002'>
          <thead>
            <tr>
              <th>OrderNo</th>
              <th>Order Date</th> {/* Modify table header */}
              <th>Shop Name</th>
              <th>Address</th>
            </tr>
          </thead>
          <tbody>
            {filteredOrders.map((order, index) => (
                    <tr key={index} >
                      <td><Link to={`/salesrep/${order.orderNo}`}>{order.orderNo}</Link></td>
                      <td>{order.orderDate.substring(0, 10)}</td> {/* Modify orderDate display */}
                      <td>{order.shopName}</td>
                      <td>{order.address}</td>
                    </tr>
                  ))}
          </tbody>
        </Table>
      </div>
    </div>
  );
}

export default ShopOrders;

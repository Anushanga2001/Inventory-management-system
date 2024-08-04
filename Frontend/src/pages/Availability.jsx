import React from 'react'
import './Availability.css'
import Table from 'react-bootstrap/Table';
import axios from 'axios';
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

export default function Availability() {
  const [items, setItems] = useState([]);
  const [filteredItems, setFilteredItems] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

  const jobPosition = localStorage.getItem('jobPosition');

  useEffect(() => {
    const fetchItems = async () => {
      try {
        const response = await axios.get("http://localhost:5000/get_itemss");
        setItems(response.data);
      } catch (error) {
        console.log(error);
      }
    };

    fetchItems();
  }, []);

  useEffect(() => {
    if (!searchTerm) {
      setFilteredItems(items);
      return;
    }

    // according to the item name and itemNo searching happen
    const filtered = items.filter((item) =>
      item.itemName.toLowerCase().includes(searchTerm.toLowerCase())
      || item.itemNo.toString().includes(searchTerm)
    );
    setFilteredItems(filtered);
  }, [searchTerm, items]);

  // To set the expire date only displaying date
  function formatDate(dateString) {
    const date = new Date(dateString);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  }

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  }

  return (
    <div className='Availability1'>
      <div className='hh1'>
        <h1 className='hh2' style={{fontWeight:"bold", fontSize:"45px"}}>AVAILABLE ITEMS</h1>
        <div class='hh3'>
          <form action="/search" method="get">
            <input type="text" placeholder="Search..." name="q" value={searchTerm} onChange={handleSearchChange}/>
          </form>
        </div>
      </div>
      <div className="table00">
        <Table striped bordered hover className='c1'>
          <thead>
            <tr style={{position:"sticky", top:"0"}}>
              <th style={{color: "rgba(255, 255, 0, 0.8)", backgroundColor: "rgba(0, 0, 0, 0.8)"}}>Item No</th>
              <th style={{color: "rgba(255, 255, 0, 0.8)", backgroundColor: "rgba(0, 0, 0, 0.8)"}}>Batch No</th>
              <th style={{color: "rgba(255, 255, 0, 0.8)", backgroundColor: "rgba(0, 0, 0, 0.8)"}}>Item Name</th>
              <th style={{color: "rgba(255, 255, 0, 0.8)", backgroundColor: "rgba(0, 0, 0, 0.8)"}}>Unit Price</th>
              <th style={{color: "rgba(255, 255, 0, 0.8)", backgroundColor: "rgba(0, 0, 0, 0.8)"}}>Quantity</th>
              <th style={{color: "rgba(255, 255, 0, 0.8)", backgroundColor: "rgba(0, 0, 0, 0.8)"}}>Expire Date</th>
              {jobPosition === 'stock manager' && (  // Add this line
                <th style={{color: "rgba(255, 255, 0, 0.8)", backgroundColor: "rgba(0, 0, 0, 0.8)"}}>Action</th>
              )}
            </tr>
          </thead>
          <tbody>
            {filteredItems.map((item, index) => (
              <tr key={index}>
                <td>{item.itemNo}</td>
                <td>{item.batchNo}</td>
                <td>{item.itemName}</td>
                <td>{item.unitPrice}</td>
                <td>{item.quantity === 0 ? <span style={{ fontSize: '15px', fontWeight: 'bold', color: 'red' }}>Empty Stock</span> : item.quantity}</td>
                <td>{formatDate(item.expireDate)}</td>
                {jobPosition === 'stock manager' && (  // Add this line
                  <td>
                    <Link to={`/stockmanager/${item.itemNo}/${item.batchNo}`} className="action-button edit5">
                      Edit
                    </Link>
                  </td>
                )}
              </tr>
            ))}
          </tbody>
        </Table>
      </div>
    </div>
  );
}

import React from 'react'
import './Availability.css'
import Table from 'react-bootstrap/Table';
import axios from 'axios';
import { useState, useEffect } from 'react';

export default function Availability() {
  const [items, setItems] = useState([]);
  const [filteredItems, setFilteredItems] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

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
  };

  // Function to handle delete button click
  const handleDelete = async (itemNo, batchNo) => {
    try {
      const response = await axios.delete(`http://localhost:5000/delete_items/${itemNo}/${batchNo}`);
      if (response.status === 200) {
        // Item deleted successfully, update the state
        const updatedItems = items.filter((item) => item.itemNo !== itemNo || item.batchNo !== batchNo);
        setItems(updatedItems);
        setFilteredItems(updatedItems);
      }
    } catch (error) {
      console.log(error);
    }
  };  

  return (
    <div className='Availability1'>
      <div className='hh1'>
        <h1 className='hh2' style={{fontWeight:"bold", fontSize:"45px"}}>AVAILABLE ITEMS</h1>
        <div class='hh3'>
          <form action="/search" method="get">
            <input type="text" placeholder="Search..." name="q" value={searchTerm} onChange={handleSearchChange}/>
            <button type="submit">Search</button>
          </form>
        </div>
      </div>
      <div className="table00">
        <Table striped bordered hover className='c1'>
          <thead>
            <tr>
              <th>Item ID</th>
              <th>Batch No</th>
              <th>Item Name</th>
              <th>Unit Price</th>
              <th>Quantity</th>
              <th>Expire Date</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {filteredItems.map((item, index) => (
              <tr key={index}>
                <td>{item.itemNo}</td>
                <td>{item.batchNo}</td>
                <td>{item.itemName}</td>
                <td>{item.unitPrice}</td>
                <td>{item.quantity}</td>
                <td>{formatDate(item.expireDate)}</td>
                <td>
                  <button
                  style={{ marginTop: '0px' }}
                    type="button"
                    className="action-button-delete1"
                    onClick={() => handleDelete(item.itemNo, item.batchNo)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </div>
    </div>
  );
}

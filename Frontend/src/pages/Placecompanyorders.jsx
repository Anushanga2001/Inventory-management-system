import React, { useEffect, useState } from 'react';
import axios from 'axios';
import "./Placecompanyorders.css"
import Button from 'react-bootstrap/Button';
import { toast } from 'react-toastify';

export default function Placecompanyorders() {
  const [items, setItems] = useState([]);
  const [orderDate, setOrderDate] = useState('');
  const [orderTime, setOrderTime] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [userID, setUserID] = useState('');

  useEffect(() => {
    const currentDate = new Date().toISOString().split('T')[0];
    const currentTime = new Date().toTimeString().split(' ')[0];

    setOrderDate(currentDate);
    setOrderTime(currentTime);

    const fetchItems = async () => {
      try {
        const response = await axios.get('http://localhost:5000/display_items');
        if (Array.isArray(response.data)) {
          setItems(response.data);
        } else {
          console.log('Response data is not an array');
        }
      } catch (error) {
        console.log(error);
      }
    };

    fetchItems();

    // Retrieve userID from localStorage
    const userID = localStorage.getItem('userID');
    if (userID) {
      setUserID(userID);
    } else {
      console.log('User ID not found in localStorage');
      toast.error('User ID not found. Please log in again.');
    }
  }, []);

  const handleQuantityChange = (index, event) => {
    const newItems = [...items];
    newItems[index].quantity = event.target.value;
    setItems(newItems);
  };

  const handleCancel = () => {
    const clearedItems = items.map(item => ({ ...item, quantity: '' }));
    setItems(clearedItems);
    setOrderDate('');
    setOrderTime('');
  };

  const handleOrderConfirmation = async () => {
    if (!userID) {
      toast.error("User ID is missing. Please log in again.");
      return;
    }
  
    const hasItems = items.some(item => item.quantity > 0);
  
    if (!hasItems) {
      toast.error("Please add at least one item to the order.");
      return;
    }
  
    // Add an alert prompt before placing the order
    if (window.confirm("Do you want to place the order?")) {
      try {
        const orderItems = items.filter(item => item.quantity > 0).map(item => ({
          itemId: item.id,
          itemName: item.name,
          unitPrice: item.unitPrice,
          quantity: item.quantity,
          userID: userID
        }));
  
        console.log(orderItems, "hi");
  
        const response = await axios.post("http://localhost:5000/add_companyorders", {
          orderDate,
          orderTime,
          orderItems
        });
  
        window.location.reload();
  
        // Reset the form
        const clearedItems = items.map(item => ({ ...item, quantity: '' }));
        setItems(clearedItems);
        setOrderDate('');
        setOrderTime('');
      } catch (error) {
        toast.error("Failed to place the order.");
        console.error(error);
      }
    }
  };

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const filteredItems = items.filter((item) =>
    item.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="Placecompanyorders01">
      <div className="search011">
        <form action="/search" method="get">
          <input type="text" placeholder="Search..." name="q" value={searchTerm} onChange={handleSearchChange} />
        </form>
      </div>
      <div className='content02'>
        {filteredItems.map((item, id) => (
          <div className='item7' key={id}>
            <h5>{item.name}</h5>
            <div className='image3'>
              <img src={`data:image/jpeg;base64,${item.image}`} alt="image" />
            </div>
            <label>Unit Price: <b>{item.unitPrice}</b></label>
            <label>
              Enter Quantity
              <input style={{marginTop: '10px'}}
                type="number"
                value={item.quantity || ''}
                onChange={(event) => handleQuantityChange(id, event)}
              />
            </label>
          </div>
        ))}
      </div>
      <div className='bottom'>
        <Button variant="success" onClick={handleOrderConfirmation} className="button-spacing" style={{color: 'yellow', backgroundColor: 'black'}}>CONFIRM</Button>
        <Button variant="danger" onClick={handleCancel} style={{color: 'white', backgroundColor: 'black'}}>CANCEL</Button>
      </div>
    </div>
  );
}

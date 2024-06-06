import React, { useState, useEffect } from 'react';
import "./Placeshoporders.css";
import Button from 'react-bootstrap/Button';
import axios from 'axios';
import { toast } from 'react-toastify'; // Assuming you use react-toastify for toasts

export default function Placeshoporders() {
  const [searchTerm, setSearchTerm] = useState('');
  const [items, setItems] = useState([]);
  const [shopName, setShopName] = useState("");
  const [address, setAddress] = useState("");
  const [userID, setUserID] = useState('');

  useEffect(() => {
    // Fetch items when component mounts
    fetchItems();

    // Retrieve userID from local storage when component mounts
    const storedUserID = localStorage.getItem('userID');
    if (storedUserID) {
      setUserID(storedUserID);
    } else {
      console.log('User ID not found in local storage');
      toast.error('User ID not found. Please log in again.');
    }
  }, []);

  const fetchItems = async () => {
    try {
      const response = await axios.get('http://localhost:5000/get_items');
      setItems(response.data.map(item => ({ ...item, enterquantity: 0 }))); // Initialize enterquantity
    } catch (error) {
      console.error('Error fetching items:', error);
    }
  };

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleShopNameChange = (event) => {
    setShopName(event.target.value);
  };

  const handleAddressChange = (event) => {
    setAddress(event.target.value);
  };

  const handleQuantityChange = (itemNo, batchNo, enterquantity) => {
    const updatedItems = [...items];
    const itemIndex = updatedItems.findIndex((item) => item.itemNo === itemNo && item.batchNo === batchNo);

    if (itemIndex !== -1) {
      updatedItems[itemIndex] = {
        ...updatedItems[itemIndex],
        enterquantity: parseInt(enterquantity) || 0, // Handle empty input as 0
      };

      // Check if the entered quantity exceeds available quantity for the current batch
      if (updatedItems[itemIndex].enterquantity > updatedItems[itemIndex].quantity) {
        alert(`The entered quantity for batch number ${batchNo} is greater than its existing quantity`);
        updatedItems[itemIndex].enterquantity = 0;
        setItems(updatedItems);
        return;
      }

      let alertTriggered = false;

      // Automatically fill earlier batch numbers if the quantity is entered for a later batch
      for (let i = 0; i < itemIndex; i++) {
        if (updatedItems[i].itemNo === itemNo) {
          if (updatedItems[i].enterquantity < updatedItems[i].quantity) {
            alertTriggered = true;
            updatedItems[i].enterquantity = Math.min(updatedItems[i].quantity, updatedItems[i].quantity); // Fill previous batch fully
          }
        }
      }

      if (alertTriggered) {
        alert('Previous batches have been filled completely.');
      }

      // Allow editing of previous batches' quantities if the current batch quantity is reduced or cleared
      for (let i = itemIndex - 1; i >= 0; i--) {
        if (updatedItems[i].itemNo === itemNo && updatedItems[i].enterquantity > 0) {
          if (updatedItems[itemIndex].enterquantity === 0) {
            updatedItems[i].enterquantity = 0; // Reset previous batch quantity
          }
        }
      }

      setItems(updatedItems);
    }
  };
  

  const handleConfirmClick = async () => {
    if (!userID) {
      toast.error("User ID is missing. Please log in again.");
      return;
    }

    const orderItems = items.filter((item) => item.enterquantity > 0);

    if (orderItems.length === 0) {
      alert('Please enter quantity for at least one item.');
      return;
    }

    if (!shopName || !address) {
      alert('Please fill in the shop name and address before placing the order.');
      return;
    }

    if (window.confirm("Are you sure you want to place this order? Yes or No")) {
      const orderItemsMapped = orderItems.map((item) => ({
        itemNo: item.itemNo,
        itemName: item.itemName,
        unitPrice: item.unitPrice,
        batchNo: item.batchNo,
        enterquantity: Math.min(item.quantity, item.enterquantity),
      }));

      const order = {
        userID: userID, 
        shopName,
        address,
        orderDate: new Date().toISOString().slice(0, 10),
        items: orderItemsMapped,
      };
      
      try {
        const response = await axios.post('http://localhost:5000/add_shoporders', order);
        console.log(response.data);
        setShopName('');
        setAddress('');
        setItems([]); // Clear items
        window.location.reload();
      } catch (error) {
        console.error(error);
      }
    }
  };

  const handleCancelClick = () => {
    setShopName('');
    setAddress('');
    setSearchTerm('');
    setItems(items.map(item => ({ ...item, enterquantity: 0 }))); // Reset enterquantity
  };

  const filteredItems = items.filter(item => item.itemName.toLowerCase().includes(searchTerm.toLowerCase()));

  return (
    <div className="Placeshoporders">
      <div className='common10'>
        <div className='topic'>
          <input type="text" placeholder="Enter shop name" value={shopName} style={{ padding: "5px", borderRadius: "5px" }} onChange={handleShopNameChange} /><br />
          <input type="text" placeholder="Address" value={address} style={{ padding: "5px", borderRadius: "5px" }} onChange={handleAddressChange} />
        </div>
        <div className="search010">
          <form action="/search" method="get">
            <input type="text" placeholder="Search..." name="q" value={searchTerm} onChange={handleSearchChange} />
          </form>
        </div>
      </div>
      <div className='content2'>
        {filteredItems.map((item) => (
          <div className='item' key={`${item.itemNo}-${item.batchNo}`}>
            <h5>{item.itemName}</h5>
            <div className='image1'>
              <img src={"http://localhost:5000/uploads/" + item.itemImage} alt='image' />
            </div>
            <label>Unit Price : <b>{item.unitPrice}</b></label>
            <label>Quantity : <b>{item.quantity}</b></label>
            <label>
              Quantity : <b>
              <input
                  type="number"
                  className="no1"
                  value={item.enterquantity || ''}
                  onFocus={() => handleFocus(item.itemNo, item.batchNo)}
                  onBlur={() => handleBlur(item.itemNo, item.batchNo)}
                  onChange={(event) => handleQuantityChange(item.itemNo, item.batchNo, event.target.value)}
                />
              </b>
            </label>
          </div>
        ))}
      </div>
      <div className='bottom1'>
        <Button variant="success" style={{ width: '100px' }} onClick={handleConfirmClick}>CONFIRM</Button>
        <Button variant="danger" style={{ marginLeft: '10px', width: '100px' }} onClick={handleCancelClick}>CANCEL</Button>
      </div>
    </div>
  );
}

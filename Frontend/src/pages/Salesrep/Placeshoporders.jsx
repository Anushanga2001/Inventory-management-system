import React, { useState, useEffect } from 'react';
import "./Placeshoporders.css";
import Button from 'react-bootstrap/Button';
import axios from 'axios';

export default function Placeshoporders() {
  const [searchTerm, setSearchTerm] = useState('');
  const [items, setItems] = useState([]);
  const [shopName, setShopName] = useState("");
  const [address, setAddress] = useState("");
  const [orderItems, setOrderItems] = useState([]);
  const [filteredItems, setFilteredItems] = useState([]);
  const [userID, setUserID] = useState('');

  useEffect(() => {
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

  useEffect(() => {
    if (!searchTerm) {
      setFilteredItems(items);
      return;
    }

    // according to the item name  happen
    const filtered = items.filter((item) =>
      item.itemName.toLowerCase().includes(searchTerm.toLowerCase()));
    setFilteredItems(filtered);
  }, [searchTerm, items]);
  
  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  useEffect(() => {
    fetchItems();
  }, []);

  const fetchItems = async () => {
    try {
      const response = await axios.get('http://localhost:5000/get_items');
      console.log(response.data);
      setItems(response.data);
      setFilteredItems(response.data);
    } catch (error) {
      console.error('Error fetching items:', error);
    }
  };

  const handleShopNameChange = (event) => {
    setShopName(event.target.value);
  };

  const handleAddressChange = (event) => {
    setAddress(event.target.value);
  };

  const handleQuantityChange = (itemNo, batchNo, enterquantity) => {
    const itemIndex = items.findIndex((item) => item.itemNo === itemNo && item.batchNo === batchNo);
  
    if (itemIndex !== -1) {
      const updatedItems = [...items];
      updatedItems[itemIndex] = {
        ...updatedItems[itemIndex],
        enterquantity: parseInt(enterquantity),
      };
  
      const earlierBatchNumbers = items.filter((item) =>
        item.itemNo === itemNo && item.batchNo < batchNo && item.quantity > 0
      );
  
      const isValidQuantity = earlierBatchNumbers.every((item) =>
        item.enterquantity <= item.quantity
      );
  
      if (!isValidQuantity) {
        alert(`Please enter valid quantities for earlier batch numbers before entering quantity for batch number ${batchNo}`);
        return;
      }
  
      if (updatedItems[itemIndex].enterquantity > updatedItems[itemIndex].quantity) {
        alert(`The entered quantity for batch number ${batchNo} is greater than its existing quantity`);
        return;
      }
  
      // Check if there are earlier batch numbers with non-zero quantity and automatically fill in the maximum possible quantity for the current batch number
      const totalQuantityEntered = earlierBatchNumbers.reduce((acc, item) => acc + item.enterquantity, 0);
      const remainingQuantity = updatedItems[itemIndex].quantity - totalQuantityEntered;
      if (remainingQuantity > 0) {
        updatedItems[itemIndex].enterquantity = remainingQuantity;
      }
  
      setItems(updatedItems);
      setOrderItems(updatedItems);
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
        setOrderItems([]);
        window.location.reload();
      } catch (error) {
        console.error(error);
      }
    }
  };

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
          <div className='item' key={item.itemNo && item.batchNo}>
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
                  value={item.enterquantity}
                  onChange={(event) => handleQuantityChange(item.itemNo, item.batchNo, event.target.value)}
                />
              </b>
            </label>
          </div>
        ))}
      </div>
      <div className='bottom1'>
        <Button variant="success" style={{ width: '100px' }} onClick={handleConfirmClick}>CONFIRM</Button>
        <Button variant="danger" style={{ marginLeft: '10px', width: '100px' }}>CANCEL</Button>
      </div>
    </div>
  );
}

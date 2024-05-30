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

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const filteredItems = items.filter((item) =>
    item.itemName.toLowerCase().includes(searchTerm.toLowerCase())
  ).sort((a, b) => a.itemNo - b.itemNo); // sort items by batch number

  useEffect(() => {
    fetchItems();
  }, []);

  const fetchItems = async () => {
    try {
      const response = await axios.get('http://localhost:5000/get_items');
      console.log(response.data);
      setItems(response.data);
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
      updatedItems[itemIndex] = 
      {
        ...updatedItems[itemIndex],
        enterquantity: parseInt(enterquantity)
      };
  
      // Check if there are any earlier batch numbers with non-zero quantity
      const earlierBatchNumbers = items.filter((item) =>
        item.itemNo === itemNo && item.batchNo < batchNo && item.quantity > 0
      );
  
      // If there are earlier batch numbers with non-zero quantity, check if their entered quantity is less than or equal to their existing quantity
      const isValidQuantity = earlierBatchNumbers.every((item) =>
        item.enterquantity = item.quantity
      );
  
      if (!isValidQuantity) {
        alert(`Please enter valid quantities for earlier batch numbers before entering quantity for batch number ${batchNo}`);
        return;
      }
  
      // Check if the entered quantity for the current batch number is less than or equal to its existing quantity
      if (updatedItems[itemIndex].enterquantity > updatedItems[itemIndex].quantity) {
        alert(`The entered quantity for batch number ${batchNo} is greater than its existing quantity`);
        return;
      }
  
      setItems(updatedItems);
      setOrderItems(updatedItems);
    }
  };  

  const handleConfirmClick = async () => {
    const orderItems = items.filter((item) => item.enterquantity > 0);
  
    if (orderItems.length === 0) {
      alert('Please enter quantity for at least one item.');
      return;
    }
  
    // Check if shop name and address are filled in
    if (!shopName || !address) {
      alert('Please fill in the shop name and address before placing the order.');
      return;
    }
  
    const orderItemsMapped = orderItems.map((item) => ({
      itemNo: item.itemNo,
      itemName: item.itemName,
      unitPrice: item.unitPrice,
      batchNo: item.batchNo,
      enterquantity: Math.min(item.quantity, item.enterquantity), // Use the minimum of the exist quantity and the enter quantity
    }));
  
    const order = {
      shopName,
      address,
      orderDate: new Date().toISOString().slice(0, 10), // Include the current date
      items: orderItemsMapped,
    };
  
    try {
      const response = await axios.post('http://localhost:5000/add_shoporders', order);
      console.log(response.data);
  
      // Reset the form fields and state variables
      setShopName('');
      setAddress('');
      setOrderItems([]);
      alert('Order placed successfully');
      window.location.reload();

    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="Placeshoporders">
      <div className='common10'>
        <div className='topic'>
          <input type="text" placeholder="Enter shop name" value={shopName} style={{padding:"5px", borderRadius:"5px"}} onChange={handleShopNameChange} /><br />
          <input type="text" placeholder="Address" value={address} style={{padding:"5px", borderRadius:"5px"}} onChange={handleAddressChange}/>
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
                <img src={"http://localhost:5000/uploads/" + item.itemImage} alt='image'
                />
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
        <Button variant="success" style={{width: '100px'}} onClick={handleConfirmClick}>CONFIRM</Button>
        <Button variant="danger" style={{marginLeft: '10px', width: '100px'}}>CANCEL</Button>
      </div>
    </div>
  );
}

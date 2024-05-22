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
  );

  useEffect(() => {
    fetchItems();
  }, []);

  const fetchItems = async () => {
    try {
      const response = await axios.get('http://localhost:5000/get_items');
      // console.log(response.data);
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
      updatedItems[itemIndex] = {
        ...updatedItems[itemIndex],
        enterquantity: parseInt(enterquantity)
      };
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

    const orderItemsMapped = orderItems.map((item) => ({
      itemNo: item.itemNo,
      itemName: item.itemName,
      unitPrice: item.unitPrice,
      enterquantity: Math.min(item.quantity, item.enterquantity), // Use the minimum of the exist quantity and the enter quantity
    }));

    const order = {
      shopName,
      address,
      items: orderItemsMapped,
    };

    try {
      const response = await axios.post('http://localhost:5000/add_shoporders', order);
        console.log(response.data);
      // Reset the form fields and state variables
      setShopName('');
      setAddress('');
      setOrderItems([]);
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
            <button type="submit">Search</button>
          </form>
        </div>
      </div>
      <div className='content2'>
        {filteredItems.map((item) => (
          <div className='item' key={item.itemNo && item.batchNo}>
            <h5>{item.itemName}</h5>
            <div className='image1'>
                <img
                  src={"http://localhost:5000/uploads/" + item.itemImage} alt='image'
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

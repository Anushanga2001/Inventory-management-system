import React, { useState } from 'react';
import './Addnewitems.css';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { Link } from 'react-router-dom';
import Button from 'react-bootstrap/Button';
import axios from 'axios';

export default function Addnewitems() {

  const [selectedFile, setSelectedFile] = useState(null);
  const handleFileChange = (e) => {
    setSelectedFile(e.target.files[0]);
  };
  
  const notify = (promise, message) => {
    toast.promise(
      promise,
      {
        pending: message,
        success: 'Item added successfully 👌',
        error: 'Something went wrong 🤯',
      }
    );
  };  
  
  const [formData, setFormData] = useState({
    itemName: '',
    unitPrice: '',
    quantity: '',
    expireDate: '',
    noOfQuantity: ''
  });

  const [error, setError] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    let validatedValue = value;

    if (name === "itemName") {
      validatedValue = value.charAt(0).toUpperCase() + value.slice(1).toLowerCase();
    }
  
    if (name === "itemName" && value.includes("-")) {
      validatedValue = validatedValue.replace(/\s-/g, '-');
    }
  
    setFormData({ ...formData, [name]: validatedValue });
  };


  const checkExistingItem = async (itemName, formData) => {
    try {
      const response = await axios.get(`http://localhost:5000/gets_item/${itemName}`);
      const existingItem = response.data;
      if (existingItem && existingItem.itemName === formData.itemName) {
        return true;
      }
      return false;
    } catch (error) {
      return false;
    }
  };  

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const itemExists = await checkExistingItem(formData.itemName, formData);
  
      if (itemExists) {
        setError('This item already exists in the database.');
        return;
      }
      const formDataToSend = new FormData();
      formDataToSend.append('itemName', formData.itemName);
      formDataToSend.append('unitPrice', formData.unitPrice);
      formDataToSend.append('quantity', formData.quantity);
      formDataToSend.append('expireDate', formData.expireDate);
      formDataToSend.append('noOfQuantity', formData.noOfQuantity);
      formDataToSend.append('itemImage', selectedFile);
  
      const responsePromise = axios.post('http://localhost:5000/add_item', formDataToSend);
      notify(responsePromise, 'Adding new item...');
      setFormData({
        itemName: '',
        unitPrice: '',
        quantity: '',
        expireDate: '',
        noOfQuantity: ''
      });
      setSelectedFile(null);
    } catch (error) {
      console.error('Error adding item:', error);
      notify(error, 'Something went wrong...');
    }
  };  

  const resetForm = () => {
    setFormData({
      itemName: '',
      unitPrice: '',
      quantity: '',
      expireDate: '',
      noOfQuantity: ''
    });
    setSelectedFile(null); // Reset selected file state on cancel
  };

  return (
    <div className="Additems">
      <div className="head">
        <Link to='/stockmanager/Addquantity' className='btn1'>Add quantity</Link>
        <Link to='/stockmanager/Addnewitems' className='btn2'>Add new item</Link>
      </div>
      <div className='content002'>
        <h1 className='topic003'><b>ADD  NEW  ITEM</b></h1>
        {error && <p style={{ color: 'red' }}>{error}</p>}
        <form onSubmit={handleSubmit}>
        <div className='lab1'>
          <label htmlFor="itemName">Item Name </label>
          <input
            type="text"
            id="itemName"
            name="itemName"
            className='input01'
            value={formData.itemName}
            onChange={handleChange}
            required
          />
        </div>
        <div className='lab1'>
          <label htmlFor="unitPrice">Unit Price </label>
          <input
            type="number"
            id="unitPrice"
            name="unitPrice"
            className='input01'
            value={formData.unitPrice}
            onChange={handleChange}
            required
          />
        </div>
        <div className='lab1'>
          <label htmlFor="quantity">Quantity </label>
          <input
            type="number"
            id="quantity"
            name="quantity"
            className='input01'
            value={formData.quantity}
            onChange={handleChange}
            required
          />
        </div>
        <div className='lab1'>
          <label htmlFor="expireDate">Expire Date </label>
          <input
            type="date"
            id="expireDate"
            name="expireDate"
            className='input01'
            value={formData.expireDate}
            onChange={handleChange}
            required
          />
        </div>
        <div className='lab1'>
          <label htmlFor="noOfQuantity">Threshold value </label>
          <input
            type="number"
            id="noOfQuantity"
            placeholder='Enter quantity'
            name="noOfQuantity"
            className='input01'
            value={formData.noOfQuantity}
            onChange={handleChange}
            required
          />
        </div>
        <div className='lab1'>
          <label htmlFor="itemImage">Item Image </label>
            <input
              type="file"
              id="itemImage"
              name="itemImage"
              accept="image/*"
              className='input01'
              onChange={handleFileChange}
              required
            />
        </div>
          <div className='btn21'>
            <center>
              <Button variant="success" type='submit' style={{ width: '150px' }} >ADD</Button>
              <Button variant="danger" type="button" onClick={resetForm} style={{ width: '150px' }}>CANCEL</Button>
            </center>
          </div>
      </form>
      </div>
      <ToastContainer />
    </div>
  )
}

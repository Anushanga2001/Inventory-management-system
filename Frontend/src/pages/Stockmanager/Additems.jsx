import React, { useState } from 'react';
import './Additems.css';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { Link } from 'react-router-dom';
import Button from 'react-bootstrap/Button';
import axios from 'axios';

export default function Additems() {

  const notify = () => {
    if (isFormValid()) {
      const resolveAfter3Sec = new Promise(resolve => setTimeout(resolve, 0));
  
      toast.promise(
        resolveAfter3Sec,
        {
          success: 'Item added successfully 👌',
        }
      );
    } else {
      toast.error('Something went wrong 🤯');
    }
  };
  

  const [formData, setFormData] = useState({
    itemNo: '',
    itemName: '', 
    unitPrice: '',
    quantity: '',
    expireDate: '',
    noOfQuantity: '',
    itemImage: ''
  });

  const [itemImageUrl, setItemImageUrl] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    let validatedValue = value;

    // Ensure that the values for unitPrice, quantity, and noOfQuantity are not negative
    if (name === 'unitPrice' || name === 'quantity' || name === 'noOfQuantity') {
      validatedValue = Math.max(0, value);
    }

    setFormData({ ...formData, [name]: validatedValue });
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();
  
    reader.onloadend = () => {
      setFormData({ ...formData, itemImage: file });
      setItemImageUrl(reader.result);
    };
  
    reader.readAsDataURL(file);
  };  

  const fetchItemName = async () => {
    const { itemNo } = formData;
    console.log(itemNo);
    try {
        const response = await axios.get(`http://localhost:5000/get_items/${itemNo}`);
        const data = response.data;

        if (data.itemName === undefined) {
            alert('There is no registered item with this item number.');
        } else {
            setFormData({
                ...formData,
                itemName: data.itemName,
            });
        }
    } catch (error) {
        console.error('Error fetching item name:', error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!isFormValid()) {
      toast.error('Please ensure all values are greater than zero.');
      return;
    }

    try {
      const formDataToSend = new FormData(); 
      formDataToSend.append('itemNo', formData.itemNo);
      formDataToSend.append('itemName', formData.itemName);
      formDataToSend.append('unitPrice', formData.unitPrice);
      formDataToSend.append('quantity', formData.quantity);
      formDataToSend.append('expireDate', formData.expireDate);
      formDataToSend.append('noOfQuantity', formData.noOfQuantity);
      formDataToSend.append('itemImage', formData.itemImage);

      const responsePromise = axios.post('http://localhost:5000/add_item00', formDataToSend); 
      notify(responsePromise);
      setFormData({
        itemNo: '',
        itemName: '',
        unitPrice: '',
        quantity: '',
        expireDate: '',
        noOfQuantity: '',
        itemImage: ''
      });
      setItemImageUrl('');
    } catch (error) {
      console.error('Error adding item:', error);
    }
  };

  const resetForm = () => {
    setFormData({
      itemNo: '',
      itemName: '',
      unitPrice: '',
      quantity: '',
      expireDate: '',
      noOfQuantity: '',
      itemImage: ''
    });
    setItemImageUrl('');
  };

  const isFormValid = () => {
    const { itemNo, itemName, unitPrice, quantity, expireDate, noOfQuantity } = formData;
    return (
      itemNo && itemName && unitPrice > 0 && quantity > 0 && expireDate && noOfQuantity > 0
    );
  };

  return (
    <div className='content20'>
      <div className="Additems">
        <div className="head">
          <Link to='/stockmanager/Addquantity' className='btn1'>Add quantity</Link>
          <Link to='/stockmanager/Addnewitems' className='btn2'>Add new item</Link>
        </div>
        <div className='content01'>
        <h1 className='topic002'><b>ADD  EXIST  ITEM</b></h1>
          <form onSubmit={handleSubmit}>
          <div className='lab2'>
            <label>Item No  </label>
            <input
              key="itemNo"
              type="number"
              placeholder="Enter Item No"
              className='input02'
              name="itemNo"
              value={formData.itemNo}
              onChange={handleChange}
              onBlur={fetchItemName} 
              required
            />
            </div>
            <div className='lab2'>
            <label>Item Name  </label>
            <input
              key="itemName"
              type="text"
              placeholder="Item Name"
              className='input02'
              name="itemName"
              value={formData.itemName}
              readOnly
              required             
            />
            </div>
            <div className='lab2'>
            <label>Unit Price  </label>
            <input
              key="unitPrice"
              type="number"
              placeholder="Unit Price"
              className='input02'
              name="unitPrice"
              value={formData.unitPrice}
              onChange={handleChange}
              required
            />
            </div>
            <div className='lab2'>
            <label>Quantity  </label>
            <input
              key="quantity"
              type="number"
              placeholder="Quantity"
              className='input02'
              name="quantity"
              value={formData.quantity}
              onChange={handleChange}
              required
            />
            </div>
            <div className='lab2'>
            <label>Expire Date  </label>
            <input
              key="expireDate"
              type="date"
              className='input02'
              name="expireDate"
              value={formData.expireDate}
              onChange={handleChange}
              required
            />
            </div>
            <div className='lab2'>
              <label htmlFor="noOfQuantity">Threshold value </label>
              <input
                type="number"
                id="noOfQuantity"
                placeholder='Enter quantity'
                name="noOfQuantity"
                className='input02'
                value={formData.noOfQuantity}
                onChange={handleChange}
                required
              />
            </div>
            <div className='lab2'>
              <label>Item Image  </label>
              <div>
                <input
                  key="itemImage"
                  type="file"
                  className='input02'
                  name="itemImage"
                  onChange={handleImageChange}
                  style={{ marginLeft: '-170px' }}
                />
                {itemImageUrl && <img src={itemImageUrl} alt="Selected" className='preview-image' />}
              </div>
            </div>
            <div className='btn22' style={{ marginTop: '-20px' }}>
              <center>
                <Button variant="success" type="submit" style={{ width: '150px' }} onClick={notify}>CONFIRM</Button>
                <Button variant="danger" type="button" onClick={resetForm} style={{ width: '150px' }}>CANCEL</Button>
              </center>
            </div>
          </form>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
}

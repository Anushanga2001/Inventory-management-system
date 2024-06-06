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
    itemName: '', // Added itemName state
    unitPrice: '',
    quantity: '',
    expireDate: '',
    noOfQuantity: '',
    itemImage: ''
  });

  const [itemImageUrl, setItemImageUrl] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
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
            alert('There is no registed item with this item number.');
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
    try {
      const formDataToSend = new FormData(); // Use the native FormData object
      formDataToSend.append('itemNo', formData.itemNo);
      formDataToSend.append('itemName', formData.itemName);
      formDataToSend.append('unitPrice', formData.unitPrice);
      formDataToSend.append('quantity', formData.quantity);
      formDataToSend.append('expireDate', formData.expireDate);
      formDataToSend.append('noOfQuantity', formData.noOfQuantity);
      formDataToSend.append('itemImage', formData.itemImage);

      const responsePromise = axios.post('http://localhost:5000/add_item00', formDataToSend); // Do not set the Content-Type header manually
      setFormData({
        itemNo: '',
        itemName: '',
        unitPrice: '',
        quantity: '',
        expireDate: '',
        noOfQuantity: '',
        itemImage: ''
      });
    } catch (error) {
      console.error('Error adding item:', error);
      notify(error, 'Something went wrong...');
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
  };

  const isFormValid = () => {
    const { itemNo, itemName, unitPrice, quantity, expireDate, noOfQuantity } = formData;
    return itemNo && itemName && unitPrice && quantity && expireDate && noOfQuantity;
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
              onBlur={fetchItemName} // Fetch itemName onBlur
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
              type="text"
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
                <Button variant="success" type="submit" style={{ width: '150px' }} onClick={() => { handleSubmit(); notify(); !isFormValid(); }}>CONFIRM</Button>
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

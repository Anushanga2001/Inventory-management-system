import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useParams } from 'react-router-dom';

export default function Editc1() {
  const navigate = useNavigate();
  const { itemNo, batchNo } = useParams();
  const [item, setItem] = useState({
    itemName: '',
    unitPrice: '',
    quantity: '',
    expireDate: '',
  });

  useEffect(() => {
    const fetchItem = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/get_itemd/${itemNo}/${batchNo}`);
        setItem(response.data);
        console.log(response.data);
      } catch (error) {
        console.log(error);
      }
    };

    fetchItem();
  }, [itemNo, batchNo]); // Added missing dependencies

  const handleChange = (e) => {
    setItem({ ...item, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!item.itemName || !item.unitPrice || item.quantity === '' || !item.expireDate) {
        alert('Please fill out all fields.');
        return;
      }

    try {
      await axios.put(`http://localhost:5000/update_item/${itemNo}/${batchNo}`, item);
      alert('Item updated successfully');
      navigate('/stockmanager/Availability');
    } catch (error) {
      console.log(error);
      alert('Failed to update item');
    }
  };

  return (
    <div>
      <h2 className='ds1'><center>Edit Item</center></h2>
      <form className="edit-user-form" onSubmit={handleSubmit}>
        <div>
          <label className='sq1'>Item Name :</label>
          <input type='text' name='itemName' value={item.itemName} onChange={handleChange} /> 
        </div>
        <div>
          <label className='sq1'>Unit Price:</label>
          <input type="text" name="unitPrice" value={item.unitPrice} onChange={handleChange} /> 
        </div>
        <div>
          <label className='sq1'>Quantity :</label>
          <input type="text" name="quantity" value={item.quantity} onChange={handleChange} /> 
        </div>
        <div>
          <label className='sq1'>Expire Date :</label>
          <input type="date" name="expireDate" value={item.expireDate} onChange={handleChange} />
        </div>
        <button type="submit">Update</button>
      </form>
    </div>
  );
}

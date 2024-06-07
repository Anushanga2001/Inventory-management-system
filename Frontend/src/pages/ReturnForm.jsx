import React, { useState } from 'react';
import axios from 'axios';
import './ReturnForm.css';

const ReturnForm = () => {
    const [shopName, setShopName] = useState('');
    const [address, setAddress] = useState('');
    const [items, setItems] = useState([{ itemName: '', quantity: '' }]);

    const handleInputChange = (index, event) => {
        const values = [...items];
        values[index][event.target.name] = event.target.value;
        setItems(values);
    };

    const handleAddItem = () => {
        setItems([...items, { itemName: '', quantity: '' }]);
    };

    const handleRemoveItem = (index) => {
        const values = [...items];
        values.splice(index, 1);
        setItems(values);
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        const data = {
            shopName,
            address,
            items
        };
        axios.post('http://localhost:5000/add_return', data)
            .then(response => {
                alert('Return recorded');
                window.location.reload();
            })
            .catch(error => {
                alert('Error recording return');
            });
    };

    return (

        <form className="return-form" onSubmit={handleSubmit}>
            <div style={{display: "flex", flexDirection: "column"}}>
            <div>
                <label>Shop Name:</label>
                <input
                    type="text"
                    value={shopName}
                    onChange={e => setShopName(e.target.value)}
                    required
                />
            </div>
            <div>
                <label>Address:</label>
                <input
                    type="text"
                    value={address}
                    onChange={e => setAddress(e.target.value)}
                    required
                />
            </div>
            <div style={{display: "flex", flexDirection: "column", overflowY: "scroll", height: "450px", marginTop: "20px", padding: "10px", border: "1px solid black"}}>
            {items.map((item, index) => (
                <div key={index} >
                    <label>Item Name:</label>
                    <input
                        type="text"
                        name="itemName"
                        value={item.itemName}
                        onChange={event => handleInputChange(index, event)}
                        required
                        className='input1'
                    />
                    <label>Quantity:</label>
                    <input
                        type="number"
                        name="quantity"
                        value={item.quantity}
                        onChange={event => handleInputChange(index, event)}
                        required
                        className='input2'
                    />
                    <button type="button" onClick={() => handleRemoveItem(index)}>Remove</button>
                </div>
            ))}
            </div>
            <div style={{display: "flex", position: "fixed", bottom: "0", textAlign: "center", marginBottom: "60px", marginLeft: "200px"}}>
            <button type="button" className="add-item-button" onClick={handleAddItem}>Add Item</button>
            <button type="submit" className="submit-button">Submit</button>
            </div>
            </div>
        </form>
    );
};

export default ReturnForm;

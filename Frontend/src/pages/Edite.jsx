import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

const Edite = ({ selectedItem }) => {
  const { id } = useParams();
  const [item, setItem] = useState(null);

  useEffect(() => {
    if (selectedItem && selectedItem.id === id) {
      setItem(selectedItem);
    } else {
      fetchItemDetails(id);
    }
  }, [id, selectedItem]);

  const fetchItemDetails = (itemId) => {
    const fetchedItem = filteredItems.find((item) => item.id === itemId);
    setItem(fetchedItem);
  };

  if (!item) return <div>Loading...</div>;

  return (
    <div>
      <h2>Edit Item</h2>
      <p>Name: {item.name}</p>
      <p>Unit Price: {item.unitPrice}</p>
      <p>Quantity: {item.quantity}</p>
    </div>
  );
};

export default Edite;

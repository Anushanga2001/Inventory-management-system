import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Totalstock = () => {
  const [stockValue, setStockValue] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    axios.get('http://localhost:5000/get_reports4')
      .then(response => {
        setStockValue(response.data[0].StockValue);
        setLoading(false);
      })
      .catch(error => {
        console.error('Error fetching data:', error);
        setError('Error fetching data');
        setLoading(false);
      });
  }, []);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div style={{marginTop: "50px"}}>
      <h3>Available Stock Value</h3>
      <p style={{fontSize: "25px"}}><b>{stockValue}</b></p>
    </div>
  );
};

export default Totalstock;

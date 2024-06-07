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
    <div style={{marginTop: "50px", border: "1px solid black", height: "250px", borderRadius: "20px",marginRight: "50px", marginLeft: "50px",marginTop: "5px", 
    display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center", backgroundColor: "rgba(255, 255, 0, 0.5)", color: "black"}}>
      <h3>Available Stock Value</h3>
      <p style={{fontSize: "25px"}}><b>{stockValue}</b></p>
    </div>
  );
};

export default Totalstock;

import React, { useState, useEffect } from 'react';
import axios from 'axios';

export default function Forecasting() {
  const [totalSales, setTotalSales] = useState(null);

  useEffect(() => {
    const fetchItems = async () => {
      try {
        const response = await axios.get("http://localhost:5000/get_itemss_forecast");
        setTotalSales(response.data.totalSales); 
      } catch (error) {
        console.log(error);
      }
    };
    fetchItems();
  }, []);

  return (
    <div>
      <h1 style={{
        paddingTop: "25px",
        paddingBottom: "25px",
        fontSize: "50px",
        backgroundColor: "rgba(0, 0, 0, 0.8)",
        color: "rgba(255, 255, 0, 0.8)"
      }}>
        <center>Forecasting</center>
      </h1>
      <div className='forecasting' style={{ justifyContent: 'center', textAlign: 'center', width: '300px',padding: '20px',
        fontSize: '20px', height: '100px', background: 'rgba(0, 0, 0, 0.8)', color: 'yellow', marginLeft: '650px', marginTop: '350px' }}>
        <p>{totalSales !== null ? `Total Sales: ${totalSales/3}` : 'Loading...'}</p>
      </div>
    </div>
  );
}

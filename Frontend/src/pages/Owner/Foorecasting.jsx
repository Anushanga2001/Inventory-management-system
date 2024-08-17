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


  const formattedTotalSales = totalSales !== null 
    ? (totalSales / 3).toFixed(2) 
    : 'Loading...';

  return (
    // This is the page for forecasing the next month sales
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
      <div  style={{backgroundImage: 'url("/src/assets/happy-man (1).png")', height: '100vh', weight: '100%', 
            backgroundPosition: 'center', backgroundRepeat: 'no-repeat', marginLeft: '500px', marginTop: '-50px',	
            display: 'flex',alignItems: 'center',justifyContent: 'center', flexDirection: 'column'}}>

        <h1 style={{fontSize: '50px', color: 'blue', marginLeft: '-1000px', marginTop: '-200px'}}>Next month sales</h1>
        <div className='forecasting' style={{ justifyContent: 'center', textAlign: 'center', width: '500px',padding: '20px',paddingTop: '30px',
          fontSize: '40px', height: '200px', background: 'rgba(0, 0, 0, 0.7)', color: 'yellow', marginLeft: '-850px', marginTop: '50px' }}>
           <p>Total Sales<br/> RS: {formattedTotalSales}</p>
        </div>
      </div>
    </div>
  );
}
import React, { useEffect, useState } from 'react';
import axios from 'axios';

const TotalSales = () => {
  const [totalSalesValue, setTotalSalesValue] = useState(null);
  const [profit, setProfit] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    axios.get('http://localhost:5000/get_reports3')
      .then(response => {
        const salesValue = response.data[0].totalSalesValue;
        setTotalSalesValue(salesValue);
        const profitValue = salesValue * 0.15; // Calculate 15% of total sales
        setProfit(profitValue);
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
    <div style={{ border: "1px solid black" }}>
      <h3>Last 30 Days Total Sales</h3>
      <p style={{ fontSize: "25px" }}><b>{totalSalesValue.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</b></p><hr />
      <h3>Last 30 Days Profit From the Sales</h3>
      <p style={{ fontSize: "25px" }}><b>{profit.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</b></p>
    </div>
  );
};

export default TotalSales;

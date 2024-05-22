import React, { useRef, useEffect } from 'react';
import { useState } from 'react';
import axios from 'axios';
import './Reports.css';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement } from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, BarElement);

const Reports = () => {
  const [itemSales, setItemSales] = useState([]);
  const chartRef = useRef(null);

  useEffect(() => {
    const fetchItemSales = async () => {
      try {
        const response = await axios.get("http://localhost:5000/get_item_sales");
        setItemSales(response.data);
      } catch (error) {
        console.log(error);
      }
    };

    fetchItemSales();
  }, []);

  useEffect(() => {
    if (chartRef.current && itemSales.length > 0) {
      const ctx = chartRef.current.getContext('2d');
      const labels = itemSales.map(item => item.itemName);
      const data = itemSales.map(item => item.totalSales);

      new Chart(ctx, {
        type: 'bar',
        data: {
          labels: labels,
          datasets: [{
            label: '# of Sales',
            data: data,
            borderWidth: 1
          }]
        },
        options: {
          scales: {
            y: {
              beginAtZero: true
            }
          }
        }
      });
    }
  }, [itemSales]);

  return (
    <div className='report'>
      <h2>Report Page</h2>
      <div>
        <canvas ref={chartRef} id="myChart"></canvas>
      </div>
    </div>
  );
};

export default Reports;

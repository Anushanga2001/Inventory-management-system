import React, { useEffect, useState } from 'react';
import axios from 'axios';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
} from 'chart.js';
import { Bar } from 'react-chartjs-2';

// Register the components
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const Barchart = () => {
  const [chartData, setChartData] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    axios.get('http://localhost:5000/get_reports')
      .then(response => {
        console.log('API response:', response.data);
        const data = response.data;
        if (data && Array.isArray(data)) {
          const itemNames = data.map(item => item.itemName);
          const quantities = data.map(item => item.totalQuantity);

          setChartData({
            labels: itemNames,
            datasets: [
              {
                label: 'Item Quantities',
                data: quantities,
                backgroundColor: 'rgba(0, 123, 255, 0.5)', // Use the desired blue color
                borderColor: 'rgba(75, 192, 192, 1)',
                borderWidth: 1,
              },
            ],
          });
        }
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
    <div>
      <center><h2>Each Item Sales Within Last 30 Days</h2></center>
      <div className='ee1' style={{height: "500px", width: "500px"}}>
      <Bar
        data={chartData}
        options={{
          scales: {
            y: {
              beginAtZero: true,
            },
          },
        }}
      />
      </div>
    </div>
  );
};

export default Barchart;

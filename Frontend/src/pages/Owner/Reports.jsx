import React from 'react';
import './Reports.css';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement } from 'chart.js';
import BarChart from '../Owner/Barchart';
import PieChart from '../Owner/Piechart';
import Nochart from '../Owner/Nochart';
import TotalSales from '../Owner/Totalsales';
import TotalStock from '../Owner/Totalstock';
import Barchart2 from '../Owner/Barchart2';

ChartJS.register(CategoryScale, LinearScale, BarElement);

const Reports = () => {
  return (
    <div className='report'>
      <center><h2 style={{fontSize: "52px",  width: "100%", backgroundColor: "rgba(0, 0, 0, 0.8)", height: "100%", color: "rgba(255, 255, 0, 0.8)", paddingTop: "20px"}}>Dashboard</h2></center>
      <div className='de1'>
        <div className='front'>
          <div className='w1'><Nochart /></div>
          <div className='w2'><TotalSales /></div>
          <div className='w3'><TotalStock /></div>
        </div>
        <div className='back'>
          <div className='bar-chart-container'><BarChart /></div>
          {/* <div className='pie-chart-container'><PieChart /></div> */}
          <div className='pie-chart-container'><Barchart2 /></div>
        </div>
      </div>
    </div>
  );
};

export default Reports;

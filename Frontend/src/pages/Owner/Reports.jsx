import React from 'react';
import './Reports.css';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement } from 'chart.js';
import BarChart from '../Owner/Barchart';
import PieChart from '../Owner/Piechart';
import Nochart from '../Owner/Nochart';
import TotalSales from '../Owner/Totalsales';
import TotalStock from '../Owner/Totalstock';

ChartJS.register(CategoryScale, LinearScale, BarElement);

const Reports = () => {
  return (
    <div className='report'>
      <center><h2 style={{fontSize: "52px", marginTop: "20px", marginBottom: "20px"}}>Report Page</h2></center>
      <div className='de1'>
        <div className='front'>
          <div className='w1'><Nochart /></div>
          <div className='w2'><TotalSales /></div>
          <div className='w3'><TotalStock /></div>
        </div>
        <div className='back'>
          <div className='bar-chart-container'><BarChart /></div>
          <div className='pie-chart-container'><PieChart /></div>
        </div>
      </div>
    </div>
  );
};

export default Reports;

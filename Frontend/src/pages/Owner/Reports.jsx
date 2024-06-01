import React, { useRef, useEffect } from 'react';
import { useState } from 'react';
import axios from 'axios';
import './Reports.css';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement } from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, BarElement);

const Reports = () => {
  
  return (
    <div className='report'>
      <h2>Report Page</h2>
      <div className='de1'>
        <span>Hi</span>
      </div>
    </div>
  );
};

export default Reports;

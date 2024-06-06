import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Nocharts = () => {
  const [topItems, setTopItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    axios.get('http://localhost:5000/get_reports2')
      .then(response => {
        setTopItems(response.data);
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
    <div style={{marginTop: "30px"}}>
      <h2>Last 30 Days Top 3 <br/>Selling Items</h2>
      <div className='ed' style={{justifyContent: 'center', fontSize: "20px", textAlign: "left", marginLeft: "70px", marginTop: "20px"}}>
      <ol>
        {topItems.map((item, index) => (
          <li key={index} style={{marginTop: '10px'}}>
            {item.itemName} = <b>{item.totalQuantity} Packets</b> 
          </li>
        ))}
      </ol>
      </div>
    </div>
  );
};

export default Nocharts;

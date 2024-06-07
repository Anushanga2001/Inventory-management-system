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
    <div style={{border: "1px solid black", marginLeft: "50px", marginRight: "50px", borderRadius: "20px",
    marginTop: "5px", height: "250px", alignItems: "center", backgroundColor: "rgba(0, 255, 123, 0.5)", color: "black"}}>
      <h2 style={{marginTop: "20px", color: "black"}}>Last 30 Days Top 3 <br/>Selling Items</h2>
      <div className='ed' style={{justifyContent: 'center', fontSize: "20px", width: "400px", textAlign: "left", marginLeft: "30px", marginRight: "30px", marginTop: "20px"}}>
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

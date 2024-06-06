import React from 'react';
import cImage from '../assets/01.png';

export default function LeftComponent() {
  return (
    <div style={{
      position: 'relative',
      width: '50vw',
      height: '100vh'
    }}>
      <img src={cImage} alt="Description of the image" style={{ width: '100%', height: '100%', filter: 'blur(2px)'  }} />
      <h1 style={{
        position: 'absolute',
        top: '40%',
        left: '50%',
        transform: 'translate(-50%, -50%)', color: 'black', fontStyle: 'italic', fontSize: '100px'
      }}>Radeepa Distributors</h1>
    </div>
    
  );
}

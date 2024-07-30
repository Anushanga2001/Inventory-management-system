import React, { useState, useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';

export default function Map() {
  const [position, setPosition] = useState(null); // Start with null position
  const [loading, setLoading] = useState(true); // Loading state

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (pos) => {
          const { latitude, longitude } = pos.coords;
          setPosition([latitude, longitude]);
          setLoading(false); // Position obtained, set loading to false
        },
        (err) => {
          console.error(err);
          setPosition([7.2536, 80.3407]); // Default to Kegalle, Sri Lanka on error
          setLoading(false); 
        }
      );
    } else {
      setPosition([7.2536, 80.3407]); // Default to Kegalle, Sri Lanka if geolocation is not supported
      setLoading(false); 
    }
  }, []);

  if (loading) {
    return <div>Loading...</div>; 
  }

  return (
    <MapContainer center={position} zoom={13} style={{ height: '100vh', width: '100%' }}>
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      />
      <Marker position={position}>
        <Popup>
          Your current location
        </Popup>
      </Marker>
    </MapContainer>
  );
}

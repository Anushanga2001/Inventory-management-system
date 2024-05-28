import React from 'react'

export default function Map() {
  return (
    <div className="map">
      <iframe
        width="450"
        height="250"
        frameborder="0" style={{ border: 0 }}
        referrerpolicy="no-referrer-when-downgrade"
        src="https://www.google.com/maps/embed/v1/place?key=YOUR_API_KEY&q=Eiffel+Tower,+Paris,+France"
        allowfullscreen>
      </iframe>
    </div>
  )
}

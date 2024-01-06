import React from 'react';
import './Rooms.css'

const RoomCard = ({ title, allow, imageUrl, imageUrlHover, roomLink }) => {
  return (
    <div className="room-card">
      <div className="room-image">
        <img 
          src={imageUrl} 
          alt={title} 
          className="imageUrl"
        />
        <img 
          src={imageUrlHover} 
          alt={title} 
          className="imageUrlHover"
        />
      </div>
      <div className="room-content">
        <h3>{title}</h3>
        <h2>{allow}</h2>
        <button className='room-link' onClick={() => window.location.href=roomLink}>More Info</button>
        <button className='book-now'>Book Now</button>
      </div>
    </div>
  );
};

export default RoomCard;

import React from 'react';
import './Rooms.css'
import { Link } from 'react-router-dom'; // Import Link


const RoomCard = ({ title, allow, imageUrl, imageUrlHover }) => {
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
        <Link to={`/booking`} className='book-now'>
          Book Now
        </Link>
      </div>
    </div>
  );
};

export default RoomCard;

import React from 'react';
import { useNavigate } from 'react-router-dom';
import './MyBooking.css'; // Import the CSS file
import ghimages from "../images/room6o.jpg";

const MyBooking = () => {
  const navigate = useNavigate();

  const handleGoBack = () => {
    navigate(-1); // Go back to the previous page
  };

  return (
    <div className="MyBooking-container">
      <button onClick={handleGoBack} className="MyBooking-back-button">Back</button>
      
      {[1, 2, 3].map((card, index) => (
        <div key={index} className="MyBooking-card">
          <img src={ghimages} alt="Room" className="MyBooking-card-image" />
          <div className="MyBooking-card-content">
            <h3>Room Name</h3>
            <p>Price: $100</p>
            <p>Date: 2024-01-11</p>
            <p>Name: John Doe</p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default MyBooking;

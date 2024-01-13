import React, { useContext } from 'react';
import './Rooms.css';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../AuthContext'; // Import the AuthContext

const RoomCard = ({ title, info, price, imageUrl, imageUrlHover }) => {
  const navigate = useNavigate();
  const { isLoggedIn } = useContext(AuthContext); // Use the AuthContext

  const handleBookNowClick = () => {
    // Check if the user is logged in
    if (!isLoggedIn) {
      // If not logged in, show a confirmation popup
      const confirmLogin = window.confirm('You need to log in first. Do you want to log in?');

      // If the user clicks "OK" in the confirmation popup, redirect to the login page
      if (confirmLogin) {
        navigate('/login');
      }
    } else {
      // If the user is logged in, proceed with the booking page redirection
      navigate('/booking');
    }
  };

  return (
    <div className="room-card">
      <div className="room-image">
        <img src={imageUrl} alt={title} className="imageUrl" />
        <img src={imageUrlHover} alt={title} className="imageUrlHover" />
      </div>
      <div className="room-content">
        <h3>{title}</h3>
        <h3>{price}</h3>
        <p>{info}</p>
        <button className='book-now' onClick={handleBookNowClick}>
          Book Now
        </button>
      </div>
    </div>
  );
};

export default RoomCard;

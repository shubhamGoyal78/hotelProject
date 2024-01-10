// Confirm.js
import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom'; // Import useLocation
import Lottie from 'lottie-web';
import animationData from '../images/lotties.json';
import './Confirm.css';

const Confirm = () => {
  const location = useLocation();
  const bookingId = location.state?.bookingId;
  useEffect(() => {
    const animationContainer = document.querySelector('.lottie-animation');
    Lottie.loadAnimation({
      container: animationContainer,
      renderer: 'svg',
      loop: false,
      autoplay: true,
      animationData: animationData
    });

    return () => {
      animationContainer.innerHTML = '';
    };
  }, []);


  return (
    <div className="confirm-page">
      <div className='animePara'>
        <h2 className="confirm-heading">Your Room is Reserved. Thank You!</h2>
        {bookingId && <p>Your Booking ID: {bookingId}</p>} {/* Display the booking ID */}
        <div className="lottie-animation"></div>
      </div>
    </div>
  );
};

export default Confirm;

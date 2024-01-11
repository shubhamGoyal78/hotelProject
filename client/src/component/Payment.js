import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import './Payment.css';
import room1 from '../images/room1.jpg';
import room2 from '../images/room2.jpg';
import room3 from '../images/room3.jpg';  
import room4 from '../images/room4.jpg';
import room5 from '../images/room5.jpg';

const Payment = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [bookingData, setBookingData] = useState(location.state?.bookingData);

  

  const generateBookingId = () => {
    // Generate a string of random alphanumeric characters
    let randomString = Math.random().toString(36).substring(2, 8);
    
    // Ensure the string is exactly 6 characters long
    while (randomString.length < 6) {
      randomString += Math.random().toString(36).substring(2, 8);
    }
  
    // Use only the first 6 characters
    randomString = randomString.substring(0, 6);
  
    return `${randomString.toUpperCase()}`;
  };
  
  console.log(generateBookingId());
  

  useEffect(() => {
    setBookingData((currentBookingData) => {
      if (currentBookingData && !currentBookingData.bookingId) {
        return {
          ...currentBookingData,
          bookingId: generateBookingId(),
        };
      }
      return currentBookingData;
    });
  }, []);

  const handleConfirmBooking = async () => {
    try {
      const response = await fetch('http://localhost:5000/api/payment', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(bookingData),
      });
  
      if (!response.ok) {
        // If the response is not ok, throw an error with the status
        throw new Error(`HTTP error! status: ${response.status}`);
      }
  
      const data = await response.json();
  
      if (data.success) {
        console.log('Booking confirmed successfully!');
        navigate('/confirm', { state: { bookingId: bookingData.bookingId } });
      } else {
        navigate('/confirm', { state: { bookingId: bookingData.bookingId } });
      }
    } catch (error) {
      // Log the error message if it exists, else log the entire error object
      console.error('Error confirming booking:', error.message || error);
      navigate('/successfull');
    }
  };

  if (!bookingData) {
    return <div>No booking data found.</div>;
  }

  const roomImageMap = {
    'Standard Room': room1,
    'Deluxe Room': room2,
    'Premier Room': room3,
    'Family Suite': room4,
    'Luxury Suite': room5,
    'Presidential Suite': room5,
  };

  return (
    <div className="payment-card">
      <div className="payment-image">
        <img
          src={roomImageMap[bookingData.selectedRoom]}
          alt={bookingData.selectedRoom}
        />
      </div>
      <div className="payment-content">
        <div>
          <h2 className='pppage'>{bookingData.selectedRoom}</h2>
         

          <p className='paragg'><span className='spangg'>Start Date:</span> {bookingData.startDate.toDateString()}</p>
          <p className='paragg'><span className='spangg'>End Date:</span> {bookingData.endDate.toDateString()}</p>
          <p className='paragg'><span className='spangg'>Email: </span>{bookingData.userEmail}</p>
          <p className='paragg'><span className='spangg'>Phone: </span>{bookingData.userPhone}</p>
          <p className='paragg'><span className='spangg'>Adults:</span> {bookingData.adults}</p>
          <p className='paragg'><span className='spangg'>Children: </span>{bookingData.children}</p>
          <p className='paragg'><span className='spangg'>Message: </span>{bookingData.userMessage}</p>
          <p className='paragg'><span className='spangg'>Total Price: </span>{bookingData.price}</p>
          <button className="confirmbk" onClick={handleConfirmBooking}>
            Confirm Booking
          </button>
          
        </div>
      </div>
    </div>
  );
};

export default Payment;

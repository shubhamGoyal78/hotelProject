import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import './MyBooking.css'

const MyBooking = () => {
  const location = useLocation();
  const locationBookingDetails = location.state?.bookingDetails;

  // Define a state for booking details
  const [bookingDetails, setBookingDetails] = useState(locationBookingDetails);

  // Save booking details to localStorage
  useEffect(() => {
    if (bookingDetails) {
      localStorage.setItem('bookingDetails', JSON.stringify(bookingDetails));
    }
  }, [bookingDetails]);

  // Retrieve booking details from localStorage
  useEffect(() => {
    if (!bookingDetails) {
      const storedBookingDetails = localStorage.getItem('bookingDetails');
      if (storedBookingDetails) {
        // Parse the stored JSON string and update the state
        setBookingDetails(JSON.parse(storedBookingDetails));
      }
    }
  }, [bookingDetails]);

  if (!bookingDetails) {
    return <div>No booking details found.</div>;
  }

  return (
    <div className="MyBooking-card">
      <img src={bookingDetails.roomImage} alt="Room" className="MyBooking-card-image" />
      <div className="MyBooking-card-content">
        <h3>Room Name: {bookingDetails.roomName}</h3>
        <p>Name: {bookingDetails.name}</p>
        <p>Price: ₹{bookingDetails.price / 100}</p>
        <p>Date: {bookingDetails.date}</p>
      </div>
      <p className='gg-book'>Booking Confirmed</p>
    </div>
  );
};

export default MyBooking;

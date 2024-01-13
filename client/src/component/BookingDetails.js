import React, { useEffect, useState } from 'react';
import './BookingsDetails.css'; // Ensure this imports the CSS correctly

const BookingDetails = () => {
  const [bookingData, setBookingData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('http://localhost:5000/api/bookings');
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        setBookingData(data);
      } catch (error) {
        console.error('Failed to fetch booking data:', error);
      }
    };

    fetchData();
  }, []);

  return (
    <div>
      <h2>Booking Details</h2>
      <table className="Booking-details-table">
        <thead>
          <tr>
            <th>S.No</th>
            <th>Room</th>
            <th>Name</th>
            <th>Email</th>
            <th>Phone</th>
            <th>Adults</th>
            <th>Children</th>
            <th>Message</th>
            <th>Total Price</th>
            <th>Start Date</th>
            <th>End Date</th>
          </tr>
        </thead>
        <tbody>
          {bookingData.length > 0 ? (
            bookingData.map((booking, index) => (
              <tr key={index}>
                <td>{index + 1}</td>
                <td>{booking.selectedRoom}</td>
                <td>{booking.userName}</td>
                <td>{booking.userEmail}</td>
                <td>{booking.userPhone}</td>
                <td>{booking.adults}</td>
                <td>{booking.children}</td>
                <td>{booking.userMessage}</td>
                <td>{booking.price ? (booking.price / 100).toFixed(2) : 'N/A'}</td>
                <td>{new Date(booking.startDate).toLocaleDateString()}</td>
                <td>{new Date(booking.endDate).toLocaleDateString()}</td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="10">No booking data available.</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default BookingDetails;

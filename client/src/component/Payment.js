import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import './Payment.css';
import room1 from '../images/room1.jpg';
import room2 from '../images/room2.jpg';
import room3 from '../images/room3.jpg';  
import room4 from '../images/room4.jpg';
import room5 from '../images/room5.jpg';
import room6 from '../images/room6.jpg'

const Payment = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [bookingData, setBookingData] = useState(location.state?.bookingData);

  
  const roomImageMap = {
    'Standard Room': room1,
    'Deluxe Room': room2,
    'Premier Room': room3,
    'Family Suite': room4,
    'Luxury Suite': room5,
    'Presidential Suite': room6,
    };

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
  const loadRazorpay = (src) => {
    return new Promise(resolve => {
      const script = document.createElement('script');
      script.src = src;
      script.onload = () => {
        resolve(true);
      };
      script.onerror = () => {
        resolve(false);
      };
      document.body.appendChild(script);
    });
  };
  

  const handleConfirmBooking = async () => {
    try {
      // Call your backend to create a new order
      const bookingResponse = await fetch('http://localhost:5000/api/booking', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          selectedRoom: bookingData.selectedRoom,
          startDate: bookingData.startDate.toISOString(), // Convert to ISO string
          endDate: bookingData.endDate.toISOString(), // Convert to ISO string
          adults: bookingData.adults,
          children: bookingData.children,
          price:bookingData.price, // You need to implement a function to get the price

          userName: bookingData.userName,
          userEmail: bookingData.userEmail,
          userPhone: bookingData.userPhone,
          userMessage: bookingData.userMessage,
        }),
      });
  
      if (!bookingResponse.ok) {
        throw new Error(`HTTP error! status: ${bookingResponse.status}`);
      }
  
    await bookingResponse.json();
  
      // Now that the booking is created, proceed to payment
      const orderResponse = await fetch('http://localhost:5000/api/razorpay', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ amount: bookingData.price }),
      });
  
      if (!orderResponse.ok) {
        throw new Error(`HTTP error! status: ${orderResponse.status}`);
      }
  
      const orderData = await orderResponse.json();
  
      // Load Razorpay script
      const res = await loadRazorpay('https://checkout.razorpay.com/v1/checkout.js');
  
      if (!res) {
        alert('Razorpay SDK failed to load. Are you online?');
        return;
      }
  
      const options = {
        key: 'rzp_test_wFFALgHfXOrETo', // Replace with your key
        currency: orderData.currency,
        amount: orderData.amount.toString(),
        order_id: orderData.id,
        name: 'Room Booking',
        description: 'Thank you for choosing us.',
        handler: function (response) {
          // Handle the payment success
          alert(response.razorpay_payment_id);
          alert(response.razorpay_order_id);
          alert(response.razorpay_signature);
          // Navigate to success page or do whatever you want
          navigate('/my-booking', { 
            state: { 
              bookingDetails: {
                roomName: bookingData.selectedRoom,
                roomImage: roomImageMap[bookingData.selectedRoom],
                name: bookingData.userName,
                price: bookingData.price,
                date: `${bookingData.startDate.toDateString()} - ${bookingData.endDate.toDateString()}`
              }
            } 
          });
        },
        prefill: {
          name: bookingData.userName,
          email: bookingData.userEmail,
          contact: bookingData.userPhone,
        },
      };
  
      const paymentObject = new window.Razorpay(options);
      paymentObject.open();
    } catch (error) {
      console.error('Error confirming booking:', error);
      navigate('/error');
    }
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
          <p className='paragg'><span className='spangg'>Name:</span> {bookingData.userName}</p>
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
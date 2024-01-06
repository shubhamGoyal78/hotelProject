import React from 'react';
import { Link } from 'react-router-dom'; // Assuming you're using react-router for navigation
import './Navigation.css'; // Make sure to create a corresponding CSS file for styling
import logo from '../images/logo.png'

const Navigation = () => {
  return (

    <nav className="navbar">
      <div className="navbar-logo">
        <img src={logo} alt="Company Logo" />
      </div>

      <div className="navbar-links">
        <Link to="/">Home</Link>
        <Link to="/rooms">Rooms</Link>
        <Link to="/booking">Booking</Link>
        <Link to="/gallery">Gallery</Link>
        <Link to="/contact">Contact</Link>
        <Link to="/career">Career Page</Link>
      </div>

      <div className="navbar-booking">
      <Link to="/rooms">
        <button>Book Now</button>
        </Link>
      </div>
    </nav>
  );
};

export default Navigation;

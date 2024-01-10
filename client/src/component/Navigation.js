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
        <Link to="/about">About Us</Link>
        <Link to="/rooms">Booking</Link>
        <Link to="/gallery">Gallery</Link>
        <Link to="/contact">Contact</Link>
      </div>

      <div className="navbar-booking">
      <Link to="/signup">
        <button className='btn btn-sm '>Login</button>
        </Link>
      </div>
    </nav>
  );
};

export default Navigation;

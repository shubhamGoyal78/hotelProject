import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import './Navigation.css';
import logo from '../images/logo.png';
import userIcon from '../images/icon-user.png';
import { AuthContext } from '../AuthContext';

const Navigation = () => {
  const { isLoggedIn, setIsLoggedIn } = useContext(AuthContext);

  const handleLogout = () => {
    setIsLoggedIn(false);
    localStorage.removeItem('isLoggedIn'); // Remove login state from localStorage
    // Clear any stored authentication tokens or user data here
  };

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
  {isLoggedIn && (
    <Link to="/my-booking">
      <button className='btn btn-sm booking-my'>
        <span className="btn-text">My Booking</span>
      </button>
    </Link>
  )}
  {!isLoggedIn ? (
    <Link to="/login">
      <button className='btn btn-sm'>
        <img src={userIcon} alt="User Icon" className="user-icon" />
        <span className="btn-text">Login</span>
      </button>
    </Link>
  ) : (
    <button onClick={handleLogout} className='btn btn-sm'>
      <img src={userIcon} alt="User Icon" className="user-icon" />
      <span className="btn-text">Logout</span>
    </button>
  )}
</div>

    </nav>
  );
};

export default Navigation;

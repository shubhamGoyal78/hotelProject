import React from 'react';
import './SplashScreen.css';
import logo from './images/logo.png';

const SplashScreen = () => {
  return (
    <div className="container">
    <div className="splash-screen">
      <img src={logo} alt="Logo" />
      <div className="progress-bar">
        <div className="progress"></div>
      </div>
    </div>
    </div>
  );    
};

export default SplashScreen;

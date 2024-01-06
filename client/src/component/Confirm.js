// Confirm.js
import React, { useEffect } from 'react';
import Lottie from 'lottie-web';
import animationData from '../images/lotties.json';
import './Confirm.css';

const Confirm = () => {
  useEffect(() => {
    const animationContainer = document.querySelector('.lottie-animation');
    Lottie.loadAnimation({
      container: animationContainer,
      renderer: 'svg',
      loop: false,
      autoplay: true,
      animationData: animationData
      // No need to set rendererSettings if the default works fine
    });

    return () => {
      animationContainer.innerHTML = '';
    };
  }, []);


  return (
    <div className="confirm-page">
      <div className='animePara'>
        <h2 className="confirm-heading">Your Room is Reserved. Thank You!</h2>
        <div className="lottie-animation"></div>
      </div>
    </div>
  );
};

export default Confirm;

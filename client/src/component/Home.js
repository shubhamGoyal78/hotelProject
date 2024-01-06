import React from 'react';
import './Home.css'; // Make sure to import the CSS file
import full from '../images/full.webm';
import { Link } from 'react-router-dom';
  const Home = () => {
  return (
    <div className="container">
      <div className="home-container">
        <video className="background-video" autoPlay loop muted>
          <source src={full} type="video/webm" />
          
          Your browser does not support the video tag.
        </video>
        <div className="centered-text">
        <h1 className='large-heading'>Enjoy Your Dream Vacation</h1>
        <p className="desc">
        The Seaside Hotel is the right choice for visitors who are searching for a combination of charm, peace and, comfort.
        </p>
        <Link to="/rooms">
        <button className="hover-button">CHOOSE ROOM</button>
        </Link>
      </div>        
      </div>
    </div>
  );
};

export default Home;
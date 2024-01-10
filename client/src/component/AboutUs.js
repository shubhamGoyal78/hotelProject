import React from 'react';
import './AboutUs.css';
import bgImage from '../images/amenities-img.webp'; // Replace with your actual background image path
import image1 from '..//images/bg-contact.jpg'; // Replace with your actual image paths
import image2 from '..//images/bg-payment.jpg';
import image3 from '../images/myImage5.jpg';
import Navigation from './Navigation';

const AboutUs = () => {
  return (
    <div className="aboutus-container" style={{ backgroundImage: `url(${bgImage})` }}>
    <Navigation/>
      <h1 className="main-heading">Our Story</h1> {/* Example heading */}
      
      <section className="content-section">
        <h2 className="sub-heading c-appeared">Our Mission</h2>
        <p className="text c-appeared">[Your mission statement or introduction text here]</p>
      </section>

      <div className="image-text-section c-appeared">
        <img src={image1} alt="Description" />
        <div>
          <h3>Quality Services</h3>
          <p>[Text about quality services]</p>
        </div>
      </div>

      <div className="text-image-section c-appeared">
        <div>
          <h3>Exceptional Experiences</h3>
          <p>[Text about exceptional experiences]</p>
        </div>
        <img src={image2} alt="Description" />
      </div>

      <div className="image-text-section c-appeared">
        <img src={image3} alt="Description" />
        <div>
          <h3>Innovative Solutions</h3>
          <p>[Text about innovative solutions]</p>
        </div>
      </div>

      {/* Additional sections as needed */}
    </div>
  );
};

export default AboutUs;

import React from 'react';
import './AboutUs.css';
import image1 from '../images/sea_restaurant.webp'; // Corrected the path
import image2 from '../images/seabob.jpg'; // Corrected the path
import image3 from '../images/gym_hi.jpg';
import Navigation from './Navigation';

const AboutUs = () => {
  return (
    <div className="aboutus-container">
      <Navigation/>

      <div className="background-section">

        
      </div>

      <section className="content-section">
        <h2 className="sub-heading">Our Services</h2>
      </section>

      <div className="image-text-section">
        <img src={image1} alt="Description" />
        <div>
          <p className='para-image'>Discover an unparalleled dining experience at our luxurious hotel restaurant. Immerse yourself in a world of culinary excellence where each dish is a masterpiece, meticulously crafted by our expert chefs. Indulge your senses with a symphony of flavors, as our restaurant takes you on a gastronomic journey. From exquisite appetizers to decadent desserts, every bite is a celebration of taste and sophistication. Our elegant ambiance and attentive service elevate your dining experience, ensuring moments of pure delight that linger in your memory.</p>
        </div>
      </div>

      <div className="text-image-section">
        <div>
          <p className='para-mid' >Embark on thrilling sea adventures with our exclusive seabob activities. Dive into the crystal-clear waters and feel the exhilaration of gliding effortlessly through the ocean. Seabob offers a unique underwater experience, combining speed and agility as you explore the marine wonders. Whether you're a seasoned adventurer or a first-time explorer, our seabob activities provide an adrenaline-pumping aquatic escapade. Discover the beauty beneath the waves and create lasting memories with family and friends in the heart of the sea.</p>
        </div>
        <img src={image2} alt="Description" />
      </div>

      <div className="image-text-section">
        <img src={image3} alt="Description" />
        <div>
          <p className='para-image'>Revitalize your body and mind in our state-of-the-art luxurious gym. Designed for those who seek the pinnacle of fitness, our gym offers a haven of wellness and strength. Unleash your potential with cutting-edge equipment, personalized training programs, and expert guidance from fitness professionals. As you work towards your fitness goals, surround yourself with an atmosphere of opulence and comfort. Rejuvenate with spa-like amenities, energize with invigorating workouts, and embrace a holistic approach to well-being in our exclusive, luxurious gym facility.





</p>
        </div>
      </div>

      {/* Additional sections as needed */}
    </div>

  );
};

export default AboutUs;

import React from 'react';
import './Gallery.css'; // Correct way to import the CSS file
import myImage1 from '../images/myImage1.jpg'
import myImage2 from '../images/myImage2.jpg'
import myImage3 from '../images/myImage3.jpg'
import myImage4 from '../images/myImage4.jpg'
import myImage5 from '../images/myImage5.jpg'
import myImage6 from '../images/myImage6.jpg'
import myImage7 from '../images/myImage7.jpg'

const Gallery = () => {
  
  return (
    <div className="gallery-background">
      <div className="overlay"></div> {/* Add this line */}
      <header className="header">
        <h1 className="title">Latest</h1>
        <h2 className="second-title">Gallery</h2>
      </header>
      <section className="gallery-container">
        <div className="gallery">
        <img src={myImage1} className="myImage1" alt="Description" />
         <img src={myImage2} className="myImage2" alt="Description" />
          <img src={myImage3} className="myImage3" alt="Description" />
           <img src={myImage4} className="myImage4" alt="Description" />
    <img src={myImage5} className="myImage5" alt="Description" />
    <img src={myImage6} className="myImage6" alt="Description" />
    <img src={myImage7} className="myImage7" alt="Description" />

        </div>
      </section>
    </div>
  );
};

export default Gallery;

import React, { useState, useEffect } from 'react';
import RoomCard from './RoomCard'; // Import the RoomCard component
import './Rooms.css';
import room1 from '../images/room1.jpg'
import room1o from '../images/room1o.jpg'
import room2 from '../images/room2.jpg'
import room2o from '../images/room2o.jpg'
import room3 from '../images/room3.jpg'
import room3o from '../images/room3o.jpg'
import room4 from '../images/room4.jpg'
import room4o from '../images/room4o.jpg'
import room5 from '../images/room5.jpg'
import room5o from '../images/room5o.jpg'
import room6 from '../images/room6.jpg'
import room6o from '../images/room6o.jpg'

const Rooms = () => {
  const [showContent, setShowContent] = useState(false);

  useEffect(() => {
    setTimeout(() => {
      setShowContent(true);
    }, 1500);
  }, []);

  return (
    <div className="rooms-page">
    <div className="background-overlay"></div>
      {showContent && (
        <>
          <h2 className="select-rooms-title">Select</h2>
          <h2 className="title2">Rooms</h2>
          <div className="rooms-container">
            <RoomCard 
              title="Standard Room" 
              allow="2 Guests"
              imageUrl={room1} 
              imageUrlHover={room1o} 
              roomLink="/path/to/room1"
            />
             <RoomCard 
              title="Deluxe Room" 
              allow="2 Guests"
              imageUrl={room2} 
              imageUrlHover={room2o}
              roomLink="/path/to/room1"
            /> <RoomCard 
              title="Deluxe Room" 
              allow="4 Guests"

              imageUrl={room3} 
              imageUrlHover={room3o} 
              roomLink="/path/to/room1"
            /> <RoomCard 
              title="Deluxe Room" 
              allow="4 Guests"

              imageUrl={room4}
              imageUrlHover={room4o} 
              roomLink="/path/to/room1"
            /> <RoomCard 
              title="Deluxe Room" 
              allow="4 Guests"

              imageUrl={room5}
              imageUrlHover={room5o} 
              roomLink="/path/to/room1"
            /> <RoomCard 
              title="Deluxe Room" 
              allow="4 Guests"

              imageUrl={room6}
              imageUrlHover={room6o} 
              roomLink="/path/to/room1"
            />
            {/* Add more RoomCard components for other rooms */}
          </div>
        </>
      )}
    </div>
  );
};

export default Rooms;

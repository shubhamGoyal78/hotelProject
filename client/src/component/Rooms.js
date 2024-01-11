import React from "react"; // Import React
import RoomCard from "./RoomCard";
import "./Rooms.css";
import room1 from "../images/room1.jpg";
import room1o from "../images/room1o.jpg";
import room2 from "../images/room2.jpg";
import room2o from "../images/room2o.jpg";
import room3 from "../images/room3.jpg";
import room3o from "../images/room3o.jpg";
import room4 from "../images/room4.jpg";
import room4o from "../images/room4o.jpg";
import room5 from "../images/room5.jpg";
import room6 from "../images/room6.jpg";

import room5o from "../images/room5o.jpg";
import room6o from "../images/room6o.jpg";
import Navigation from "./Navigation";

const Rooms = () => {
  return (
    <div className="rooms-page">
      <div className="room-navbar">
        <Navigation />

        <>
          <h2 className="select-rooms-title">Select</h2>
          <h2 className="title2">Rooms</h2>
          <div className="rooms-container">
            <RoomCard
              title="Standard Room"
              info="The Standard Room offers a cozy and comfortable stay, perfect for travelers seeking simplicity and affordability. Featuring essential amenities, a plush bed, and a well-appointed bathroom, it's an ideal choice for brief stays or solo travelers."
              price="₹2000"
              imageUrl={room1}
              imageUrlHover={room1o}
            />
            <RoomCard
              title="Deluxe Room"
              price="₹5000"
              info="Our Deluxe Room combines comfort with a touch of luxury. Spacious and elegantly furnished, it includes a larger bed, premium linens, a seating area, enhanced amenities, and often a scenic view, catering to both business and leisure guests."
              imageUrl={room2}
              imageUrlHover={room2o}
            />{" "}
            <RoomCard
              title="Premier Room"
              price="₹10000"
              info="The Premier Room is designed for discerning guests seeking an elevated experience. Boasting superior furnishings, ample space, sophisticated decor, and top-tier amenities, it provides a perfect blend of luxury and comfort for a memorable stay."
              imageUrl={room3}
              imageUrlHover={room3o}
            />{" "}
            <RoomCard
              title="Family Suite"
              price="₹15000"
              info="Tailored for family stays, our Family Suite features multiple bedrooms, a living area, and often a kitchenette. It's spacious, ensuring privacy and comfort, and equipped with family-friendly amenities, making it an ideal home away from home."
              imageUrl={room4}
              imageUrlHover={room4o}
            />{" "}
            <RoomCard
              title="Luxury Suite"
              price="₹20000"
              info="Our Luxury Suite epitomizes opulence and exclusivity. It boasts a lavish bedroom, a sumptuous living area, a state-of-the-art bathroom, and often extras like a private balcony. Exquisite decor and impeccable service ensure a stay beyond compare."
              imageUrl={room5}
              imageUrlHover={room5o}
            />{" "}
            <RoomCard
              title="Presedential Suite"
              price="₹25000"
              info="The Presidential Suite represents the pinnacle of luxury. Unmatched in grandeur, it offers expansive living spaces, elegant bedrooms, a top-notch entertainment system, a private study, and often personal butler service, catering to elite tastes and utmost privacy."
              imageUrl={room6}
              imageUrlHover={room6o}
            />
          </div>
        </>
      </div>
    </div>
  );
};

export default Rooms;

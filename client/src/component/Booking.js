import React, { useState, useEffect } from "react";
import bgbooking from "../images/bgbooking.jpg";
import DatePicker from "react-datepicker";
import { useNavigate } from "react-router-dom";

import "react-datepicker/dist/react-datepicker.css";
import "./Booking.css";
import Navigation from "./Navigation";

const Booking = () => {
  const navigate = useNavigate();

  const [selectedRoom, setSelectedRoom] = useState("Standard Room");
  const [selectedTimeSlot, setSelectedTimeSlot] = useState(null);
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [adults, setAdults] = useState(1);
  const [children, setChildren] = useState(0);
  useEffect(() => {
    const savedFormData = sessionStorage.getItem("bookingFormData");
    if (savedFormData) {
      setFormData(JSON.parse(savedFormData));
    }
  }, []);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
    phone: "",
  });
  const getPrice = (roomType, numberOfDays) => {
    const basePricePerDay = {
      "Standard Room": 200000,
      "Deluxe Room": 500000,
      "Premier Room": 1000000,
      "Family Suite": 1500000,
      "Luxury Suite": 2000000,
      "Presidential Suite": 2500000,
    };
    const basePrice = basePricePerDay[roomType] || 0;
    const totalPrice = basePrice * numberOfDays;

    return totalPrice;
  };

  const [errors, setErrors] = useState({
    email: "",
    phone: "",
    adults: "",
    date: "",
    timeSlot: "",
  });

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  const handleRoomChange = (event) => {
    const newSelectedRoom = event.target.value || "Standard Room"; // Set to 'Standard Room' if empty
    setSelectedRoom(newSelectedRoom);
  };

  const padOptionText = (text, totalLength = 50) => {
    let paddedText = text;
    while (paddedText.length < totalLength) {
      paddedText += " ";
    }
    return paddedText;
  };

  const onChange = (dates) => {
    const [start, end] = dates;
    setStartDate(start);
    setEndDate(end);
  };

  const timeSlots = [
    "9:00 AM - 10:00 AM",
    "10:00 AM - 11:00 AM",
    "11:00 AM - 12:00 PM (Noon)",
    "12:00 PM (Noon) - 1:00 PM",
  ];

  const handleTimeSlotClick = (timeSlot) => {
    setSelectedTimeSlot(timeSlot);
  };

  const handleAdultsChange = (delta) => {
    setAdults((prev) => Math.max(prev + delta, 1));
  };

  const handleChildrenChange = (delta) => {
    setChildren((prev) => Math.max(prev + delta, 0));
  };

  const isValidEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const validatePhone = (phone) => {
    return phone.match(/^[6789]\d{9}$/);
  };

  // const performFormSubmission = () => {
  //   console.log('Form submitted:', formData);
  //   // Proceed with form submission logic
  // };

  const handleSubmit = (event) => {
    event.preventDefault();

    // Reset error messages
    setErrors({
      email: "",
      phone: "",
      adults: "",
      date: "",
      timeSlot: "",
    });

    // Validation checks
    let hasError = false;

    if (!isValidEmail(formData.email)) {
      setErrors((prev) => ({ ...prev, email: "*Invalid email" }));
      hasError = true;
    }

    if (!validatePhone(formData.phone)) {
      setErrors((prev) => ({ ...prev, phone: "*Incorrect Mobile No." }));
      hasError = true;
    }

    if (adults <= 0) {
      setErrors((prev) => ({
        ...prev,
        adults: "Please select at least one adult",
      }));
      hasError = true;
    }

    if (!startDate || !endDate) {
      setErrors((prev) => ({ ...prev, date: "Please select a date range" }));
      hasError = true;
    }

    if (!selectedTimeSlot) {
      setErrors((prev) => ({ ...prev, timeSlot: "Please select a time slot" }));
      hasError = true;
    }

    if (!hasError) {
      sessionStorage.setItem("bookingFormData", JSON.stringify(formData));
      const startDateObj = new Date(startDate);
      const endDateObj = new Date(endDate);
      const diffInTime = endDateObj.getTime() - startDateObj.getTime();
      const diffInDays = diffInTime / (1000 * 3600 * 24);

      let totalDays;
      if (diffInDays > 0) {
        // If there's a difference, add 1 day to the total
        totalDays = Math.ceil(diffInDays) + 1;
      } else {
        // If no difference (same day check-in and check-out), count as 1 day
        totalDays = 1;
      }

      const totalPrice = getPrice(selectedRoom, totalDays);

      console.log("Form submitted:", formData);
      // Redirect to the payment page with formData
      navigate("/payment", { state: { bookingData: formData } });

      navigate("/payment", {
        state: {
          bookingData: {
            startDate,
            endDate,
            selectedTimeSlot,
            adults,
            children,
            selectedRoom,
            price: totalPrice, // You need to implement a function to get the price
            userName: formData.name,
            userEmail: formData.email,
            userPhone: formData.phone,
            userMessage: formData.message,
          },
        },
      });
    }
  };

  return (

    <div className="booking-container">

    <div className="special-div">
      <div
        className="booking-background"
        style={{
          backgroundImage: `url(${bgbooking})`,
          backgroundAttachment: "fixed",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
          backgroundSize: "cover",
          position: "relative",
        }}
      >
    <Navigation/>

        <header

          className="booking-header"
          style={{ paddingTop: "50px", paddingLeft: "100px" }}
        >
          <h1 style={{ fontSize: "42px", color: "#fff" }}>Booking Page</h1>
        </header>

        <div
          className="booking-card"
          style={{
            background: "rgba(49, 43, 36, 0.6)",
            width: "596px",
            height: "1400px",
            padding: "20px",
            margin: "0 auto",
            marginTop: "50px",
            borderRadius: "10px",
            color: "#fff",
          }}
        >

          <h2>Choose Date</h2>
          <DatePicker
            selected={startDate}
            onChange={onChange}
            startDate={startDate}
            endDate={endDate}
            selectsRange
            inline
          />
          <div className="guests-section">
            <div className="adults-section">
              <h3>Adults</h3>
              <div className="input-group">
                <button onClick={() => handleAdultsChange(-1)}>-</button>
                <input
                  type="number"
                  value={adults}
                  onChange={(e) => setAdults(e.target.value)}
                />
                <button onClick={() => handleAdultsChange(1)}>+</button>
              </div>
            </div>
            <div className="children-section">
              <h3 className="select-room-heading">Children</h3>
              <div className="input-group">
                <button onClick={() => handleChildrenChange(-1)}>-</button>
                <input
                  type="number"
                  value={children}
                  onChange={(e) => setChildren(e.target.value)}
                />
                <button onClick={() => handleChildrenChange(1)}>+</button>
              </div>
            </div>
          </div>
          <div className="time-slots">
            <h3 className="time-slots-heading">Time Slots*:</h3>

            <div className="time-slots-grid">
              {timeSlots.map((slot, index) => (
                <button
                  key={index}
                  className={`time-slot-button ${
                    selectedTimeSlot === slot ? "selected" : ""
                  }`}
                  onClick={() => handleTimeSlotClick(slot)}
                >
                  {slot}
                </button>
              ))}
            </div>
          </div>

          <div className="select-room-section">
            <h3 className="select-room-heading">Select Room:</h3>
            <select
              className="room-options"
              value={selectedRoom}
              onChange={handleRoomChange}
              style={{
                width: "535px",
                height: "45px",
                cursor: "pointer",
                backgroundColor: "transparent",
                color: "white",
                fontSize: "18px",
                fontFamily: "monospace",
                marginTop: "10px", // Adding margin-top here

                // Important for even spacing
              }}
            >
              <option value="Standard Room">
                {padOptionText("Standard Room", 40)}₹2000
              </option>
              <option value="Deluxe Room">
                {padOptionText("Deluxe Room", 40)}₹5000
              </option>
              <option value="Premier Room">
                {padOptionText("Premier Room", 40)}₹10000
              </option>
              <option value="Family Suite">
                {padOptionText("Family Suite", 40)}₹15000
              </option>
              <option value="Luxury Suite">
                {padOptionText("Luxury Suite", 40)}₹20000
              </option>
              <option value="Presidential Suite">
                {padOptionText("Presidential Suite", 40)}₹25000
              </option>
            </select>
          </div>

          <form className="message-form" onSubmit={handleSubmit}>
            <input
              type="text"
              placeholder="Your Name"
              name="name"
              value={formData.name}
              onChange={handleChange}
            />
            <textarea
              placeholder="Your Message"
              name="message"
              value={formData.message}
              onChange={handleChange}
            ></textarea>
            <input
              type="email"
              placeholder="Your Email"
              name="email"
              value={formData.email}
              onChange={handleChange}
            />
            <input
              type="text"
              placeholder="Your Phone"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
            />

            <div className="error-messages">
              <button type="submit" className="btn">
                Book Now
              </button>
              <div className="next-messages">
                {errors.email && <p className="error">{errors.email}</p>}
                {errors.phone && <p className="error">{errors.phone}</p>}
                {errors.adults && <p className="error">{errors.adults}</p>}
                {errors.date && <p className="error">{errors.date}</p>}
                {errors.timeSlot && <p className="error">{errors.timeSlot}</p>}
              </div>
            </div>
          </form>
        </div>
        <footer className="footer">
          <div className="footer-content">
            <p>© 2024 Your Company Name. All Rights Reserved.</p>
            <p>Contact us: email@example.com</p>
            {/* Add more content here as needed */}
          </div>
        </footer>
      </div>
      </div>
    </div>
  );
};

export default Booking;

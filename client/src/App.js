import React, { useState, useEffect } from "react";
import { Routes, Route } from "react-router-dom"; // Only import Routes and Route
import SplashScreen from "./SplashScreen";
// import Navigation from "./component/Navigation";
import Home from "./component/Home";
import Rooms from "./component/Rooms";
import Booking from "./component/Booking";
import Gallery from "./component/Gallery";
import Contact from "./component/Contact";
import Payment from "./component/Payment";
import Confirm from "./component/Confirm";
import SuccessPage from ".//component/Confirm";
import ErrorPage from ".//component/Confirm";
import MyBooking from "./component/MyBooking";
import AboutUs from './/component/AboutUs'
import "./App.css";
import Login from "./component/Login";
import { AuthProvider } from './AuthContext';
import AdminPage from './component/AdminPage';
import Signup from './component/SignUps'
import AdminLogin from "./component/AdminLogin";
function App() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1100);
    return () => clearTimeout(timer);
  }, []);

  return (
    <AuthProvider>

    <div className="App">
      {loading ? (
        <SplashScreen />
      ) : (
        <>
          <Routes>
            <Route exact path="/" element={<Home />} />
            <Route exact path="/rooms" element={<Rooms />} />
            <Route exact path="/booking" element={<Booking />} />
            <Route exact path="/gallery" element={<Gallery />} />
            <Route exact path="/contact" element={<Contact />} />
            <Route exact path="/about" element={<AboutUs />} />
            <Route exact path="/payment" element={<Payment />} />
            <Route exact path="/confirm" element={<Confirm />} />
            <Route exact path="/login" element={<Login />} />
            <Route exact path="/signup" element={<Signup />} />
            <Route exact path="/admin" element={<AdminLogin />} />
            <Route exact path="/admindashboard" element={<AdminPage />} />

            <Route exact path="/successfull" element={<ErrorPage />} />
            <Route exact path="/success" element={<SuccessPage />} />
            <Route exact path="/my-booking" element={<MyBooking />} />

          </Routes>
        </>
      )}
    </div>
  </AuthProvider>

  );
}

export default App;

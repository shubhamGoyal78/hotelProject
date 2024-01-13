import React, { useState } from 'react';
import SignupDetails from './SignupDetails';
import ContactFormDetails from './ContactFormDetails';
import BookingDetails from './BookingDetails';
import './AdminPage.css';

const AdminPage = () => {
  const [selectedTab, setSelectedTab] = useState('signup');

    return (
        <div className="admin-page-container">
        <div className="admin-buttons">
            <button onClick={() => setSelectedTab('signup')}>Signup Details</button>
            <button onClick={() => setSelectedTab('contactForm')}>Contact Form</button>
            <button onClick={() => setSelectedTab('booking')}>Booking Details</button>
        </div>

        <div className="admin-content">
            {selectedTab === 'signup' && <SignupDetails />}
            {selectedTab === 'contactForm' && <ContactFormDetails />}
            {selectedTab === 'booking' && <BookingDetails />}
        </div>
        </div>
    );
    };

    export default AdminPage;

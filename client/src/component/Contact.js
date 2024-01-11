import React, { useState } from 'react';
import './Contact.css';
import Map from './Map';
import Navigation from './Navigation';

const Contact = () => {
  const [success, setSuccess] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    message: '',
    email: '',
    phone: '',
  });
  const [errorMessages, setErrorMessages] = useState({
    email: '',
    phone: '',
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const validatePhone = (phone) => {
    const phoneRegex = /^\d{10}$/;
    return phoneRegex.test(phone);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const isEmailValid = validateEmail(formData.email);
    const isPhoneValid = validatePhone(formData.phone);

    setErrorMessages({
      email: isEmailValid ? '' : 'Invalid email address',
      phone: isPhoneValid ? '' : 'Invalid phone number',
    });

    if (isEmailValid && isPhoneValid) {
      try {
        const response = await fetch('http://localhost:5000/api/contact', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(formData)
        });

        if (response.ok) {
          setSuccess(true);
          setTimeout(() => setSuccess(false), 2000);
          // Reset form or additional logic
        } else {
          // Handle server errors
        }
      } catch (error) {
        console.error('Error submitting form:', error);
      }
    }
  };
  
  return (
    <div className="contact-container">
    <div className='special-div'>
        <Navigation />

      <div className="background-overlay"></div>

      <header className="header">
        <h1 className="title">Make a</h1>
        <h2 className="second-title">Contact</h2>
      </header>

      <section className="contact-section">
        <div className="card big-card">
          <div className="contact-info">
            <h3>SEASIDE Mumbai</h3>
            <p><span>Address:</span> Mumbai</p>
            <p><span>Phone:</span> 99998888777</p>
            <p><span>Email:</span> seaside@gmail.com</p>
            <h4>Send US Message</h4>
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
              <button type="submit" className="btn">Submit</button>

            </form>
            {success && <div className="success-message">Message sent successfully!</div>}
        {errorMessages.email && <p className="error-message">{errorMessages.email}</p>}
        {errorMessages.phone && <p className="error-message">{errorMessages.phone}</p>}
      </div>
          <div className="map-location">
            <Map />
          </div>
        </div>
      </section>

      <footer className="footer">
        <p>Connect with us on social media</p>
      </footer>
        </div>

    </div>
  );
};

export default Contact;

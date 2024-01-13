import React, { useEffect, useState } from 'react';
import './SignupDetails.css'; // Ensure this imports the CSS correctly

const ContactFormDetails = () => {
  const [contactFormData, setContactFormData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('http://localhost:5000/api/contact-form-details');
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        setContactFormData(data);
      } catch (error) {
        console.error('Failed to fetch contact form data:', error);
      }
    };

    fetchData();
  }, []);

  return (
    <div>
      <h2>Contact Form Details</h2>
      <table className="signup-details-table">
        <thead>
          <tr>
            <th>S.No</th>
            <th>Name</th>
            <th>Message</th>
            <th>Email</th>
            <th>Phone</th>
          </tr>
        </thead>
        <tbody>
          {contactFormData.length > 0 ? (
            contactFormData.map((formData, index) => (
              <tr key={index}>
                <td>{index + 1}</td>
                <td>{formData.name}</td>
                <td>{formData.message}</td>
                <td>{formData.email}</td>
                <td>{formData.phone}</td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="5">No contact form data available.</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default ContactFormDetails;

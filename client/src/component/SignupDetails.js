import React, { useState, useEffect } from 'react';
import './SignupDetails.css'; // Import the CSS file for styling

const SignupDetails = () => {
  const [signupData, setSignupData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('http://localhost:5000/api/signup-details');
        const data = await response.json();
        setSignupData(data);
      } catch (error) {
        console.error('Error fetching signup details:', error);
      }
    };

    fetchData();
  }, []);

  return (
    <div>
      <h2>Signup Details</h2>
      {signupData.length > 0 ? (
        <table className="signup-details-table">
          <thead>
            <tr>
              <th>S. No</th>
              <th>Name</th>
              <th>Email</th>
              <th>Phone</th>
              <th>Password</th>
            </tr>
          </thead>
          <tbody>
            {signupData.map((user, index) => (
              <tr key={index}>
                <td>{index + 1}</td>
                <td>{user.name}</td>
                <td>{user.email}</td>
                <td>{user.mobileNumber}</td>
                <td>{user.password}</td> {/* Assuming password is available in the data */}
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p>No signup details available.</p>
      )}
    </div>
  );
};

export default SignupDetails;

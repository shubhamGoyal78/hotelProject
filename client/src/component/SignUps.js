import React, { useState,useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './Signups.css';
import signinlogo from '../images/resort.png';
import axios from 'axios';

const Signups = () => {
    const navigate = useNavigate();
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [mobileNumber, setMobileNumber] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const [showSuccessPopup, setShowSuccessPopup] = useState(false);



    useEffect(() => {
        const inputs = document.querySelectorAll('.signup-input');
        inputs.forEach(input => {
            input.style.setProperty('--placeholder-color', 'white', 'important');
        });
    }, []);

    const handleSignup = async (e) => {
        e.preventDefault();
        const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
        if (!emailRegex.test(email)) {
            setErrorMessage('Invalid email format');
            return;
        }

        // Mobile number validation (starts with 6, 7, 8, or 9 and is 10 digits long)
        const mobileRegex = /^[6-9]\d{9}$/;
        if (!mobileRegex.test(mobileNumber)) {
            setErrorMessage('Mobile number must start with 6, 7, 8, or 9 and be 10 digits long');
            return;
        }

        try {
            const response = await axios.post('http://localhost:5000/api/signup', {
              name, email, password, mobileNumber
            });
            console.log(response.data.message);
            setShowSuccessPopup(true);
          } catch (error) {
            console.error('Signup failed:', error);
            setErrorMessage('Signup failed, please try again');
          }
        };
    const handlePopupOk = () => {
        setShowSuccessPopup(false);
        navigate('/login');
    };
    

    return (
        <div className="signup-container">
            <div className="signup-card">
                <div className="signup-logo-container">
                    <img
                        src={signinlogo}    
                        alt="Hotel Logo"
                        className="signup-logo"
                    />
                </div>
                <h2 className="signup-heading">Sign Up</h2>
                <form className="signup-form" onSubmit={handleSignup}>
                    <input
                        className="signup-input"
                        type="text"
                        placeholder="Name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                    />
                    <input
                        className="signup-input"
                        type="email"
                        placeholder="Email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                    <input
                        className="signup-input"
                        type="password"
                        placeholder="Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                    <input
                        className="signup-input"
                        type="tel"
                        placeholder="Mobile Number"
                        value={mobileNumber}
                        onChange={(e) => setMobileNumber(e.target.value)}
                    />
                    <button className="signup-button" type="submit">Signup</button>
                    {errorMessage && <p className="signup-errorMessage">{errorMessage}</p>}
                </form>
            </div>
            {showSuccessPopup && (
        <div className="success-popup">
            <p>You are successfully signed up!</p>
            <button onClick={handlePopupOk}>OK</button>
        </div>
    )}
        </div>
    );
};

export default Signups;
import React, { useState,useEffect} from 'react';
import './Signups.css';
import signinlogo from '..//images/resort.png';

const Signups = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [mobileNumber, setMobileNumber] = useState('');
    const [errorMessage, setErrorMessage] = useState('');


    useEffect(() => {
        const inputs = document.querySelectorAll('.signup-input');
        inputs.forEach(input => {
            input.style.setProperty('--placeholder-color', 'white', 'important');
        });
    }, []);


    const handleSignup = (e) => {
        e.preventDefault();

        // Email validation
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

        console.log('Signup with', name, email, password, mobileNumber);
        setErrorMessage('');

        // Here you would normally send a request to your server to handle the signup
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
        </div>
    );
};

export default Signups;
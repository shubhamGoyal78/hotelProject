import React, { useState, useContext } from "react";
import { useNavigate, Link } from "react-router-dom";
import loginBackground from "../images/bg-login.jpg";
import "./Login.css";
import axios from "axios";
import { AuthContext } from '../AuthContext'; // Ensure this path is correct

const Login = () => {
  const { setIsLoggedIn } = useContext(AuthContext);

  const navigate = useNavigate();
  const [identifier, setIdentifier] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();
    setErrorMessage(''); // Clear any existing error messages
    try {
      const response = await axios.post("http://localhost:5000/api/login", {
        identifier,
        password,
      });
      console.log(response.data.message);
      setIsLoggedIn(true); // Update login state using context
      localStorage.setItem('isLoggedIn', 'true'); // Set login state in localStorage
      navigate("/"); // Navigate to home page or dashboard as per your application flow
    } catch (error) {
      console.error("Login failed:", error);
      if (error.response && error.response.status === 400) {
        setErrorMessage("Invalid username or password");
      } else {
        setErrorMessage("Login failed. Please try again.");
      }
    }
  };

  return (
    <div className="login-container">
      <div className="login-left">
        <div className="login-card">
          <h1>Login</h1>
          <form onSubmit={handleLogin}>
            <input
              type="text"
              placeholder="Type your email or mobile number"
              value={identifier}
              onChange={(e) => setIdentifier(e.target.value)}
              className="login-input"
            />
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="login-input"
            />
            <button type="submit" className="login-button">
              Login
            </button>
            {errorMessage && <div className="error-message">{errorMessage}</div>}
          </form>
          <p>
            Don't have an account? <Link to="/signup">Signup here</Link>
          </p>
        </div>
      </div>

      <div
        className="login-right"
        style={{ backgroundImage: `url(${loginBackground})` }}
      ></div>
    </div>
  );
};

export default Login;

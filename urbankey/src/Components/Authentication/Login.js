// Login.js

import React from 'react';
import './Login.css';
import condoimage from '../Images/Condo.jpg';

const Login = () => {
  return (
    <div className="login-container">
      <div className="image-container">
        <img src= {condoimage} alt= "Condo Image"/>
      </div>
      <div className="form-container">
        <h2>Login</h2>
        <div className="form-group">
          <label>Email:</label>
          <input type="email" placeholder="Enter your email" />
        </div>
        <div className="form-group">
          <label>Password:</label>
          <input type="password" placeholder="Enter your password" />
        </div>
        <button className="login-btn">LOGIN</button>
        <div className="signup-link">
          Still not a member? <a href="#">Sign Up Now!</a>
        </div>
      </div>
    </div>
  );
};

export default Login;

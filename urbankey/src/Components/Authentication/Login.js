// Login.js

import React from 'react';
import './Login.css';
import condoimage from '../Images/Condo.jpg';
import { Link } from 'react-router-dom';

const Login = () => {
  return (
    <div className="body-attributes">
    <div className="login-container">
      <div className="image-container">
        <img src= {condoimage} alt= "Condo Image"/>
      </div>
      <div className="login-section-container">
        <h2 className="h2-Login" >Login</h2>
        <div className="form-group-inputs">
          <label className="label-email">Email:</label>
          <input className="input-email" type="email" placeholder="Enter your email" />
        </div>
        <div className="form-group-inputs">
          <label className="label-password">Password:</label>
          <input className="input-password" type="password" placeholder="Enter your password" />
        </div>
        <button className="login-btn">LOGIN</button>
        <div className="signup-link">
          Still not a member? <Link to="/SignUp">Sign Up Now!</Link>
        </div>
      </div>
    </div>
    </div>
  );
};

export default Login;

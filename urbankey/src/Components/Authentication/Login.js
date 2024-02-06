// Login.js

import React from 'react';
import './Login.css';
import condoimage from '../Images/Condo.jpg';
import { Link } from 'react-router-dom';
import { useState } from "react";
import {useNavigate} from "react-router-dom";
import axios from 'axios';

const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loginStatus, setLoginStatus] = useState("");

  const login = async (e) => {
  try {
  e.preventDefault();
  const response = await axios.post("http://localhost:5000/Login", {
    email: email,
    password: password,
  });
    console.log(response);
    navigate('/');
  }
  catch(error) {
    console.log(error, 'error');
    if (error.response && error.response.status === 401) {
        alert("Invalid credentials");
    }
    if (error.response && error.response.status === 404) {
        alert("User not found with this email");
    }
  }

  }
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
          <input className="input-email" value={email}  onChange={(e) => setEmail(e.target.value)} type="email" placeholder="Enter your email" required />
        </div>
        <div className="form-group-inputs">
          <label className="label-password">Password:</label>
          <input className="input-password" value={password} onChange={(e) => setPassword(e.target.value)} type="password" placeholder="Enter your password" required/>
        </div>
        <button className="login-btn" onClick={login}>LOGIN</button>
        <div className="signup-link">
        Still not a member? <Link to="/SignUp">Sign Up Now!</Link>
        </div>
      </div>
    </div>
    </div>
  );
};

export default Login;

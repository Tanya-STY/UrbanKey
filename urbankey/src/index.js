import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter as Router } from 'react-router-dom';
import {AuthProvider} from "@propelauth/react";
// import './index.css';
import App from './App';
// import reportWebVitals from './reportWebVitals';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
   <AuthProvider authUrl={process.env.REACT_APP_AUTH_URL}>
  <Router>
    <App />
  </Router>
  </AuthProvider>
  </React.StrictMode>
);
//ReactDOM.render(
//  <React.StrictMode>
//    <Router>
//      <App />
//    </Router>
//  </React.StrictMode>,
//  document.getElementById("root")
//);

// // If you want to start measuring performance in your app, pass a function
// // to log results (for example: reportWebVitals(console.log))
// // or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
// reportWebVitals();
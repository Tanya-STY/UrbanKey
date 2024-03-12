// Login.js

//importing dependencies
import React from 'react';
import { Link } from 'react-router-dom';
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useContext } from 'react';
import { AuthProvider, useAuth } from '../../Provider/AuthProvider';
import App from '../../App';

//importing css
import './Login.css';

//importing needed documents
import condoimage from '../Images/Condo.jpg';
import useVerifTokenHook from '../../CustomeHooks/useVerifTokenHook.js';


const Login = () => {
  const navigate = useNavigate();
  const { token, setToken, setTokenInStorage, removeTokenFromStorage} = useAuth();

  
  const tokenCheck = useVerifTokenHook('http://127.0.0.1:5000/checkToken', token);
  console.log(tokenCheck + ' inside login');
  if (tokenCheck == 'passed'){
    console.log('succesfuly passed the login with stored token');
    navigate('/Home');
  }
  else{
    console.log('skip login failed need to login to obtain a new token');
  }
  //setting up the dynamic variables
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  //setting up the function handleLogin
  const handleLogin = () => {

  //create one object for the data
  const userInfo = {
    email: email,
    password: password
  }

  //set url for the sending
  //this will allow us to use the same hook for sign up or login
  const url = 'http://127.0.0.1:5000/Login';

  fetch(url, {
      method: 'POST',
      headers: {'content-Type' : 'application/json' },
      body: JSON.stringify(userInfo)
  })
  .then(res => {
      if(!res.ok){
          throw Error('could not fetch data from url'); 
      }
      return res.json();
  })
  .then(data => {
    console.log(data);
      if ('error' in data){
          console.log('error in the backend, return to initial page');
          alert('Error inside the backend please try again later');
      }
      else if ('wrong' in data){
        alert("wrong credentials login unsucessful, please try again");
      }
      else{
          console.log(data.receivedToken);
          setToken(data.receivedToken);
          setTokenInStorage(data.receivedToken);
          navigate('/Home');
      }
  })
  .catch(err => {
      console.log(err);
      console.log('catched error from backend');
      alert("backend is not setup to receive, please contact the dev team")
  })   
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
              <input className="input-email" value={email}  onChange={(e) => setEmail(e.target.value)} type="email" placeholder="Enter your email" />
            </div>
            <div className="form-group-inputs">
              <label className="label-password">Password:</label>
              <input className="input-password" value={password} onChange={(e) => setPassword(e.target.value)} type="password" placeholder="Enter your password" />
            </div>
            <button className="login-btn" onClick={handleLogin}>LOGIN</button>
            <div className="signup-link">
            Still not a member? <Link to="/SignUp">Sign Up Now!</Link>
            </div>
          </div>  
      </div>
    </div>
  );
}
export default Login; 



















// 
// 
// 
// 
// 
// import { useAuth } from '../../Provider/AuthProvider';

// 
// import axios from 'axios';

// const Login = () => {
//   const { login } = useAuth();
//   const navigate = useNavigate();

  // const [email, setEmail] = useState("");
  // const [password, setPassword] = useState("");
// //  const [loginStatus, setLoginStatus] = useState("");

// //  useEffect(() => {
// //    function checkLocalStorage() {
// //      const storedData = localStorage.getItem("email");
// //      if (storedData) {
// //        try {
// //          const response = await axios.post("http://localhost:5000/user/verification", { "email": storedData })
// //
// //              if (data.verification === "true") {
// //                setLoginStatus("success");
// //                navigate('/Profile');
// //              } else {
// //                console.log("Email not found in local storage, need to log in again.");
// //              }
// //            })
// //            .catch(error => {
// //              console.log("Error while sending data to the backend:", error);
// //            });
// //        } catch(error) {
// //          console.log(error, "Did not send data to backend successfully");
// //        }
// //      } else {
// //        // Data does not exist
// //      }
// //    }
// //    checkLocalStorage();
// //  }, [navigate]);

//   const handleLogin = async (e) => {
//   try {

//   e.preventDefault();

//   const response = await axios.post("http://localhost:5000/Login", {
//     email: email,
//     password: password,
//   });
//     const { token } = response.data;
//     login(token);
//     console.log(response);

// //    const { token, email: userEmail } = response.data;

//     // Store the token and email in local storage

// //    localStorage.setItem('token', token);
// //    localStorage.setItem('email', email);

//      // Set the Authorization header for future requests
// //    axios.defaults.headers.common['Authorization'] = `${email}`;


// //    setLoginStatus("success");

//     navigate('/Profile');
//   }
//   catch(error) {
//     console.log(error, 'error');
// //    setLoginStatus("error");
//     if (error.response && error.response.status === 401) {
//         alert("Invalid credentials");
//     }
//     if (error.response && error.response.status === 404) {
//         alert("User not found with this email");
//     }
//   }

//   }

//   // Timeout function to automatically trigger login after 3 seconds
// //  useEffect(() => {
// //    const timeoutId = setTimeout(() => {
// //      login();
// //    }, 3000);
// //
// //    return () => clearTimeout(timeoutId);
// //  }, []);
  // return (
  //   <div className="body-attributes">
  //   <div className="login-container">
  //     <div className="image-container">
  //       <img src= {condoimage} alt= "Condo Image"/>
  //     </div>
  //     <div className="login-section-container">
  //       <h2 className="h2-Login" >Login</h2>
  //       <div className="form-group-inputs">
  //         <label className="label-email">Email:</label>
  //         <input className="input-email" value={email}  onChange={(e) => setEmail(e.target.value)} type="email" placeholder="Enter your email" />
  //       </div>
  //       <div className="form-group-inputs">
  //         <label className="label-password">Password:</label>
  //         <input className="input-password" value={password} onChange={(e) => setPassword(e.target.value)} type="password" placeholder="Enter your password" />
  //       </div>
  //       <button className="login-btn" onClick={handleLogin}>LOGIN</button>
  //       <div className="signup-link">
  //       Still not a member? <Link to="/SignUp">Sign Up Now!</Link>
  //       </div>
  //     </div>
  //   </div>
  //   </div>
  // );
// };

// export default Login;
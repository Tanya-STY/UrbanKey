// Login.js

//importing dependencies
import React from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useState, useEffect } from "react";
import useAuth from '../../CustomeHooks/useAuth.js';
import App from '../../App';
import axios from 'axios';

//importing css
import './Login.css'; 

//importing needed documents
import condoimage from '../Images/Condo.jpg';
import useVerifTokenHook from '../../CustomeHooks/useVerifTokenHook.js';


const Login = () => {
  const { setAuth, persist, setPersist } = useAuth();

  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || "/Profile"; // get where the user came from
 
  
  //setting up the dynamic variables
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  //setting up the function handleLogin
  const handleLogin = async (e) => {
    try{
    const response = await axios.post("https://urbankey-backend.onrender.com/Login", {
        email: email,
        password: password,
      }, {
        headers: { 'Content-Type': 'application/json' },
        withCredentials: true
      });
      const token = response?.data?.token;
      const role = response?.data?.role;
      setAuth({ role, email, password, token});
      setEmail('');
      setPassword('');
      if (role === 1010) {
        navigate('/PropertyProfile')
      }
      else if (role === 2020) {
        navigate('/DailyOperations')
      }
      else if (role === 3030) {
        navigate('/FinanceDashboard')
      }
      else if (role === 4040) {
        navigate('/ManagerEmployeePage')
      }
      else {
        navigate('/Profile');
      }
    }
    catch (error) {
      console.log(error, 'error');
      if (error.response && error.response.status === 401) {
        alert("Invalid credentials");
      }
      if (error.response && error.response.status === 404) {
        alert("User not found with this email");
      }
    }

}

const togglePersist = () => {
  setPersist(prev => !prev);
}

useEffect(() => {
  localStorage.setItem("persist", persist);
}, [persist])


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
            <div className="persistCheck">
                    <input
                        type="checkbox"
                        id="persist"
                        onChange={togglePersist}
                        checked={persist}
                    />
                    <label htmlFor="persist">Trust This Device</label>
                </div>
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

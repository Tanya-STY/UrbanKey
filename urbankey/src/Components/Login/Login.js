// Login.js

//importing dependencies
import React from 'react';
import { Link } from 'react-router-dom';
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useContext } from 'react';
import { AuthProvider } from '../../Provider/AuthProvider';
import App from '../../App';

//importing css
import './Login.css';

//importing needed documents
import condoimage from '../Images/Condo.jpg';

//importing hooks necessary
import useLocalStorageTokenCheckHook from '../../CustomHooks/useLocalStorageTokenCheckHook';


const Login = ({setToken, setLogged}) => {
  const navigate = useNavigate();
  const {passed, token} = useLocalStorageTokenCheckHook("http://127.0.0.1:5000/LocalStorageCheck"); 
  if(passed){
    console.log("passed with token" + token);
    setToken(token);
    setLogged(true);
    navigate('/Home');
  }
  //setting the naviguate hook
  

  
  //setting up the dynamic variables
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [pending, setPending] = useState(false);
  const [connected, setConnected] = useState(true);

  //setting up the function handleLogin
  const handleLogin = () => {
  
    

    //rendering the loggin you in ...
    setPending(true);
    
    //creating sending body
    const sendBody = {
      email: email,
      password: password
  };

  fetch('http://127.0.0.1:5000/Login', {
      method: 'POST', 
      headers: { "Content-Type" : 'application/json'},
      body: JSON.stringify(sendBody)
  })
  .then(res => {
      if (!res.ok){
          throw Error('could not fetch data from url')
      }
      return res.json();
  })
  .then(data => {
      if (data.message === 'wrong'){
          console.log("wrong credentials, try again");
          setPending(false);
          console.log(data); 
          alert("Wrong credentials, try again")
          setPending(false);
      }
      else if (data.message === 'good'){
          console.log('good credentials');
          console.log(data);
          setToken(data.token); 
          setPending(false);
          console.log("correct credentials, loggin in");
          console.log("component received: " + data.token);
          localStorage.setItem('token', data.token);
          navigate('/Home');
      }
  })
  .catch(err => {
    //catches errors from switching pages too fast and the component unmounting from the DOM
    //but the custom hook useVerifTokenHook still is waiting for the fetch
    //which creates a massive error
    if (err.name === 'AbortError') {
        console.log('fetch aborted explicitely');
    }
    else {
        //catches errors sent from the backend
        console.log(err); 
        console.log("Catched error from backend with useVerifTokenHook");  
        setConnected(false); 
    }
})


    //setting a timer just to show off
  }
  

  return (
    <div className="body-attributes">
      <div className="login-container">
        {connected && (
        <>
        {pending && <div>Verifying credentials...</div>}
        {!pending && (
        <> 
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
        </>
        )}
        </>
        )}
        {!connected && <div>FATAL ERROR: BACKEND NOT WORKING PROPERLY</div>}
        
        
         
          
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

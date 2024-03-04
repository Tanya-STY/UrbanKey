// App.js

import "./App.css";

//react dependencies
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useState } from "react";

//component dependencies
import Login from "./Components/Login/Login.js";
import SignUp from "./Components/SignUp/SignUp.js";
import Profile from "./Components/UserProfile/Profile.js";
import CondoDash from "./Components/OwnerDashboard/OwnerDashboard.js";

import Finance from "./Components/Finance/Finance.js";
import NavBar_HomePage from "./Components/NavBar/NavBar_HomePage";
import NavBar_Company from "./Components/NavBar/NavBar_Company.js";
import NavBar_User from "./Components/NavBar/NavBar_User.js";

import Notifications from "./Components/Popups/Notifications.js";
import Maintenance from "./Components/Popups/MaintenanceRequest.js";
import ReservationSuccess from "./Components/Popups/ReservationSuccess.js";
import PaymentHistory from "./Components/Popups/PaymentHistory.js";
import RegistrationKey from "./Components/RegistrationKey/RegistrationKey.js";
import Home from "./Components/Home/Home.js";

import { AuthProvider, useAuth } from "./Provider/AuthProvider.js";

function App() {
//bring the variables using the context

  return (
    <div>
      <AuthProvider>
        
          <NavBar_HomePage />
            <Routes>
              <Route path="/Login" element={<Login/>}/>
              <Route path="/SignUp" element={<SignUp />} />
              <Route path="/Profile" element={<Profile />} />
              <Route path="/Finance" element={<Finance />} />
              <Route path="/CondoOwnerDashboard" element={<CondoDash />} />
              <Route path="/Finance" element={<Finance />} />
              <Route path="/Notifications" element={<Notifications />} />
              <Route path="/Maintenance" element={<Maintenance />} />
              <Route path="/ReservationSuccess" element={<ReservationSuccess />} />
              <Route path="/PaymentHistory" element={<PaymentHistory />} />
              <Route path="/RegistrationKey" element={<RegistrationKey />} />
              <Route path="/Home" element={<Home />} /> 
            </Routes>
      </AuthProvider>
    </div>)
}

export default App;

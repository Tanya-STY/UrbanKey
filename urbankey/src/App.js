import React from "react";
import "./App.css";
import { Routes, Route } from "react-router-dom"; // Notice BrowserRouter as Router is removed
import Login from "./Components/Authentication/Login";
import SignUp from "./Components/SignUp/SignUp";
import Profile from "./Components/UserProfile/Profile";
import Finance from "./Components/Finance/Finance";
import Notifications from "./Components/Popups/Notifications";
import Maintenance from "./Components/Popups/MaintenanceRequest";
import ReservationSuccess from "./Components/Popups/ReservationSuccess";
import PaymentHistory from "./Components/Popups/PaymentHistory";
import RegistrationKey from "./Components/RegistrationKey/RegistrationKey";
import Home from "./Components/Home/Home";
import PropertyProfileManagement from "./Components/PropertyProfileManagement/PropertyProfileManagement"; 
import { AuthProvider } from "./Provider/AuthProvider";

function App() {
  return (
    <AuthProvider>
      <Routes>
        <Route path="/Login" element={<Login />} />
        <Route path="/SignUp" element={<SignUp />} />
        <Route path="/Profile" element={<Profile />} />
        <Route path="/Finance" element={<Finance />} />
        <Route path="/Notifications" element={<Notifications />} />
        <Route path="/Maintenance" element={<Maintenance />} />
        <Route path="/ReservationSuccess" element={<ReservationSuccess />} />
        <Route path="/PaymentHistory" element={<PaymentHistory />} />
        <Route path="/RegistrationKey" element={<RegistrationKey />} />
        <Route path="/Home" element={<Home />} />
        <Route path="/PropertyProfileManagement" element={<PropertyProfileManagement />} />
      </Routes>
    </AuthProvider>
  );
}

export default App;

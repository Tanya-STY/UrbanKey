// App.js

import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./Components/Authentication/Login.js";
import SignUp from "./Components/SignUp/SignUp.js";
import Profile from "./Components/UserProfile/Profile.js";

import Notifications from "./Components/Popups/Notifications.js";
import Maintenance from "./Components/Popups/MaintenanceRequest.js";
import ReservationSuccess from "./Components/Popups/ReservationSuccess.js";
import PaymentHistory from "./Components/Popups/PaymentHistory.js";


import RegistrationKey from "./Components/RegistrationKey/RegistrationKey.js";
import Home from "./Components/Home/Home.js";

import { AuthProvider } from "./Provider/AuthProvider.js";

function App() {
  return (
    <div>
    <AuthProvider>
      <Routes>
        <Route path="/Login" element={<Login />} />
        <Route path="/SignUp" element={<SignUp />} />
        <Route path="/Profile" element={<Profile />} />
        <Route path="/Notifications" element={<Notifications />} />
        <Route path="/Maintenance" element={<Maintenance />} />
        <Route path="/ReservationSuccess" element={<ReservationSuccess />} />
        <Route path="/PaymentHistory" element={<PaymentHistory />} />
        <Route path="/RegistrationKey" element={<RegistrationKey />} />
        <Route path="/Home" element={<Home />} /> 
      </Routes>
      </AuthProvider>
     </div>
    // <Router>
    //   <Routes>
    //     <Route path="/Login" element={<Login />} />
    //     <Route path="/SignUp" element={<SignUp />} />
    //     <Route path="/Profile" element={<Profile />} />
    //   </Routes>
    // </Router>
  );
}

export default App;
// App.js

import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import MaintenanceRequest from "./Components/Popups/MaintenanceRequest";
import Notification from "./Components/Popups/Notification";
import PaymentHistory from "./Components/Popups/PaymentHistory";
import ReservationSuccess from "./Components/Popups/ReservationSuccess";
import PropertyProfileManagement from "./Components/PropertyProfileManagement/PropertyProfileManagement"; 
import Employee from "./Components/Employees/Employee.js";
import FinanceDashboard from "./Components/FinanceDashboard/Finance";
import CondoOwnerDashboard from "./Components/CondoOwnerDashboard/OwnerDashboard";
import SignUp from "./Components/SignUp/SignUp";
import Login from "./Components/LogIn/Login";
import HomePage from "./Components/HomePage/Home";
import RegistrationKey from "./Components/RegistrationKey/RegistrationKey";
import Profile from "./Components/ProfilePage/Profile";
import Reservation from "./Components/Reservation/Reservation";

import { AuthProvider } from "./Provider/AuthProvider.js";

function App() {
  return (
    <div>
    <AuthProvider>
      <Routes>
        <Route path="/MaintenanceRequest" element={<MaintenanceRequest />} />
        <Route path="/Notification" element={<Notification />} />
        <Route path="/PaymentHistory" element={<PaymentHistory />} />
        <Route path="/ReservationSuccess" element={<ReservationSuccess />} />
        <Route path="/PropertyProfileManagement" element={<PropertyProfileManagement />} />
        <Route path="/Employee" element={<Employee />} />
        <Route path="/FinanceDashboard" element={<FinanceDashboard />} />
        <Route path="/CondoOwnerDashboard" element={<CondoOwnerDashboard />} />
        <Route path="/SignUp" element={<SignUp />} />
        <Route path="/Login" element={<Login />} />
        <Route path="/HomePage" element={<HomePage />} />
        <Route path="/RegistrationKey" element={<RegistrationKey />} />
        <Route path="/Profile" element={<Profile />} />
        <Route path="/Reservation" element={<Reservation />} />





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
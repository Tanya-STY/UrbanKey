// App.js

import "./App.css";
import { Routes, Route } from "react-router-dom";
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
import Layout from "./Components/Layout.js";
import Unauthorized from './Components/Unauthorized';
import RequireAuth from "./Components/RequireAuth.js";
import NavBar_HomePage from "./Components/NavBar/NavBar_HomePage.js"
import NavBar_Company from "./Components/NavBar/NavBar_Company.js"
import NavBar_User from "./Components/NavBar/NavBar_User.js"
import PersistLogin from "./Components/PersistentLogin.js";
import { AuthProvider } from "./Provider/AuthProvider.js";
import Navbar from "./Components/NavBar/NavBar.js";
import useAuth from "./CustomeHooks/useAuth.js";

const ROLE = {
  'User': 2001,
  'Owner': 3333,
  'Renter': 1984,
  'Admin': 5150
}


function App() {
  return (
      <>
      <Navbar />

      <Routes>
        <Route path="/" element={<Layout/>} />

          {/* Public Routes */}
          <Route path="/SignUp" element={<SignUp />} />
          <Route path="/Login" element={<Login />} />
          <Route path="/Unauthorized" element={<Unauthorized />} />
          <Route path="/HomePage" element={<HomePage />} />
          
          <Route element={<PersistLogin />} >
          <Route element={<RequireAuth allowedRoles={[ROLE.User, ROLE.Admin, ROLE.Renter, ROLE.Owner]}/>} > 
            {/* <Route path="/HomePage" element={<HomePage />} /> */}
            <Route path="/Profile" element={<Profile />} />
            <Route path="/MaintenanceRequest" element={<MaintenanceRequest />} />
            <Route path="/Notification" element={<Notification />} />
            <Route path="/PaymentHistory" element={<PaymentHistory />} />
            <Route path="/ReservationSuccess" element={<ReservationSuccess />} />
            <Route path="/PropertyProfile" element={<PropertyProfileManagement />} />
            <Route path="/Employee" element={<Employee />} />
            <Route path="/FinanceDashboard" element={<FinanceDashboard />} />
            <Route path="/Dashboard" element={<DashboardBasedOnRole />} />
            <Route path="/RegistrationKey" element={<RegistrationKey />} />
            <Route path="/Reservation" element={<Reservation />} />
            </Route>
          </Route>
          
          
      </Routes>
    </>
   
  );
}

const DashboardBasedOnRole = () => {
  const { auth } = useAuth(); // Assuming you have an auth context

  if (auth.role === ROLE.Owner) {
    return <CondoOwnerDashboard />;
  } else {
    return <DefaultDashboard />;
  }
};

// Component for default dashboard
const DefaultDashboard = () => {
  return <div>This is the default dashboard</div>;
};

export default App;
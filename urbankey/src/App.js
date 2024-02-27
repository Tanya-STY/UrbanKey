// App.js

import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
// import Login from "./Components/Authentication/Login.js";
// import SignUp from "./Components/SignUp/SignUp.js";
import Profile from "./Components/UserProfile/Profile.js";

import Finance from "./Components/Finance/Finance.js";


import Notifications from "./Components/Popups/Notifications.js";
import Maintenance from "./Components/Popups/MaintenanceRequest.js";
import ReservationSuccess from "./Components/Popups/ReservationSuccess.js";
import PaymentHistory from "./Components/Popups/PaymentHistory.js";
import RegistrationKey from "./Components/RegistrationKey/RegistrationKey.js";
import Home from "./Components/Home/Home.js";

// import { AuthProvider } from "./Provider/AuthProvider.js";
import { useLogoutFunction, useRedirectFunctions, withAuthInfo } from "@propelauth/react";

// function App() {
//   return (
//     <div>
//     <AuthProvider>
//       <Routes>
//         <Route path="/Login" element={<Login />} />
//         <Route path="/SignUp" element={<SignUp />} />
//         <Route path="/Profile" element={<Profile />} />

//         <Route path="/Finance" element={<Finance />} />

//         <Route path="/Notifications" element={<Notifications />} />
//         <Route path="/Maintenance" element={<Maintenance />} />
//         <Route path="/ReservationSuccess" element={<ReservationSuccess />} />
//         <Route path="/PaymentHistory" element={<PaymentHistory />} />
//         <Route path="/RegistrationKey" element={<RegistrationKey />} />
//         <Route path="/Home" element={<Home />} /> 

//       </Routes>
//       </AuthProvider>
//      </div>
    // <Router>
    //   <Routes>
    //     <Route path="/Login" element={<Login />} />
    //     <Route path="/SignUp" element={<SignUp />} />
    //     <Route path="/Profile" element={<Profile />} />
    //   </Routes>
    // </Router>
//   );
// }

// export default App;

const App = withAuthInfo(({isLoggedIn}) => {
  const logoutFn = useLogoutFunction()
  const {redirectToSignupPage, redirectToLoginPage} = useRedirectFunctions();
if (isLoggedIn) {
    return <div>
         <Routes>
          <Route exact path="/profile" element={<Profile/>}/>
          <Route path="/Finance" element={<Finance />} />
          <Route path="/Notifications" element={<Notifications />} />
          <Route path="/Maintenance" element={<Maintenance />} />
          <Route path="/ReservationSuccess" element={<ReservationSuccess />} />
          <Route path="/PaymentHistory" element={<PaymentHistory />} />
          <Route path="/RegistrationKey" element={<RegistrationKey />} />
          <Route path="/Home" element={<Home />} /> 
        </Routes>
    </div>
} else {
    return <div>
         To get started, please log in as test user.
        <br/>
        <button onClick={() => redirectToSignupPage()}>
            Sign up
        </button>
        <button onClick={() => redirectToLoginPage()}>
            Log in
        </button>
    </div>
}
})

export default App;
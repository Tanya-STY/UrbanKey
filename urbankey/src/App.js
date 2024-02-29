// App.js

import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./Components/Authentication/Login.js";
import SignUp from "./Components/SignUp/SignUp.js";
import Profile from "./Components/UserProfile/Profile.js";
import Finance from "./Components/Finance/Finance.js";
import NavBar_HomePage from "./Components/NavBar/NavBar_HomePage";
import NavBar_Company from "./Components/NavBar/NavBar_Company.js";
import NavBar_User from "./Components/NavBar/NavBar_User.js";
import { AuthProvider } from "./Provider/AuthProvider.js";

function App() {
  return (
    <div>
      <AuthProvider>
        
          <NavBar_HomePage />
            <Routes>
              <Route path="/Login" element={<Login />} />
              <Route path="/SignUp" element={<SignUp />} />
              <Route path="/Profile" element={<Profile />} />
              <Route path="/Finance" element={<Finance />} />
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
// App.js

import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./Components/Authentication/Login.js";
import SignUp from "./Components/SignUp/SignUp.js";
import Profile from "./Components/UserProfile/Profile.js";
import Employee from "./Components/EmployeePage/Employee.js";


function App() {
  return (
    <Router>
      <Routes>
        <Route path="/Login" element={<Login />} />
        <Route path="/SignUp" element={<SignUp />} />
        <Route path="/Profile" element={<Profile />} />
        <Route path="/Employee" element={<Employee />} />
      </Routes>
    </Router>
  );
}

export default App;
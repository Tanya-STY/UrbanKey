// App.js

import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./Components/Authentication/Login.js";
import SignUp from "./Components/SignUp/SignUp.js";
import Profile from "./Components/UserProfile/Profile.js";
import Finance from "./Components/Finance/Finance.js";
import { AuthProvider } from "./Provider/AuthProvider.js";

function App() {
  return (
    <div>
    <AuthProvider>
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
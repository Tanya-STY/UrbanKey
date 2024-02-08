// App.js

import "./App.css";
import {Routes, Route} from "react-router-dom";
import Login from "./Components/Authentication/Login.js";
import SignUp from "./Components/SignUp/SignUp.js";
import Profile from "./Components/UserProfile/Profile.js";
import { AuthProvider } from "./Provider/AuthProvider.js";
//import AllRoutes from "./Routes/Routes.js"

function App() {
  return (
    <div>
    <AuthProvider>
      <Routes>
        <Route path="/Login" element={<Login />} />
        <Route path="/SignUp" element={<SignUp />} />
        <Route path="/Profile" element={<Profile />} />
      </Routes>
      </AuthProvider>
     </div>
//    <div>
//        <AuthProvider>
//            <AllRoutes/>
//        </AuthProvider>
//    </div>
  );
}

export default App;
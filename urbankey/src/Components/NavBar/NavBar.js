import React, { useState } from "react";
import { NavLink, Link } from "react-router-dom";
import logo from "../Images/urbankey_logo.png";
import "./NavBar.css";
import useAuth from "../../CustomeHooks/useAuth";
import useLogout from "../../CustomeHooks/useLogout";
import CondoDash from "../CondoOwnerDashboard/OwnerDashboard";

const Navbar = () => {
  const { auth, persist } = useAuth();
  const logout = useLogout();
  const [showOptions, setShowOptions] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);

  const toggleOptions = () => {
    setShowOptions((prevState) => !prevState);
  };

  const toggleNotifications = () => {
    setShowNotifications((prevState) => !prevState);
  };

  const handleOptionsClick = async (e) => {
    await logout();
    e.stopPropagation(); // Prevents the click event from bubbling up to the parent
  };

    return (
        <div className="navbar">
            <div className="logo">
                <img src={logo} alt="Company Logo" />
            </div>
            <div className="sections">
                {(auth?.token && persist) ? (
                    <AuthenticatedSections auth={auth} />
                ) : (
                    <UnauthenticatedSections />
                )}
            </div>
            <div className="user">
                <div className="icon-container">
                    <div
                        className="bell-icon"
                        onClick={toggleNotifications}
                        data-testid="bell-icon"
                    >
                        <Link to="/NotificationPage"><i className="fa fa-bell"></i></Link>
                    </div>
                    <div
                        className="user-icon"
                        onClick={toggleOptions}
                        data-testid="user-icon"
                    >
                        <i className="fa fa-user"></i>
                    </div>
                </div>
                {showOptions && (
                    <div className="options" onClick={handleOptionsClick} data-testid="options">
                        <ul>
                            <li>
                                <NavLink to="/" className="nav-link">Sign Out</NavLink>
                            </li>
                        </ul>
                    </div>
                )}
            </div>
        </div>
    );
};

const AuthenticatedSections = ({ auth }) => {
    console.log(auth?.role);
    return (
        <ul>
            <li>
                <NavLink to="/" activeClassName="active" className="nav-link">Home Page</NavLink>
            </li>
            
            {(auth?.role === 1010) && (
                <>
                    <li>
                        <NavLink to="/PropertyProfile" activeClassName="active" className="nav-link">Property Profile</NavLink>
                    </li>
                    <li>
                        <NavLink to="/Employees" activeClassName="active" className="nav-link">Employees</NavLink>
                    </li>
                    <li>
                        <NavLink to="/FinanceDashboard" activeClassName="active" className="nav-link">Finance</NavLink>
                    </li>
                    <li>
                        <NavLink to="/ReservationPageCompany" activeClassName="active" className="nav-link">Reservation Company</NavLink>
                    </li>

                </>
            )}
            {(auth?.role === 3030) && (
                <>
                
                    <li>
                        <NavLink to="/FinanceDashboard" activeClassName="active" className="nav-link">Finance Dashboard</NavLink>
                    </li>
                </>
            )}
            {(auth?.role === 4040) && (
                <>
                    <li>
                        <NavLink to="/ManagerEmployeePage" activeClassName="active" className="nav-link">Manager Employee Page</NavLink>
                    </li>
                </>
            )}
            {(auth?.role === 2020) && (
                <>
                    <li>
                        <NavLink to="/DailyOperations" activeClassName="active" className="nav-link">Daily Operations</NavLink>
                    </li>
                    
                </>
            )}
            {(auth?.role === 2001 || auth?.role === 3333 || auth?.role === 1984) && (
                <>
                    <li>
                        <NavLink to="/Profile" activeclassname="active" className="nav-link">Profile</NavLink>
                    </li>
                    <li>
                        <NavLink to="/Dashboard" activeclassname="active" className="nav-link">Dashboard</NavLink>
                    </li>
                    <li>
                        <NavLink to="/Reservation" activeclassname="active" className="nav-link">Reservation</NavLink>
                    </li>
                </>
            )}
        </ul>
    );
};


const UnauthenticatedSections = () => {
  return (
    <ul>
      <li>
        <NavLink to="/Login" activeclassname="active" className="nav-link">
          Login
        </NavLink>
      </li>
      <li>
        <NavLink to="/SignUp" activeclassname="active" className="nav-link">
          Sign Up
        </NavLink>
      </li>
    </ul>
  );
};

export default Navbar;

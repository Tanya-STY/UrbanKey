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
        {auth?.token && persist ? (
          <AuthenticatedSections authRole={auth.role} />
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
            <Link to="/NotificationPage">
              <i className="fa fa-bell"></i>
            </Link>
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
          <div
            className="options"
            onClick={handleOptionsClick}
            data-testid="options"
          >
            <ul>
              <li>
                <NavLink to="/HomePage" className="nav-link">
                  Sign Out
                </NavLink>
              </li>
            </ul>
          </div>
        )}
      </div>
    </div>
  );
};

// const AuthenticatedSections = ({ auth }) => {
//   const renderDashboardLink = () => {
//     if (auth?.role === 3333) {
//       // Assuming 3333 is the role for Owner
//       return (
//         <NavLink
//           to="/CondoOwnerDashboard"
//           activeclassname="active"
//           className="nav-link"
//         >
//           Dashboard
//         </NavLink>
//       );
//     } else {
//       return null; // Return null if the user is not an owner
//     }
//   };
//   return (
//     <ul>
//       <li>
//         <NavLink to="/HomePage" activeclassname="active" className="nav-link">
//           Home Page
//         </NavLink>
//       </li>
//       {/* Add additional sections based on user roles */}
//       <li>
//         <NavLink to="/Profile" activeclassname="active" className="nav-link">
//           Profile
//         </NavLink>
//       </li>
//       <li>
//         <NavLink to="/Dashboard" activeclassname="active" className="nav-link">
//           Dashboard
//         </NavLink>
//       </li>
//       <li>
//         <NavLink
//           to="/Reservation"
//           activeclassname="active"
//           className="nav-link"
//         >
//           Reservation
//         </NavLink>
//       </li>
//       <li>
//         <NavLink
//           to="/PropertyProfile"
//           activeclassname="active"
//           className="nav-link"
//         >
//           Property Profile
//         </NavLink>
//       </li>
//       <li>
//         <NavLink to="/Finance" activeclassname="active" className="nav-link">
//           Finance
//         </NavLink>
//       </li>
//       <li>
//         <NavLink to="/Employees" activeclassname="active" className="nav-link">
//           Employees
//         </NavLink>
//       </li>
//     </ul>
//   );

// };

const AuthenticatedSections = ({ authRole }) => {
  const renderRoleSpecificLinks = (role) => {
    switch (role) {
      case 3333: // Owner role
        return (
          <>
            <li>
              <NavLink
                to="/CondoOwnerDashboard"
                activeClassName="active"
                className="nav-link"
              >
                Condo Owner Dashboard
              </NavLink>
            </li>
          </>
        );
      case 1010: // Company role
        return (
          <>
            <li>
              <NavLink
                to="/ReservationPageCompany"
                activeClassName="active"
                className="nav-link"
              >
                Reservation Page Company
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/FinanceDashboard"
                activeClassName="active"
                className="nav-link"
              >
                Finance
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/Employees"
                activeClassName="active"
                className="nav-link"
              >
                Employees
              </NavLink>
            </li>
          </>
        );
      case 2020: // DailyOperator role
        return (
          <>
            <li>
              <NavLink
                to="/DailyOperations"
                activeClassName="active"
                className="nav-link"
              >
                Daily Operations
              </NavLink>
            </li>
          </>
        );
      case 3030: // FinanceOperator role
        return (
          <>
            <li>
              <NavLink
                to="/FinanceDashboard"
                activeClassName="active"
                className="nav-link"
              >
                Finance
              </NavLink>
            </li>
          </>
        );
      case 4040: // Manager role
        return (
          <>
            <li>
              <NavLink
                to="/ManagerEmployeePage"
                activeClassName="active"
                className="nav-link"
              >
                Manager Employee Page
              </NavLink>
            </li>
          </>
        );
      default:
        return null;
    }
  };

  return (
    <ul>
      <li>
        <NavLink to="/HomePage" activeClassName="active" className="nav-link">
          Home Page
        </NavLink>
      </li>
      <li>
        <NavLink to="/Profile" activeClassName="active" className="nav-link">
          Profile
        </NavLink>
      </li>
      <li>
        <NavLink to="/Dashboard" activeClassName="active" className="nav-link">
          Dashboard
        </NavLink>
      </li>
      <li>
        <NavLink
          to="/Reservation"
          activeClassName="active"
          className="nav-link"
        >
          Reservation
        </NavLink>
      </li>
      <li>
        <NavLink
          to="/PropertyProfile"
          activeClassName="active"
          className="nav-link"
        >
          Property Profile
        </NavLink>
      </li>
      {renderRoleSpecificLinks(authRole)}
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

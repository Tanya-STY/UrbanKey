import React, { useState } from 'react';
import { NavLink, Link } from 'react-router-dom';
import logo from '../Images/urbankey_logo.png';
import './NavBar.css';

const NavBar_User = () => {
  const [showOptions, setShowOptions] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);

  const toggleOptions = () => {
    setShowOptions(prevState => !prevState);
  };

  const toggleNotifications = () => {
    setShowNotifications(prevState => !prevState);
  };

  const handleOptionsClick = (e) => {
    e.stopPropagation(); // Prevents the click event from bubbling up to the parent
  };

  return (
    <div className="navbar">
      <div className="logo">
        <img src={logo} alt="Company Logo" />
      </div>
      <div className="sections">
        <ul>
          <li>
            <NavLink to="/Profile" activeClassName="active" className="nav-link">Profile</NavLink>
          </li>
          <li>
            <NavLink to="/Dashboard" activeClassName="active" className="nav-link">Dashboard</NavLink>
          </li>
        </ul>
      </div>
      <div className="user">
        <div className="icon-container">
          <div
            className="bell-icon"
            onClick={toggleNotifications}
          >
            <Link to="/NotificationPage"><i className="fa fa-bell"></i></Link>
          </div>
          <div
            className="user-icon"
            onClick={toggleOptions}
          >
            <i className="fa fa-user"></i>
          </div>
        </div>
        {showOptions && (
          <div className="options" onClick={handleOptionsClick}>
            <ul>
              <li>
                <NavLink to="/HomePage" className="nav-link">Sign Out</NavLink>
              </li>
            </ul>
          </div>
        )}
      </div>
    </div>
  );
};

export default NavBar_User;





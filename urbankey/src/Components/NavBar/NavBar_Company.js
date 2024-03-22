import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import logo from '../Images/urbankey_logo.png';
import './NavBar.css';
import '@fortawesome/fontawesome-free/css/all.css';


const NavBar_Company = () => {
  const [showOptions, setShowOptions] = useState(false);

  const toggleOptions = () => {
    setShowOptions(prevState => !prevState);
  };

  const handleOptionsClick = (e) => {
    e.stopPropagation(); 
  };

  return (
    <div className="navbar">
      <div className="logo">
        <img src={logo} alt="Company Logo" />
      </div>
      <div className="sections">
        <ul>
          <li>
            <NavLink to="/PropertyProfile" activeclassname="active" className="nav-link">Property Profile</NavLink>
          </li>
          <li>
            <NavLink to="/Finance" activeclassname="active" className="nav-link">Finance</NavLink>
          </li>
          <li>
            <NavLink to="/Reservation" activeclassname="active" className="nav-link">Reservation</NavLink>
          </li>
          <li>
            <NavLink to="/Employees" activeclassname="active" className="nav-link">Employees</NavLink>
          </li>
        </ul>
      </div>
      <div className="user">
      <div className="user-icon" onClick={toggleOptions} data-testid="user-icon">
          <i className="fa fa-user"></i>
        </div>
        {showOptions && (
          <div className="options" onClick={handleOptionsClick} data-testid="options">
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

export default NavBar_Company;

import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import logo from '../Images/urbankey_logo.png';
import './NavBar.css';

const NavBar_HomePage = () => {
  const [showOptions, setShowOptions] = useState(false);

  const toggleOptions = () => {
    setShowOptions(prevState => !prevState);
  };

  const handleOptionsClick = (e) => {
    e.stopPropagation(); 
  };

  // const { auth } = useAuth();

  return (
    <div className="navbar">
      <div className="logo">
        <img src={logo} alt="Company Logo" />
      </div>
      <div className="sections">
        <ul>
          <li>
            <NavLink to="/HomePage" activeclassname="active" className="nav-link">Home Page</NavLink>
          </li>
        </ul>
      </div>
      <div className="user">
        <div
          className="user-icon"
          onClick={toggleOptions}
          data-testid="user-icon"
        >
          <i className="fa fa-user"></i>
        </div>
        {showOptions && (
          <div className="options" onClick={handleOptionsClick} data-testid="options">
            <ul>
              <li>
                <NavLink to="/Login" className="nav-link">Login</NavLink>
              </li>
              <li>
                <NavLink to="/SignUp" className="nav-link">Sign Up</NavLink>
              </li>
            </ul>
          </div>
        )}
      </div>
    </div>
  );
};

export default NavBar_HomePage;

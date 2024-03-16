import React, { useState } from 'react';
import { NavLink, Link } from 'react-router-dom';
import logo from '../Images/urbankey_logo.png';
import './NavBar.css';
import useAuth from '../../CustomeHooks/useAuth';
import useLogout from '../../CustomeHooks/useLogout';
import CondoDash from '../CondoOwnerDashboard/OwnerDashboard';

const Navbar = () => {
    const { auth, persist } = useAuth();
    const logout = useLogout();
    const [showOptions, setShowOptions] = useState(false);
    const [showNotifications, setShowNotifications] = useState(false);

    const toggleOptions = () => {
        setShowOptions(prevState => !prevState);
    };

    const toggleNotifications = () => {
        setShowNotifications(prevState => !prevState);
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
                    <AuthenticatedSections />
                ) : (
                    <UnauthenticatedSections />
                )}
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

const AuthenticatedSections = ({auth}) => {
    const renderDashboardLink = () => {
        if (auth?.role === 3333) { // Assuming 3333 is the role for Owner
          return <NavLink to="/CondoOwnerDashboard" activeClassName="active" className="nav-link">Dashboard</NavLink>;
        } else {
          return null; // Return null if the user is not an owner
        }
    };
    return (
        <ul>
            <li>
                <NavLink to="/HomePage" activeclassName="active" className="nav-link">Home Page</NavLink>
            </li>
            {/* Add additional sections based on user roles */}
            <li>
                <NavLink to="/Profile" activeclassName="active" className="nav-link">Profile</NavLink>
            </li>
            <li>
                <NavLink to="/Dashboard" activeclassName="active" className="nav-link">Dashboard</NavLink>
            </li>
            <li>
                <NavLink to="/Reservation" activeclassName="active" className="nav-link">Reservation</NavLink>
            </li>
            <li>
                <NavLink to="/PropertyProfile" activeclassName="active" className="nav-link">Property Profile</NavLink>
            </li>
            <li>
                <NavLink to="/Finance" activeclassName="active" className="nav-link">Finance</NavLink>
            </li>
            <li>
                <NavLink to="/Employees" activeclassName="active" className="nav-link">Employees</NavLink>
            </li>
        </ul>
    );
};

const UnauthenticatedSections = () => {
    return (
        <ul>
            <li>
                <NavLink to="/Login" activeclassName="active" className="nav-link">Login</NavLink>
            </li>
            <li>
                <NavLink to="/SignUp" activeclassName="active" className="nav-link">Sign Up</NavLink>
            </li>
        </ul>
    );
};

export default Navbar;

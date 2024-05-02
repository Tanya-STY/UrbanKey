import React from 'react';
import './RegistrationKey.css';
import houseImage from '../Images/houseImage.png';

const RegistrationKeyMessage = ({ newRegistrationKey, isOpen, onClose }) => {
    return (
        <div className={`registrationKeyPage ${isOpen ? 'open' : ''}`}>
            <div className="registrationKeyContent">
                <button className="closeButton" onClick={onClose}>X</button>
                <h1 className="welcomeTitle">NEW REGISTRATION KEY</h1>
                <img className="houseImage" src={houseImage} alt="House" />
                <p className="registrationText">Congratulations! Your new registration key: {newRegistrationKey}. Please use this key to register.</p>
            </div>
        </div>
    );
};

export default RegistrationKeyMessage;

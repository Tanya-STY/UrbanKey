import React, { useState } from 'react';
import './RegistrationKey.css';
import { Link } from 'react-router-dom';
import urbanKeyLogo from '../Images/urbankey_logo.png';
import houseImage from '../Images/houseImage.png';

const RegistrationKeyMessage = ({ newRegistrationKey, isOpen, onClose }) => {

    const [email, setEmail] = useState('');
    const [key, setKey] = useState('');


    return (
        <div className={`registrationKeyPage ${isOpen ? 'open' : ''}`}>
            <div className="registrationKeyContent">
            <div className='header' /* add header elements */>
                <button className="closeButton" onClick={onClose}>X</button>
            </div>
            <br />
            <h1 className="welcomeTitle">NEW REGISTRATION KEY</h1>
            <div className="houseImage">
                <img src={houseImage} alt="House Image" />
            </div>

            <div className="registrationText">
            <p>Congratulations! You've obtained a new registration key from the condo management.</p>
                    <p>Your new registration key: {newRegistrationKey}</p>
                    <p>Please use this key to register.</p>
                
            </div>
            </div>

        </div>
    );
};

export default RegistrationKeyMessage;

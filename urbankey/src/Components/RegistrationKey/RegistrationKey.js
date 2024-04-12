import React, { useState } from 'react';
import './RegistrationKey.css';
import { Link } from 'react-router-dom';
import urbanKeyLogo from '../Images/urbankey_logo.png';
import houseImage from '../Images/houseImage.png';
import axios from 'axios';
import useAuth from '../../CustomeHooks/useAuth';

const RegistrationKey = ({ isOpen, onClose }) => {
    const { auth } = useAuth();

    const [email, setEmail] = useState('');
    const [key, setKey] = useState('');


    // Function to handle sending registration keys
    const handleSubmit = async (e) => {
        try {
            const token = auth?.token;
            // Call backend API to send registration keys
            const response = await axios.post('http://localhost:5000/send-registration-key', { email, key }, {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                withCredentials: true
            });
            console.log(response.data);
            alert('Registration keys sent successfully!');
            onClose();
        } catch (error) {
            console.error('Error sending registration keys:', error);
            alert('Error sending registration keys. Please try again later.');
        }
    };

    return (
        <div className={`registrationKeyPage ${isOpen ? 'open' : ''}`}>
            <div className="registrationKeyContent">
            <div className='header' /* add header elements */>
                <button className="closeButton" onClick={onClose}>X</button>
            </div>
            <br />
            <h1 className="welcomeTitle">URBANKEY REGISTRATION</h1>
            <div className="houseImage">
                <img src={houseImage} alt="House Image" />
            </div>

            <div className="registrationText">
                To register a condo owner or rental user, you can provide a registration key to users.
                <br />
                {/* If you have not received your key or need assistance, please contact support. */}
            </div>

            <div className="inputKeyArea">
                <input
                    className="inputKey"
                    type="text"
                    id="key"
                    value={key}
                    onChange={(e) => setKey(e.target.value)}
                    placeholder='Enter Registration Key'
                    required
                />
                <label htmlFor="email"></label>
                <input type="text" id="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder='Enter User email' required />

                <div>
                    <button type="button" className='registrationButton' onClick={handleSubmit}>Send Registration Key</button>
                </div>

                <div className='supportLink' /*link to support*/>
                    Need help? Contact Support.
                </div>
            </div>
            </div>
            </div>
     );
};

export default RegistrationKey;

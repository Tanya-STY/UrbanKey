import React, { useState } from 'react';
import './RegistrationKey.css';
import houseImage from '../Images/houseImage.png';
import axios from 'axios';
import useAuth from '../../CustomeHooks/useAuth';

const RegistrationKey = ({ isOpen, onClose, unitId, registrationKeyRenter, registrationKeyOwner }) => {
    const { auth } = useAuth();
    const [email, setEmail] = useState('');
    const [key, setKey] = useState('');

    const handleSubmit = async (e) => {
        try {
            const token = auth?.token;
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
                <button className="closeButton" onClick={onClose}>X</button>
                <h1 className="welcomeTitle">URBANKEY REGISTRATION</h1>
                <img className="houseImage" src={houseImage} alt="House" />
                <div className="registrationText">
                    To register a condo owner or rental user, provide a registration key.<br />
                    Here are the keys for unit <b></b>: {registrationKeyRenter} {registrationKeyOwner}
                </div>
                <div className="inputKeyArea">
                    <input className="inputKey" type="text" value={key} onChange={(e) => setKey(e.target.value)} placeholder='Enter Registration Key' required /><br />
                    <input type="text" value={email} onChange={(e) => setEmail(e.target.value)} placeholder='Enter User email' required />
                    <button className='registrationButton' onClick={handleSubmit}>Send Registration Key</button>
                </div>
            </div>
        </div>
    );
};

export default RegistrationKey;

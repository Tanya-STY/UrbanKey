import React, { useState } from 'react';
import './RegistrationKey.css';
import { Link } from 'react-router-dom';
import urbanKeyLogo from '../Images/urbankey_logo.png';
import houseImage from '../Images/houseImage.png';

const RegistrationKey = () => {

    const [key, setKey] = useState('');

    //const handleSubmit = 
    //const validateKey = (key) =>{}

    return(
        <div className="registrationKeyPage" >
            <div className='header' /* add header elements */>
            
            </div>
            <br/>
            <h1 className="welcomeTitle">Welcome to URBANKEY.</h1>
            <div className="houseImage">
                <img src= {houseImage} alt="House Image"/>
            </div>
            
            <div className="registrationText">
                To register as a condo owner or rental user, you need a registration key provided by your condo management company. 
                <br/>
                If you have not received your key or need assistance, please contact support.
            </div>

            <div className="inputKeyArea">
                <input
                    className="inputKey"
                    type="text"
                    id="key"
                    value={key}
                    //onChange={(e) => setKey(e.target.value)}
                    placeholder='Enter Registration Key'
                    required
                />
                
                <div>
                    <button type="button" className='registrationButton'>Become a Member</button>
                </div>
                
                <div className='supportLink' /*link to support*/>
                    Need help? Contact Support.
                </div>
            </div>

        </div>
    );
};

export default RegistrationKey;


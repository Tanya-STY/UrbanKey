// Profile.js profile information page(form)

import React from 'react';
import { useId } from 'react';
import './Profile.css';
import { Link } from 'react-router-dom';
import {CFormSwitch} from "@coreui/react";
import '@coreui/coreui/dist/css/coreui.min.css';
import { useState } from "react";



const Profile = () => {

    const name = useId();
    const email = useId();
    const province = useId();
    const city = useId();
    const num = useId();
    const num2 = useId();
    const key = useId();
    const address = useId();

    const [profilePicture, setProfilePicture] = useState('default-profile-picture.jpg'); // State to hold the profile picture
    // Function to handle profile picture upload
    const handleProfilePictureUpload = (e) => {
        const file = e.target.files[0]; // Get the uploaded file
        const reader = new FileReader(); // Create a file reader
        reader.onloadend = () => {
            // Once the file is read, set the profile picture state to the uploaded image
            setProfilePicture(reader.result);
        };
        reader.readAsDataURL(file); // Read the file as a data URL
    };




    return (
        <div className="profilePage" >
            <form className="profileForm">
                <h1 className="membershipInfo">Membership Information</h1>
                <div className="profile-picture">
                    <img src={profilePicture} alt="Profile Picture" />
                    <input type="file" id="upload" accept="image/*" onChange={handleProfilePictureUpload} />
                    <label htmlFor="upload">Upload Profile Picture</label>
                </div>

                <div className="field-holder-profile">
                    <label className="profileLabels" htmlFor={name}> Name / Surname</label>
                    <input className="profileInput" id={name} type="text" />
                </div>

                <div className="field-holder-profile">
                    <label className="profileLabels" htmlFor={email}> E-mail</label>
                    <input className="profileInput" id={email} type="text" />
                </div>
                <div className="box-profile-page">
                    <div className="field-holder2-profile">
                        <label className="province" htmlFor={province}>Province</label>
                        <select className="profileSelect" id={province}>
                            <option></option>
                            <option>Alberta</option>
                            <option>British Columbia</option>
                            <option>Manitoba</option>
                            <option>New Brunswick</option>
                            <option>Newfoundland and Labrador</option>
                            <option>Nova Scotia</option>
                            <option>Ontario</option>
                            <option>Prince Edward Island</option>
                            <option>Quebec</option>
                            <option>Saskatchewan</option>
                        </select>
                    </div>

                    <div className="field-holder2-profile">
                        <label className="city" htmlFor={city}>City</label>
                        <select className="profileSelect" id={city}>
                            <option></option>
                            <option>Montreal</option>

                        </select>
                    </div>
                </div>

                <div className="box-profile-page">
                    <div className="field-holder2-profile">
                        <label className="num" htmlFor={num}>Mobile Number</label>
                        <input className="horizontalInput" id={num} type="text" />
                    </div>

                    <div className="field-holder2-profile">
                        <label className="num2" htmlFor={num2}>Mobile Number 2</label>
                        <input className="horizontalInput" id={num2} type="text" />
                    </div>
                </div>


                <div className="field-holder-profile">
                    <label className="profileLabels" htmlFor={key}>Registration Key</label>
                    <input className="profileInput" id={key} type="text" />
                </div>

                <div className="field-holder-profile">
                    <label className="profileLabels" htmlFor={address}>Address</label>
                    <input id={address} className="addressInput" type="text" />
                </div>

            </form>

            <div className="notification">
                <text className="notifText" >I want to be informed about all announcements and campaigns via commercial electronic mail</text>
                <div className="profileSwitch">
                    <CFormSwitch label="E-mail" className="formSwitchCheckDefault"/>
                    <CFormSwitch label="SMS" className="formSwitchCheckDefault"/>
                </div>
            </div>
            <div className="save">
                <button className="profileBtn">Save</button>
            </div>

        </div>


    );
};

export default Profile;

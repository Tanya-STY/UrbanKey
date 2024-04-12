// Profile.js profile information page(form)

import React from 'react';
import { useId, useState, useEffect } from 'react';
import './Profile.css';
import { Link, useNavigate  } from 'react-router-dom';
import {CFormSwitch} from "@coreui/react";
import '@coreui/coreui/dist/css/coreui.min.css';
import "@fontsource/roboto/400.css"; // Specify weight
import axios from 'axios';
import useAuth from '../../CustomeHooks/useAuth';
import RegistrationKeyMessage from '../RegistrationKey/RegistrationKeyMessage'


const Profile = () => {

    const { auth, setAuth, setUnit } = useAuth();
    const navigate = useNavigate();
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [province, setProvince] = useState('');
    const [city, setCity] = useState('');
    const [num, setNum] = useState('');
    const [num2, setNum2] = useState('');
    const [key, setKey] = useState('');
    const [address, setAddress] = useState('');
    const [selectedFile, setSelectedFile] = useState(null);
    const [loading, setLoading] = useState(true);
    const [newRegistrationKey, setNewRegistrationKey] = useState('');
    const [showRegistrationPopup, setShowRegistrationPopup] = useState(false);
    const [profilePicture, setProfilePicture] = useState('default-profile-picture.jpg'); // State to hold the profile picture

    const role = auth?.role

    useEffect(() => {
        notification();
    }, []);
    


    const fetchUserData = async () => {
         const role = auth?.role
        try {
            const token = auth?.token; 
            const response = await axios.get("http://localhost:5000/Profile", {
                headers: { 
                    'Content-Type': 'application/JSON',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                withCredentials: true
        });
        const userData = response.data;
        setName(userData.name);
        setEmail(userData.email);
        setProvince(userData.province);
        setCity(userData.city);
        setNum(userData.num);
        setNum2(userData.num2);
        setKey(userData.key);
        setAddress(userData.address);
        
        
        if (userData.profilePicture) {

            //receive the encoded in base64 code from the backend
            const extractedPhoto = userData.profilePicture;
            setProfilePicture(extractedPhoto);
        } else {
            // Set default profile picture URL if wrong
            setProfilePicture('default-profile-picture.jpg');
        }
        

        setLoading(false);
        // role = response?.data?.role

        } catch (error) {
            console.log(error);
            navigate('/Login');
        }
    };


    useEffect(() => {
        fetchUserData();
    }, []);

    const handlesubmit = async (e) => {
        e.preventDefault();

        try {
            const token = auth?.token;
            const response = await axios.post("http://localhost:5000/user/profile/update", {
                name,
                email,
                province,
                city,
                num,
                num2,
                key,
                address,
                profilePicture
            }, {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                withCredentials: true
            });
            const unit_id = response.data.unit_id;
            setUnit({ num, unit_id });
            console.log("Response role:", response.data.role);
            const newAuth = {...auth, role: response.data.role};
            setAuth(newAuth);
            console.log(response.data);
            // auth?.role = response?.data?.role;
            console.log("Profile updated successfully");
            console.log(auth?.role);
            navigate('/Dashboard');
            
        }
        catch (error) {
            console.log(error);
            alert(error);
        }
    }


        const notification = async() => {
            try {
                const token = auth?.token;
                const response = await axios.get("http://localhost:5000/check-new-registration-key", {
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${token}`
                    },
                    withCredentials: true
                });
                const { new_registration_key } = response.data;
                if (new_registration_key) {
                    setNewRegistrationKey(new_registration_key);
                    setShowRegistrationPopup(true);
                }
            }
            catch (error) {
                console.log(error);
                alert(error);
            }
        }


    const handleClosePopup = () => {
        setShowRegistrationPopup(false);
      };


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
             {showRegistrationPopup && <RegistrationKeyMessage newRegistrationKey={newRegistrationKey} onClose={handleClosePopup} />}
            <form className="profileForm">
                <h1 className="membershipInfo">Membership Information</h1>
                <div className="profile-picture">
                    <img src={profilePicture} alt="Profile Picture" />
                    <input type="file" id="upload" accept="image/*" onChange={handleProfilePictureUpload} />
                    <label htmlFor="upload">Upload Profile Picture</label>
                </div>
                
                
                <div className='special-top-box-profile-page'>

                    <div className='special-box-profile-page'>
                        <div className="field-holder-profile">
                            <label className="profileLabels" htmlFor={name}> Name / Surname</label>
                            <input className="profileInput" value={name} onChange={(e) => setName(e.target.value)} type="text" />
                        </div>

                        <div className="field-holder-profile">
                            <label className="profileLabels" htmlFor={email}> E-mail</label>
                            <input className="profileInput" value={email} onChange={(e) => setEmail(e.target.value)} type="text" />
                        </div>
                    </div>
                    <div className="profile-picture">
                        <img src={profilePicture} alt="Profile Picture" />
                        <input type="file" id="upload" accept="image/*" onChange={handleProfilePictureUpload} />
                        <label htmlFor="upload">Upload Profile Picture</label>
                    </div>


                </div>
                
                <div className="box-profile-page">
                    <div className="field-holder2-profile">
                        <label className="province" htmlFor={province}>Province</label>
                        <select className="profileSelect" value={province} onChange={(e) => setProvince(e.target.value)}>
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
                        <select className="profileSelect" id={city} value={city} onChange={(e) => setCity(e.target.value)}>
                            <option></option>
                            <option>Montreal</option>

                        </select>
                    </div>
                </div>

                <div className="box-profile-page">
                    <div className="field-holder2-profile">
                        <label className="num" htmlFor={num}>Mobile Number</label>
                        <input className="horizontalInput" id={num} type="text" value={num} onChange={(e) => setNum(e.target.value)} />
                    </div>

                    <div className="field-holder2-profile">
                        <label className="num2" htmlFor={num2}>Mobile Number 2</label>
                        <input className="horizontalInput" id={num2} type="text" value={num2} onChange={(e) => setNum2(e.target.value)} />
                    </div>
                </div>


                <div className="field-holder-profile">
                    <label className="profileLabels" htmlFor={key}>Registration Key</label>
                    <input className="profileInput" id={key} type="text"  value={key} onChange={(e) => setKey(e.target.value)} />
                </div>

                <div className="field-holder-profile">
                    <label className="profileLabels" htmlFor={address}>Address</label>
                    <input id={address} className="addressInput" type="text"  value={address} onChange={(e) => setAddress(e.target.value)}  />
                </div>
                <div>
                {/*<input type='file' onChange={(e) => setSelectedFile(e.target.files[0])}/>*/}
                </div>

            </form>

            <div className="notification">
                <p className="notifText" >I want to be informed about all announcements and campaigns via commercial electronic mail</p>
                <div className="profileSwitch">
                    <CFormSwitch label="E-mail" className="formSwitchCheckDefault"/>
                    <CFormSwitch label="SMS" className="formSwitchCheckDefault"/>
                </div>
            </div>
            <div className="save">
                <button className="profileBtn" onClick={handlesubmit} >Save</button>
            </div>

        </div>


    );
};

export default Profile;
// Profile.js profile information page(form)

import React from 'react';
import { useId, useState, useEffect } from 'react';
import './Profile.css';
import { Link, useNavigate  } from 'react-router-dom';
import {CFormSwitch} from "@coreui/react";
import '@coreui/coreui/dist/css/coreui.min.css'
import axios from 'axios';
import { withRequiredAuthInfo } from "@propelauth/react";


function Profile({user}) {
    const navigate = useNavigate();
    const [response, setResponse] = useState("");
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
//    const token = localStorage.getItem('token');

    // useEffect(() => {

    //     function fetchUserData(accessToken) {
    //         return fetch("/Profile", {
    //             headers: {
    //                 "Content-Type": "application/json",
    //                 "Authorization": `Bearer ${accessToken}`
    //             }
    //         }).then(response => {
    //             if (response.ok) {
    //                 const userData = response.data;
    //                 // setName(userData.name);
    //                 // setEmail(userData.email);
    //                 // setProvince(userData.province);
    //                 // setCity(userData.city);
    //                 // setNum(userData.num);
    //                 // setNum2(userData.num2);
    //                 // setKey(userData.key);
    //                 // setAddress(userData.address);
    //                 // setSelectedFile(userData.selectedFile);
    //                 return userData.json()
    //             } else {
    //                 return {status: response.status}
    //             }
    //         })
    //     }
//    const fetchUserData = async () => {
//        try {
//            const response = await axios.get("http://localhost:5000/Profile", {
//                headers: {
//                    Authorization: 'Bearer ' + props.token
//                }
//            });
//            const userData = response.data;
//            userData.access_token && props.setToken(userData.access_token)
//            setName(userData.name);
//            setEmail(userData.email);
//            setProvince(userData.province);
//            setCity(userData.city);
//            setNum(userData.num);
//            setNum2(userData.num2);
//            setKey(userData.key);
//            setAddress(userData.address);
//            setSelectedFile(userData.selectedFile);
//            setLoading(false);
//
//        } catch(error) {
//            console.log(error);
//            navigate('/Login');
//        }
//    };
//    fetchUserData();
    // }, [accessToken]);

const handlesubmit = async (e) => {
e.preventDefault();

try {
    await axios.post("http://localhost:5000/user/profile/update", {
        name,
        email,
        province,
        city,
        num,
        num2,
        key,
        address,
        selectedFile
    },
//      headers: {
//        Authorization: 'Bearer ' + props.token
//      }
    );
    console.log("Profile updated successfully");
}
catch (error) {
    console.log(error);
}
}


    return (
        <div className="profilePage" >
            <form className="profileForm">
                <h1 className="membershipInfo">Membership Information</h1>

                <div className="field-holder-profile">
                    <label className="profileLabels" htmlFor={name}> Name / Surname</label>
                    <input className="profileInput" value={user.firstName + " " + user.lastName} onChange={(e) => setName(e.target.value)} type="text" />
                </div>

                <div className="field-holder-profile">
                    <label className="profileLabels" htmlFor={email}> E-mail</label>
                    <input className="profileInput" value={user.email} onChange={(e) => setEmail(e.target.value)} type="text" />
                </div>
                <div className="box-profile-page">
                    <div className="field-holder2-profile">
                        <label className="province" htmlFor={province}>Province</label>
                        {/* update user backend  */}
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
                <input type='file' onChange={(e) => setSelectedFile(e.target.files[0])}/>
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
                <button className="profileBtn" onClick={handlesubmit} >Save</button>
            </div>

        </div>


    );
};

export default withRequiredAuthInfo(Profile);

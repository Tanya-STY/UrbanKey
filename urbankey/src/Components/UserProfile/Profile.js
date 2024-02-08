// Profile.js profile information page(form)

import React from 'react';
import { useId, useState, useEffect } from 'react';
import './Profile.css';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useAuth } from '../../Provider/AuthProvider.js'

const Profile = () => {

    const { token } = useAuth();
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

//    console.log(token);

//    useEffect(() => {
        const fetchUserData = async () => {
            try {
                const response = await axios.get("http://localhost:5000/Profile", {
                    headers: {
                        Authorization: `${token}`
                    }
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
            setSelectedFile(userData.selectedFile);
            setLoading(false);

        } catch(error) {
            console.log(error);
            navigate('/Login');
            }
        };
        //console.log(token);
        if (token) {
            fetchUserData();

        } else {
            navigate('/Login');
            console.log('im being run');
        }
//    }, [token, navigate]);

//    if()



//const fetchUserData = async () => {
//    try {
//        const response = await axios.get("http://localhost:5000/Profile", {
//            headers: {
//          Authorization: `${token}`
//        }
//        });
//        const userData = response.data;
//        setName(userData.name);
//        setEmail(userData.email);
//        setProvince(userData.province);
//        setCity(userData.city);
//        setNum(userData.num);
//        setNum2(userData.num2);
//        setKey(userData.key);
//        setAddress(userData.address);
//        setSelectedFile(userData.selectedFile);
//    } catch (error) {
//        console.log(error);
//    }
//}

//useEffect(() => {
//    fetchUserData();
//}, []);

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
        }, {
          headers: {
          Authorization: `${token}`
        }
        });
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

                <div className="field-holder">
                    <label className="profileLabels" htmlFor="name"> Name/Surname</label>
                     <input className="profileInput" id="name" type="text" value={name} onChange={(e) => setName(e.target.value)} />
                </div>

                <div className="field-holder">
                    <label className="profileLabels" htmlFor="email"> E-mail</label>
                    <input className="profileInput" id="email" type="text" value={email} onChange={(e) => setEmail(e.target.value)} />
                </div>
                <div className="box">
                    <div className="field-holder2">
                        <label className="province" htmlFor="province">Province</label>
                        <select className="profileSelect" id="province" value={province} onChange={(e) => setProvince(e.target.value)}>
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

                    <div className="field-holder2">
                        <label className="city" htmlFor="city">City</label>
                        <select className="profileSelect" id="city" value={city} onChange={(e) => setCity(e.target.value)}>
                            <option></option>
                            <option>Montreal</option>

                        </select>
                    </div>
                </div>

                <div className="box2">
                    <div className="field-holder2">
                        <label className="num" htmlFor="num">Mobile Number</label>
                        <input className="horizontalInput" id="num" type="text" value={num} onChange={(e) => setNum(e.target.value)} />
                    </div>

                    <div className="field-holder2">
                        <label className="num2" htmlFor="num2">Mobile Number 2</label>
                        <input className="horizontalInput" id="num2" type="text" value={num2} onChange={(e) => setNum2(e.target.value)} />
                    </div>
                </div>


                <div className="field-holder">
                    <label className="profileLabels" htmlFor="key">Registration Key</label>
                    <input className="profileInput" id="key" type="text" value={key} onChange={(e) => setKey(e.target.value)} />
                </div>

                <div className="field-holder">
                    <label className="profileLabels" htmlFor="address">Address</label>
                    <input id="address" className="addressInput" type="text" value={address} onChange={(e) => setAddress(e.target.value)} />
                </div>

            </form>

            <div className="notification">
                <text className="notifText" >I want to be informed about all announcements and campaigns via commercial electronic mail</text>

            </div>
            <div className="save">
                <button className="profileBtn" onClick={handlesubmit}>Save</button>
            </div>

        </div>


    );
};

export default Profile;

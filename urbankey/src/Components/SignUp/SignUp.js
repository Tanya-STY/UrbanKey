import React, { useState } from 'react';
import './SignUp.css';
import { Link } from 'react-router-dom';
import urbankeyLogo from '../Images/urbankey_logo.png';
import { FaLocationDot, FaHouseCircleCheck, FaMedal, FaPenRuler } from "react-icons/fa6";
import axios from 'axios';
import {useNavigate} from "react-router-dom";
import { useAuth } from '../../Provider/AuthProvider';

const SignUp = () => {
    const { setToken, setTokenInStorage} = useAuth();
    const [activeButton, setActiveButton] = useState('Individual');
    const [fullName, setFullName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [passwordConfirm, setPasswordConfirm] = useState('');
    const [emailError, setEmailError] = useState('');
    const [passwordError, setPasswordError] = useState('');
    const [agreeTerms, setAgreeTerms] = useState(false);
    const [allowContact, setAllowContact] = useState(false);

    const navigate = useNavigate();

    const handleButtonClick = (membershipType) => {
        setActiveButton(membershipType);
    };

    const handleSubmit = async(e) => {
        const userInfo = {
            fullName: fullName,
            email: email,
            password: password,
        }
        e.preventDefault();
        setEmailError('');
        setPasswordError('');

        if (!validateEmail(email)) {
            setEmailError('Please enter a valid email address.');
            return;
        }

        if (password !== passwordConfirm) {
            setPasswordError('Passwords do not match.');
            return;
        }

        if (!agreeTerms) {
            alert('Please agree to the Membership Terms.');
            return;
        }
        
        fetch('http://127.0.0.1:5000/SignUp', {
            method: 'POST',
            headers: { 
                "content-Type" : "application/json",
             },
            body: JSON.stringify(userInfo)
        })
        .then(res => {
            if(!res.ok){
                throw Error('could not fetch data from url'); 
            }
            return res.json();
        })
        .then(response => {
            if ('taken' in response){
                console.log("email already taken"); 
                alert("email already taken, please try new email");
              }
              else if ('error' in response){
                console.log("email already taken"); 
                alert("error from backend. plase contact dev team");
              }
              else{
                const { recToken } = response.token;
                console.log(response + 'this is the response');
                console.log(recToken + 'this is the recToken');
                setToken(recToken);
                setTokenInStorage(recToken);
                navigate("/Login");
              }
            
        })
        .catch(err => {
            console.log(err);
            
        })

        // Handle form submission, e.g., send data to server
        console.log('Form submitted:', { fullName, email, password, passwordConfirm });
    };


    const validateEmail = (email) => {
        // Simple email validation using a regular expression
        // You can implement more complex validation if needed
        const re = /\S+@\S+\.\S+/;
        return re.test(email);
    };

    return (
        <div className="outer-container">
            <div className="container">
                <div className="left-div">
                    <div className="container-images-signup" style={{ justifyContent: 'center' }}>
                        <div className="row-signup"><img src={urbankeyLogo} alt="UrbanKey Logo" /></div>
                        <div className="row-signup">Why should I joing UrbanKey?</div>
                        <div className="row-signup" style={{ textAlign: 'center', width: '500px', color: 'darkgray' }}>To have the experience of "property", "information" and "trust" in the condo management world all together...</div>
                        <div className="row-signup">
                            <div className="column-signup" style={{ textAlign: 'center' }}>
                                <div className="column-signup-icons" style={{backgroundColor: '#ffd166'}}><FaLocationDot style={{height: '50px'}}/></div>
                                <div className="column-signup-icon">Learn about location.</div>
                            </div>
                            <div className="column-signup" style={{ textAlign: 'center' }}>
                                <div className="column-signup-icons" style={{backgroundColor: '#e85d04'}}><FaHouseCircleCheck style={{height: '50px'}}/></div>
                                <div className="column-signup-icon">Find out the value of your house free of charge.</div>
                            </div>
                        </div>
                        <div className="row-signup">
                            <div className="column-signup" style={{ textAlign: 'center', justifyContent: 'center', alignContent: 'center' }}>
                                <div className="column-signup-icons" style={{backgroundColor: '#7161ef'}}><FaMedal style={{height: '50px'}}/></div>
                                <div className="column-signup-icon">Discover houses that will improve your life quality.</div>
                            </div>
                            
                            <div className="column-signup" style={{ textAlign: 'center' }}>
                                <div className="column-signup-icons" style={{backgroundColor: '#00a6fb'}}><FaPenRuler style={{height: '50px'}}/></div>
                                <div className="column-signup-icon">Be aware of new projects.</div>
                            </div>
                        </div>
                        </div>
                    </div>

                <div className="right-div">
                    <div className="membership-buttons">
                        <button className={activeButton === 'Individual' ? 'active' : ''} onClick={() => handleButtonClick('Individual')}>Individual Membership</button>
                        <button className={activeButton === 'Corporate' ? 'active' : ''} onClick={() => handleButtonClick('Corporate')}>Corporate Membership</button>
                    </div>

                    <div className="underline-wrapper">
                        <div className="membership-buttons-underline" style={{ backgroundColor: activeButton === 'Individual' ? 'blue' : 'lightgrey' }}></div>
                        <div className="membership-buttons-underline" style={{ backgroundColor: activeButton === 'Corporate' ? 'blue' : 'lightgrey' }}></div>
                    </div>


                    <button className="google-button">GOOGLE</button>

                    <div className="line-container">
                        <div className="line"></div>
                        <div className="or">or</div>
                        <div className="line"></div>
                    </div>
                    {activeButton === 'Individual' && (
                        <form onSubmit={handleSubmit} className="membership-form">
                            <div className='user-input-signup'>
                            <div className="user-form-input">
                                <label htmlFor="fullName"></label>
                                <input
                                    className="user-input"
                                    type="text"
                                    id="fullName"
                                    value={fullName}
                                    onChange={(e) => setFullName(e.target.value)}
                                    placeholder='Full name'
                                    required
                                />
                            </div>
                            <div className="user-form-input">
                                <label htmlFor="email"></label>
                                <input
                                    className="user-input"
                                    type="email"
                                    id="email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    placeholder='Email'
                                    required
                                />
                                {emailError && <div className="error">{emailError}</div>}
                            </div>
                            <div className="user-form-input">
                                <label htmlFor="password"></label>
                                <input
                                    className="user-input"
                                    type="password"
                                    id="password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    placeholder='Password'
                                    required
                                />
                            </div>
                            <div className="user-form-input">
                                <label htmlFor="passwordConfirm"></label>
                                <input
                                    className="user-input"
                                    type="password"
                                    id="passwordConfirm"
                                    value={passwordConfirm}
                                    onChange={(e) => setPasswordConfirm(e.target.value)}
                                    placeholder='Retype password'
                                    required
                                />
                                {passwordError && <div className="error">{passwordError}</div>}
                            </div>

                            </div>
                            <div className="user-form-input">
                                <label>
                                    <input
                                        type="checkbox"
                                        checked={agreeTerms}
                                        onChange={(e) => setAgreeTerms(e.target.checked)}
                                    />
                                    <span style={{ color: 'blue', cursor: 'pointer' }} onClick={() => setAgreeTerms(!agreeTerms)}>
                                        I agree to the Membership Terms
                                    </span>
                                </label>
                            </div>
                            <div className="user-form-input">
                                <label>
                                    <input
                                        type="checkbox"
                                        checked={allowContact}
                                        onChange={(e) => setAllowContact(e.target.checked)}
                                    />
                                    <span onClick={() => setAllowContact(!allowContact)}>
                                        I allow UrbanKey to contact me for marketing and promotional purposes.
                                    </span>
                                </label>
                                <button type="submit" className='SignUp-button'>Sign Up</button>

                            </div>

                        </form>
                    )}

                    {activeButton === 'Corporate' && (
                        <form onSubmit={handleSubmit} className="membership-form">
                        <div className='user-input-signup'>
                        <div className="user-form-input">
                            <label htmlFor="fullName"></label>
                            <input
                                className="user-input"
                                type="text"
                                id="fullName"
                                value={fullName}
                                onChange={(e) => setFullName(e.target.value)}
                                placeholder='Full name'
                                required
                            />
                        </div>
                        <div className="user-form-input">
                            <label htmlFor="email"></label>
                            <input
                                className="user-input"
                                type="email"
                                id="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                placeholder='Email'
                                required
                            />
                            {emailError && <div className="error">{emailError}</div>}
                        </div>
                        <div className="user-form-input">
                            <label htmlFor="password"></label>
                            <input
                                className="user-input"
                                type="password"
                                id="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                placeholder='Password'
                                required
                            />
                        </div>
                        <div className="user-form-input">
                            <label htmlFor="passwordConfirm"></label>
                            <input
                                className="user-input"
                                type="password"
                                id="passwordConfirm"
                                value={passwordConfirm}
                                onChange={(e) => setPasswordConfirm(e.target.value)}
                                placeholder='Retype password'
                                required
                            />
                            {passwordError && <div className="error">{passwordError}</div>}
                        </div>

                        </div>
                        <div className="user-form-input">
                            <label>
                                <input
                                    type="checkbox"
                                    checked={agreeTerms}
                                    onChange={(e) => setAgreeTerms(e.target.checked)}
                                />
                                <span style={{ color: 'blue', cursor: 'pointer' }} onClick={() => setAgreeTerms(!agreeTerms)}>
                                    I agree to the Membership Terms
                                </span>
                            </label>
                        </div>
                        <div className="user-form-input">
                            <label>
                                <input
                                    type="checkbox"
                                    checked={allowContact}
                                    onChange={(e) => setAllowContact(e.target.checked)}
                                />
                                <span onClick={() => setAllowContact(!allowContact)}>
                                    I allow UrbanKey to contact me for marketing and promotional purposes.
                                </span>
                            </label>
                            <button type="submit" className='SignUp-button'>Sign Up</button>

                        </div>
                    </form>
                    )}
                    <div className="login-link">
                        Already a member? <Link to="/Login">Login Now!</Link>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SignUp;

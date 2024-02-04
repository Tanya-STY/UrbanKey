import React, { useState } from 'react';
import './SignUp.css';

const SignUp = () => {
    const [activeButton, setActiveButton] = useState('Individual');
    const [fullName, setFullName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [passwordConfirm, setPasswordConfirm] = useState('');
    const [emailError, setEmailError] = useState('');
    const [passwordError, setPasswordError] = useState('');
    const [agreeTerms, setAgreeTerms] = useState(false);
    const [allowContact, setAllowContact] = useState(false);

    const handleButtonClick = (membershipType) => {
        setActiveButton(membershipType);
    };

    const handleSubmit = (e) => {
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
                    Left Div Content
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
                            <div className="form-group">
                                <label htmlFor="fullName"></label>
                                <input
                                    type="text"
                                    id="fullName"
                                    value={fullName}
                                    onChange={(e) => setFullName(e.target.value)}
                                    placeholder='Full name'
                                    required
                                />
                            </div>
                            <div className="form-group">
                                <label htmlFor="email"></label>
                                <input
                                    type="email"
                                    id="email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    placeholder='Email'
                                    required
                                />
                                {emailError && <div className="error">{emailError}</div>}
                            </div>
                            <div className="form-group">
                                <label htmlFor="password"></label>
                                <input
                                    type="password"
                                    id="password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    placeholder='Password'
                                    required
                                />
                            </div>
                            <div className="form-group">
                                <label htmlFor="passwordConfirm"></label>
                                <input
                                    type="password"
                                    id="passwordConfirm"
                                    value={passwordConfirm}
                                    onChange={(e) => setPasswordConfirm(e.target.value)}
                                    placeholder='Retype password'
                                    required
                                />
                                {passwordError && <div className="error">{passwordError}</div>}
                            </div>
                            <div className="form-group">
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
                            <div className="form-group">
                                <label>
                                    <input
                                        type="checkbox"
                                        checked={allowContact}
                                        onChange={(e) => setAllowContact(e.target.checked)}
                                    />
                                    <span onClick={() => setAllowContact(!allowContact)}>
                                        I allow UrbanKey to contact me via e-mail, SMS, etc for marketing and promotional purposes.
                                    </span>
                                </label>
                            </div>
                            <button type="submit" className='SignUp-button'>Sign Up</button>
                        </form>
                    )}

                    {activeButton === 'Corporate' && (
                        <form onSubmit={handleSubmit} className="membership-form">
                            <div className="form-group">
                                <label htmlFor="fullName"></label>
                                <input
                                    type="text"
                                    id="fullName"
                                    value={fullName}
                                    onChange={(e) => setFullName(e.target.value)}
                                    placeholder='Full name'
                                    required
                                />
                            </div>
                            <div className="form-group">
                                <label htmlFor="email"></label>
                                <input
                                    type="email"
                                    id="email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    placeholder='Email'
                                    required
                                />
                                {emailError && <div className="error">{emailError}</div>}
                            </div>
                            <div className="form-group">
                                <label htmlFor="password"></label>
                                <input
                                    type="password"
                                    id="password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    placeholder='Password'
                                    required
                                />
                            </div>
                            <div className="form-group">
                                <label htmlFor="passwordConfirm"></label>
                                <input
                                    type="password"
                                    id="passwordConfirm"
                                    value={passwordConfirm}
                                    onChange={(e) => setPasswordConfirm(e.target.value)}
                                    placeholder='Retype password'
                                    required
                                />
                                {passwordError && <div className="error">{passwordError}</div>}
                            </div>
                            <div className="form-group">
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
                            <div className="form-group">
                                <label>
                                    <input
                                        type="checkbox"
                                        checked={allowContact}
                                        onChange={(e) => setAllowContact(e.target.checked)}
                                    />
                                    <span onClick={() => setAllowContact(!allowContact)}>
                                        I allow UrbanKey to contact me via e-mail, SMS, etc for marketing and promotional purposes.
                                    </span>
                                </label>
                            </div>
                            <button type="submit" className='SignUp-button'>Sign Up</button>
                        </form>
                    )}
                    <div className="login-link">
                        Already a member? <a href="#">Login</a>  now!
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SignUp;

// Profile.js profile information page(form)

import React from 'react';
import { useId } from 'react';
import './Profile.css';

const Profile = () => {

    const name = useId();
    const email = useId();
    const province = useId();
    const city = useId();
    const num = useId();
    const num2 = useId();
    const key = useId();
    const address = useId();



    return (
        <div className="profilePage" >
            <form>
                <h1>Membership Information</h1>

                <div className="field-holder">
                    <label htmlFor={name}> Name/Surname</label>
                    <input id={name} type="text" />
                </div>

                <div className="field-holder">
                    <label htmlFor={email}> E-mail</label>
                    <input id={email} type="text" />
                </div>
                <div className="box">
                    <div className="field-holder2">
                        <label className="province" htmlFor={province}>Province</label>
                        <select id={province}>
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
                        <label className="city" htmlFor={city}>City</label>
                        <select id={city}>
                            <option></option>
                            <option>Montreal</option>

                        </select>
                    </div>
                </div>

                <div className="box2">
                    <div className="field-holder2">
                        <label className="num" htmlFor={num}>Mobile Number</label>
                        <input className="horizontalInput" id={num} type="text" />
                    </div>

                    <div className="field-holder2">
                        <label className="num2" htmlFor={num2}>Mobile Number 2</label>
                        <input className="horizontalInput" id={num2} type="text" />
                    </div>
                </div>


                <div className="field-holder">
                    <label htmlFor={key}>Registration Key</label>
                    <input id={key} type="text" />
                </div>

                <div className="field-holder">
                    <label htmlFor={address}>Address</label>
                    <input id={address} className="addressInput" type="text" />
                </div>

            </form>

            <div className="notification">
                <text>I want to be informed about all announcements and campaigns via commercial electronic mail</text>

            </div>
            <div className="save">
                <button>Save</button>
            </div>

        </div>


    );
};

export default Profile;

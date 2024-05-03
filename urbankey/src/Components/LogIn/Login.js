import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import axios from 'axios';
import useAuth from '../../CustomeHooks/useAuth';
import './Login.css'; 
import condoimage from '../Images/Condo.jpg';

const Login = () => {
    const { setAuth, persist, setPersist } = useAuth();
    const navigate = useNavigate();
    const location = useLocation();
    const from = location.state?.from?.pathname || "/Profile";
  
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
 
    const handleLogin = async () => {
        try {
            const response = await axios.post("http://localhost:5000/Login", {
                email: email,
                password: password,
            }, {
                headers: { 'Content-Type': 'application/json' },
                withCredentials: true
            });
            const { token, role } = response.data;
            setAuth({ role, email, token });
            setEmail('');
            setPassword('');
            navigate(from, { replace: true });
        } catch (error) {
            console.error(error);
            alert(error.response?.status === 401 ? "Invalid credentials" : "User not found with this email");
        }
    };

    const togglePersist = () => {
        setPersist(prev => !prev);
    };

    useEffect(() => {
        localStorage.setItem("persist", persist);
    }, [persist]);

    return (
        <div className="body-attributes">
            <div className="login-container">
                <div className="image-container">
                    <img src={condoimage} alt="Condo" />
                </div>
                <div className="login-section-container">
                    <h2 className="h2-Login">Login</h2>
                    <div className="form-group-inputs">
                        <label>Email:</label>
                        <input className="input-email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Enter your email" />
                    </div>
                    <div className="form-group-inputs">
                        <label>Password:</label>
                        <input className="input-password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Enter your password" />
                    </div>
                    <button className="login-btn" onClick={handleLogin}>LOGIN</button>
                    <div>
                        <input type="checkbox" id="persist" onChange={togglePersist} checked={persist} />
                        <label htmlFor="persist">Trust This Device</label>
                    </div>
                    <div className="signup-link">
                        Still not a member? <Link to="/SignUp">Sign Up Now!</Link>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Login;

import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import './Login.css';

function Login() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const handleUsernameChange = (e) => {
        setUsername(e.target.value);
    };

    const handlePasswordChange = (e) => {
        setPassword(e.target.value);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
     
        localStorage.setItem('user', username);
        
        navigate('/home'); 
    };

return (
    <div className="login-box">
    <div className="type-in-form">
        <h2 className="login-letters">Sign In</h2>

        <div className="login-input-box">
            <input className="login-input-field" type="text" required="required"/>
            <span className="login-span">Username</span>
            <i></i>
        </div>

        <div className="login-input-box">
            <input className="login-input-field" type="password" required="required"/>
            <span className="login-span">Password</span>
            <i></i>
        </div>
        
        <div className="login-links">
        <Link to="/forgotpassword">Forgot Password?</Link>
            <Link to="/register">Don't have an account? Sign Up</Link>
        </div>
        <input className="login-submit" type="submit" value="login" />
    </div>
    </div>
        );
    }
    
    export default Login;
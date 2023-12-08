import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Register.css';
import '../Login/Login.css';

function ForgotPassword() {
    const [username, setUsername] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [resetStatus, setResetStatus] = useState('');
    const navigate = useNavigate();

    const handleResetPassword = () => {
        
        const storedUsername = localStorage.getItem('username');
        if (storedUsername === username) {
           
            localStorage.setItem('password', newPassword);
            setResetStatus('Passwort erfolgreich zurückgesetzt.');
            setTimeout(() => navigate('/login'), 2000);
        } else {
            setResetStatus('Benutzername nicht gefunden.');
        }
    };

    return (
        <div className="login-box">
        <div className="type-in-form">
            <h2 className="login-letters">Renew Password</h2>
        <div className="login-input-box">
        <input className="login-input-field"
            type="text" 
           required="required"
            value={username} 
            onChange={(e) => setUsername(e.target.value)} />
          <span className="login-span">Username</span>
        <i></i>
        </div>
        <div className="login-input-box">
        <input className="login-input-field"
            type="password" 
           required="required"
           value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}  />
          <span className="login-span">New Password</span>
        <i></i>
        </div>
        <div>
           
            <button className="login-submit" onClick={handleResetPassword}>Passwort zurücksetzen</button>
            <p>{resetStatus}</p>
        </div>
        </div>
        </div>
    );
}

export default ForgotPassword;
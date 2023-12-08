import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Register.css';
import '../Login/Login.css';

function Register() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const handleRegister = () => {
       
        localStorage.setItem('username', username);
        localStorage.setItem('password', password); 

       
        navigate('/home');
    }

    return (
        <div className="login-box">
        <div className="type-in-form">
            <h2 className="login-letters">Register</h2>
            
            
      
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
            <input className="login-input-field" type="password" required="required"
            value={password} 
            onChange={(e) => setPassword(e.target.value)}/>
            <span className="login-span">Password</span>
            <i></i>
        </div>
          
            <button className="login-submit" onClick={handleRegister}>Registrieren</button>
        </div>
        
        </div>
        
    );
}

export default Register;

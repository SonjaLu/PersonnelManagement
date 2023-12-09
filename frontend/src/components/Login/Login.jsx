import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import './Login.css';

// function Login() {
//     const [username, setUsername] = useState('');
//     const [password, setPassword] = useState('');
//     const navigate = useNavigate();

//     const users = JSON.parse(localStorage.getItem('users')) || {};

//     if (users[username] && users[username] === password) {
//         localStorage.setItem('user', username);
//         navigate('/selectstaff');
//     } else {
//         alert('Ungültiger Benutzername oder Passwort');
//     }
// }

//     const handleUsernameChange = (e) => {
//         setUsername(e.target.value);
//     };

//     const handlePasswordChange = (e) => {
//         setPassword(e.target.value);
//     };

//     const handleSubmit = (e) => {
//         e.preventDefault();

//         if (users[username] && users[username] === password) {
//             localStorage.setItem('user', username);
//             navigate('/selectstaff'); 
//         } else {
//             alert('Ungültiger Benutzername oder Passwort');
//         }
//     };
     
   

// return (
//     <div className="login-box">
//     <form className="type-in-form"  onSubmit={handleSubmit}>
//         <h2 className="login-letters">Sign In</h2>

    
//         <div className="login-input-box">
//                     <input 
//                       className="login-input-field" 
//                       type="text" 
//                       required="required"
//                       value={username}
//                       onChange={handleUsernameChange}
//                     />
//                     <span className="login-span">Username</span>
//                     <i></i>
//                 </div>

//                 <div className="login-input-box">
//                     <input 
//                       className="login-input-field" 
//                       type="password" 
//                       required="required"
//                       value={password}
//                       onChange={handlePasswordChange}
//                     />
//                     <span className="login-span">Password</span>
//                     <i></i>
//                 </div>
                
//                 <div className="login-links">
//                     <Link to="/forgotpassword">Forgot Password?</Link>
//                     <Link to="/register">Don't have an account? Sign Up</Link>
//                 </div>
//                 <input className="login-submit" type="submit" value="login" />
//             </form>
//         </div>
//     );
// }
    
//     export default Login;

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

        
        const users = JSON.parse(localStorage.getItem('users')) || {};

        if (users[username] && users[username] === password) {
            localStorage.setItem('user', username);
            navigate('/selectstaff');
        } else {
            alert('Ungültiger Benutzername oder Passwort');
        }
    };

    return (
        <div className="login-box">
            <form className="type-in-form" onSubmit={handleSubmit}>
                <h2 className="login-letters">Sign In</h2>
                <div className="login-input-box">
                    <input 
                      className="login-input-field" 
                      type="text" 
                      required="required"
                      value={username}
                      onChange={handleUsernameChange}
                    />
                    <span className="login-span">Username</span>
                    <i></i>
                </div>
                <div className="login-input-box">
                    <input 
                      className="login-input-field" 
                      type="password" 
                      required="required"
                      value={password}
                      onChange={handlePasswordChange}
                    />
                    <span className="login-span">Password</span>
                    <i></i>
                </div>
                <div className="login-links">
                    <Link to="/forgotpassword">Forgot Password?</Link>
                    <Link to="/register">Don't have an account? Sign Up</Link>
                </div>
                <input className="login-submit" type="submit" value="login" />
            </form>
        </div>
    );
}

export default Login;

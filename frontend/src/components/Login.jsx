

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
            <a href="#">Forgot Password?</a>
            <a href="#">Don't have an account? Sign Up</a>
        </div>
        <input className="login-submit" type="submit" value="login" />
    </div>
    </div>
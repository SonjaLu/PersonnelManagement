import { useState, useEffect } from 'react';
import './App.css';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link,
  useLocation
} from 'react-router-dom';
import Home from './components/Home/Home.jsx';
import Login from './components/Login/Login.jsx';
import Register from './components/Register/Register.jsx';
import ForgotPassword from './components/Register/ForgotPassword.jsx';
import QuoteComponent from './components/Motivation/Motivation.jsx';
import StaffSelector from './components/Staff/SelectStaff.jsx';
import WorkflowStaff from './components/Staff/WorkflowStaff.jsx';

function Navigation() {
    const location = useLocation();
    const [isHome, setIsHome] = useState(false);

    useEffect(() => {
        setIsHome(location.pathname === '/');
    }, [location]);

    return (
        <div className={isHome ? 'hide-links' : ''}>
            <nav>
                <Link to="/">Home</Link> | 
                <Link to="/login">Login</Link> 
            </nav>
        </div>
    );
}

function App() {
    return (
        <Router>
            <Navigation />
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/register" element={<Register />} />
                <Route path="/login" element={<Login />} />
                <Route path="/forgotpassword" element={<ForgotPassword />} />
                <Route path="/quotes" element={<QuoteComponent />} />
                <Route path="/selectstaff" element={<StaffSelector />} />
                <Route path="/workflowstaff/:staffName" element={<WorkflowStaff />} />
            </Routes>
        </Router>
    );
}

export default App;

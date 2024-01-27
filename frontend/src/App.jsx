import { useState, useEffect } from 'react';
import './App.css';
import {
  BrowserRouter as Router,
  Routes,
  Route,

  useLocation
} from 'react-router-dom';
import Home from './components/Home/Home.jsx';
import Login from './components/Login/Login.jsx';
import Register from './components/Register/Register.jsx';
import ForgotPassword from './components/Register/ForgotPassword.jsx';
import QuoteComponent from './components/Motivation/Motivation.jsx';
import StaffSelector from './components/Staff/StaffSelector.jsx';
import WorkflowStaff from './components/Staff/WorkflowStaff.jsx';
import { StaffProvider } from './components/Staff/StaffProvider.jsx';
import FullYearCalendar from './components/Calendar/Calendar.jsx';
import ParentComponent from './components/Staff/ParentComponent.jsx';
// import './App.scss';

function Navigation() {
    const location = useLocation();
    const [isHome, setIsHome] = useState(false);

    useEffect(() => {
        setIsHome(location.pathname === '/');
    }, [location]);

    return (
        <div>
            <nav>
               
            </nav>
        </div>
    );
}

function App() {
   
    return (
        <StaffProvider>
            
        <Router>
            <Navigation />
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/register" element={<Register />} />
                <Route path="/login" element={<Login />} />
                <Route path="/forgotpassword" element={<ForgotPassword />} />
                <Route path="/quotes" element={<QuoteComponent />} />
                <Route path="/staffselector" element={<StaffSelector />} />
                <Route path="/workflowstaff/:staffName" element={<WorkflowStaff />} />
    <Route path="/calendar" element={<FullYearCalendar />} />
     <Route path="/details/:staffName/:type" element={<ParentComponent />} />
            </Routes>
        </Router>
        </StaffProvider>
    );
}

export default App;

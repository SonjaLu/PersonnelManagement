import { useState } from 'react'
import './App.css'
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link
} from 'react-router-dom';
import Home from './components/Home/Home.jsx';
import Login from  './components/Login/Login.jsx';


function App() {
  const [count, setCount] = useState(0)

  return (
      <Router>
        <nav>
          <Link to="/">Home</Link> | 
          
          <Link to="/login">Login</Link> 
        </nav>
        <Routes>
          <Route path="/" element={<Home />} />
         
          <Route path="/login" element={<Login />} />
        </Routes>
      </Router>
    );
  }
  

  


export default App

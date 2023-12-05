import { useState } from 'react'
import './App.css'
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link
} from 'react-router-dom';

function App() {
  const [count, setCount] = useState(0)

  return (
      <Router>
        <nav>
          <Link to="/">Home</Link> | 
          <Link to="/about">About</Link>
        </nav>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
        </Routes>
      </Router>
    );
  }
  
  function Home() {
    return <h2>Home Page</h2>;
  }
  
  function About() {
    return <h2>About Page</h2>;
  }

export default App
import React, { useEffect } from "react";
import './Home.css';
import treasureCestGif from '../../assets/treasurecestan.gif';
import { useNavigate } from 'react-router-dom';



function Home() {
    const navigate = useNavigate(); 

    useEffect(() => {
        const timer = setTimeout(() => {
            navigate('/login');
        }, 7000); 
    
        return () => clearTimeout(timer); 
    }, [navigate]);
    return (
        <div className="home-box" style={{ position: 'relative' }}>
        <svg width="600" height="300" style={{ position: 'absolute', top: 110}}>
            <path id="bogenPfad" d="M100,210 A180,90 0 0,1 500,150" fill="transparent" />
            <text fontSize="100" fill="white"  className="bogenText" style={{ letterSpacing: '0.1em' }}>
                <textPath xlinkHref="#bogenPfad" startOffset="5%">
                    SARAH'S
                </textPath>
  </text>
</svg>
           
            <div>
                <img src={treasureCestGif} alt="treasure cest" /> 
            </div>
            <h1 className="home-letters-bottom">SCHÄTZE</h1>
        </div>
    );
}

export default Home;

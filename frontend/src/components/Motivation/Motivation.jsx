import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import './Motivation.css';

function QuoteComponent() {
  const [quote, setQuote] = useState('');

  useEffect(() => {
    const quoteId = Math.floor(Math.random() * 100) + 1;
    const options = {
      method: 'GET',
      url:  `https://motivational-content.p.rapidapi.com/quotes/${quoteId}`,
      headers: {
        'X-RapidAPI-Key': '3d1df4161emsh158f29c3a2c5a93p1f6af9jsn30b853d096ef', 
        'X-RapidAPI-Host': 'motivational-content.p.rapidapi.com'
      }
    };

    async function fetchQuote() {
      try {
        const response = await axios.request(options);
        setQuote(response.data.quote);
      } catch (error) {
        console.error("Fehler bei der API-Anfrage: ", error);
      }
    }

    fetchQuote();
  }, []);

  return (
    <div className="card">
        <div className="face1">
          <h3>Du schaffst das</h3> 
          </div>
        
          <div className="face2">
            <div className="content"> 
            <p>
      {quote ? quote : "Lädt.." } </p>
      <Link className="linkstyle" to="/login">Los geht's</Link></div>
    </div>
    </div>
  );
}

export default QuoteComponent;


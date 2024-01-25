

import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import './SickDays.css';
import { useStaff } from './StaffProvider.jsx';

function SickDays({ onOpenCalendar, staffname }) {
  const { staffName } = useParams();
  const navigate = useNavigate();
  const { staffList, setStaffList } = useStaff();
  const [sickDays, setSickDays] = useState('');

  useEffect(() => {
    const staff = staffList.find(staff => staff.name === staffName);
    if (staff) {
      setSickDays(staff.sickDays);
    }
  }, [staffName, staffList]);

  const handleSickDaysChange = (event) => {
    setSickDays(event.target.value);
  };

  const handleSave = () => {
    const updatedList = staffList.map(staff => 
      staff.name === staffName ? { ...staff, sickDays: sickDays } : staff
    );
    setStaffList(updatedList);
    navigate('/staffselector'); 
  };

  return (
    <>
    <div className="sickdays-wrapper">
    <h2 className="sickdays-headline">Krankheitstage<br></br> für {staffName}</h2>
    
    <div className="sickdays-container"> 
    
      
      <input className="sickdays-input"
        type="number"
        value={sickDays}
        onChange={handleSickDaysChange}
      />
      <button className="save-button" onClick={handleSave}>Speichern</button>
    </div>
    <div className="loop-wrapper">
    <div className="mountain"></div>
    <div className="hill"></div>
    <div className="tree"></div>
    <div className="tree"></div>
    <div className="tree"></div>
    <div className="rock"></div>
    <div className="truck-wrapper">
    <div className="truck"></div>
    <div className="wheels"></div>
    <div className="red-cross"></div>
    
    </div>
  </div>
  </div> 
  <div id="calender-button-container">
 <button id="calender-button" onClick={onOpenCalendar}>Kalender öffnen</button>
 </div>  
  </>
  );
}

export default SickDays;


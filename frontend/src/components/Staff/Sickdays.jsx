

import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import './SickDays.css';
import { useStaff } from './StaffProvider.jsx';

function SickDays() {
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
    navigate('/selectstaff'); 
  };

  return (
    <>
    <h2 className="sickdays-headline">Krankheitstage<br></br> für {staffName}</h2>
    <div className="sickdays-wrapper">
       
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
    <div class="truck-wrapper">
    <div class="truck"></div>
    <div className="wheels"></div>
    <div class="red-cross"></div>
    
    </div>
  </div>
  </div>  
  {/* <div>
       <button id="calender-button" onClick={handleOpenCalendar}>Kalender öffnen</button>
     </div> */}
  </>
  );
}

export default SickDays;


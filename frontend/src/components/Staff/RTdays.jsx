import React from 'react';
import { useParams } from 'react-router-dom';
import './RtDays.css';
import { StaffContext } from './StaffProvider.jsx';
import { useContext } from 'react';

function RtDays() {
    const { staffName } = useParams();
    const { staffList } = useContext(StaffContext);
  const getRtDaysData = () => {
    const staff = staffList.find(s => s.name === staffName);
    if (!staff) return { maxRtDays: 2, plannedRtDays: 0, takenRtDays: 0 };

    return {
      maxRtDays: 2, 
      plannedRtDays: staff.plannedRtDays,
      takenRtDays: staff.takenRtDays
    };
  };

  const rtDaysData = getRtDaysData();

  return (
  <div className="wrapdiv">
    <div className="rtdiv">
      <h2 className="rth2">RT-Tage für {staffName}</h2><br></br>
      <p>Maximale RT-Tage: {rtDaysData.maxRtDays} Tage</p>
      <p>Geplante RT-Tage: {rtDaysData.plannedRtDays} Tage</p>
      <p>Genommene RT-Tage: {rtDaysData.takenRtDays} Tage</p>
    </div>
<div className="jumpbox">
  <ul>
    <li>
    </li>
    <li>
  
    </li>
    <li>
    </li>
    <li></li>
    <li></li>
  </ul>
</div>
<div>
       <button id="calender-button" onClick={handleOpenCalendar}>Kalender öffnen</button>
     </div>
    </div>


  );
}

export default RtDays;

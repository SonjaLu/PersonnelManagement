import { useContext } from 'react';
import './Vacation.css';
import { StaffContext } from './StaffProvider.jsx';
import wavesGif from '../../assets/waves.gif';

function Vacation({ onOpenCalendar, staffName}) {
   
    const { staffList } = useContext(StaffContext);
   
  const getVacationData = () => {
    const staff = staffList.find(s => s.name === staffName);
    if (!staff) return { vacationEntitlement: 0, vacationTaken: 0, vacationPlanned: 0, remainingVacation: 0 };

    return {
      vacationEntitlement: staff.vacationEntitlement,
      vacationTaken: staff.vacationTaken,
      vacationPlanned: staff.vacationPlanned,
      remainingVacation: staff.vacationEntitlement - staff.vacationTaken - staff.vacationPlanned
    };
  };

  const vacationData = getVacationData();

  return (
   <div >
    
          <div >
     <img className="waves" src={wavesGif} alt="waves" /> 
 </div>
<div className="wrapper">
<h2 >Urlaub  {staffName}</h2>
<br></br>
      <p>Urlaubsanspruch: {vacationData.vacationEntitlement} Tage</p>
      <p>Genommener Urlaub: {vacationData.vacationTaken} Tage</p>
      <p>Geplanter Urlaub: {vacationData.vacationPlanned} Tage</p>
      <p>Resturlaub: {vacationData.remainingVacation} Tage</p>
      </div>
     
      <div id="calender-button-container">
       <button id="calender-button" onClick={onOpenCalendar}>Kalender öffnen</button>
     </div>
    </div>
    );
 };
  
    


export default Vacation;

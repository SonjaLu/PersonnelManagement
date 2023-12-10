import React from 'react';
import { useParams } from 'react-router-dom';
import './Sickdays.css';
import { StaffContext } from './StaffProvider.jsx';


function SickDays() {
    const { staffList } = useContext(StaffContext);
    const { staffName } = useParams();
  const getSickDaysData = () => {
    const staff = staffList.find(s => s.name === staffName);
    if (!staff) return { sickDays: 0 };

    return {
      sickDays: staff.sickDays
    };
  };

  const sickDaysData = getSickDaysData();

  return (
    <div>
      <h2>Krankheitstage für {staffName}</h2>
      <p>Krankheitstage: {sickDaysData.sickDays} Tage</p>

      {/* Kalenderkomponente hier einfügen */}
    </div>
  );
}

export default SickDays;

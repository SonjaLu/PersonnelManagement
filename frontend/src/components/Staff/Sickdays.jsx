

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
    <div className="sickdays-container">
      <h2>Krankheitstage für {staffName}</h2>
      <input
        type="number"
        value={sickDays}
        onChange={handleSickDaysChange}
      />
      <button className="save-button" onClick={handleSave}>Speichern</button>
    </div>
  );
}

export default SickDays;


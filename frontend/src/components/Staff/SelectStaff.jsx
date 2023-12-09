
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './SelectStaff.css';

function StaffSelector() {
  const [staffList, setStaffList] = useState(['Alice', 'Bob', 'Charlie']);
  const [selectedStaff, setSelectedStaff] = useState('');
  const [newStaffName, setNewStaffName] = useState('');
  const navigate = useNavigate();

  const handleSelectChange = (event) => {
    setSelectedStaff(event.target.value);
    if (event.target.value) {
      navigate(`/workflowstaff/${event.target.value}`);
    }
  };

  const handleAddStaff = () => {
    if (newStaffName && !staffList.includes(newStaffName)) {
      setStaffList([...staffList, newStaffName]);
      setNewStaffName('');
    }
  };

  const handleDeleteStaff = (nameToDelete) => {
    setStaffList(staffList.filter(name => name !== nameToDelete));
  };

  return (
    <div className="staffbox">
      <select className="dropdown" value={selectedStaff} onChange={handleSelectChange}>
        <option value="">Wähle einen Mitarbeiter</option>
        {staffList.map(name => (
          <option key={name} value={name}>{name}</option>
        ))}
      </select>
      <div>
        <input 
        className="staffinput"
          type="text" 
          value={newStaffName} 
          onChange={(e) => setNewStaffName(e.target.value)} 
          placeholder="Name hinzufügen" 
        />
        <button className="glow-on-hover" onClick={handleAddStaff}>Hinzufügen</button>
      </div>
      {/* <ul>
        {staffList.map(name => (
          <li key={name}>{name} <button onClick={() => handleDeleteStaff(name)}>Löschen</button></li>
        ))}
      </ul> */}
    </div>
  );
}

export default StaffSelector;


import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './SelectStaff.css';

function StaffSelector() {
  const [staffList, setStaffList] = useState([
    { name: 'Kunigunde', vacationEntitlement: 30, vacationTaken: 20, vacationPlanned: 23, sickDays: 2, rtDays: 2, plannedRtDays: 2, takenRtDays: 1 },
    { name: 'Hildegard', vacationEntitlement: 30, vacationTaken: 16, vacationPlanned: 20, sickDays: 20, rtDays: 2, plannedRtDays: 1, takenRtDays: 1 },
  ]);
    const [selectedStaff, setSelectedStaff] = useState('');
  const [newStaffName, setNewStaffName] = useState({
    name: '',
    vacationEntitlement: '',
    vacationTaken: '',
    vacationPlanned: '',
    sickDays: '',
    rtDays: '',
    plannedRtDays: '',
    takenRtDays: ''
  });

  const navigate = useNavigate();

  const handleNavigate = () => {
    navigate(`/workflowstaff/${selectedStaff}`);
  };

  const handleSelectChange = (event) => {
    setSelectedStaff(event.target.value);
  };

  const handleAddStaff = () => {
    const isNameExists = staffList.some(staff => staff.name === newStaffName.name);
    const isDataComplete = newStaffName.name && newStaffName.vacationEntitlement && newStaffName.vacationTaken && newStaffName.vacationPlanned && newStaffName.sickDays && newStaffName.rtDays && newStaffName.plannedRtDays && newStaffName.takenRtDays;
    
    if (!isNameExists && isDataComplete) {
      setStaffList([...staffList, newStaffName]);
      setNewStaffName({
        name: '',
        vacationEntitlement: '',
        vacationTaken: '',
        vacationPlanned: '',
        sickDays: '',
        rtDays: '',
        plannedRtDays: '',
        takenRtDays: ''
      });
    } else {
      
      console.log('Mitarbeitername existiert bereits oder Daten sind unvollständig');
    }
  };

  const handleDeleteStaff = () => {
    if (selectedStaff && window.confirm(`Möchten Sie wirklich ${selectedStaff} löschen?`)) {
      setStaffList(staffList.filter(staff => staff.name !== selectedStaff));
      setSelectedStaff('');
    }
  };

  return (
    <div className="staffbox">
    <select className="dropdown" value={selectedStaff} onChange={(e) => setSelectedStaff(e.target.value)}>
      <option value="">Wähle einen Mitarbeiter</option>
      {staffList.map(staff => (
        <option key={staff.name} value={staff.name}>{staff.name}</option>
      ))}
    </select>

    <button onClick={handleNavigate} disabled={!selectedStaff}>Weiter zu Mitarbeiter</button>
    <button onClick={handleDeleteStaff} disabled={!selectedStaff}>Mitarbeiter Löschen</button>
      <div>
  <input
    type="text"
    value={newStaffName.name}
    onChange={(e) => setNewStaffName({ ...newStaffName, name: e.target.value })}
    placeholder="Name hinzufügen"
  />
  <input
    type="number"
    value={newStaffName.vacationEntitlement}
    onChange={(e) => setNewStaffName({ ...newStaffName, vacationEntitlement: e.target.value })}
    placeholder="Urlaubsanspruch in Tagen"
  />
  <input
    type="number"
    value={newStaffName.vacationTaken}
    onChange={(e) => setNewStaffName({ ...newStaffName, vacationTaken: e.target.value })}
    placeholder="Genommener Urlaub in Tagen"
  />
  <input
    type="number"
    value={newStaffName.vacationPlanned}
    onChange={(e) => setNewStaffName({ ...newStaffName, vacationPlanned: e.target.value })}
    placeholder="Geplanter Urlaub in Tagen"
  />
  <input
    type="number"
    value={newStaffName.sickDays}
    onChange={(e) => setNewStaffName({ ...newStaffName, sickDays: e.target.value })}
    placeholder="Krankheitstage"
  />
  <input
    type="number"
    value={newStaffName.rtDays}
    onChange={(e) => setNewStaffName({ ...newStaffName, rtDays: e.target.value })}
    placeholder="RT-Tage insgesamt"
  />
  <input
    type="number"
    value={newStaffName.plannedRtDays}
    onChange={(e) => setNewStaffName({ ...newStaffName, plannedRtDays: e.target.value })}
    placeholder="Geplante RT-Tage"
  />
  <input
    type="number"
    value={newStaffName.takenRtDays}
    onChange={(e) => setNewStaffName({ ...newStaffName, takenRtDays: e.target.value })}
    placeholder="Genommene RT-Tage"
  />
  <button className="glow-on-hover" onClick={handleAddStaff}>Hinzufügen</button>
</div>
</div>
);
}
       

export default StaffSelector;

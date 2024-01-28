
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './StaffSelector.css';
import { useStaff } from './StaffProvider.jsx';
import UpdateStaff from './UpdateStaff.jsx';

function StaffSelector() {
  const { staffList, setStaffList } = useStaff();
  const [selectedStaff, setSelectedStaff] = useState('');
  const [isEditMode, setIsEditMode] = useState(false);
  const [showUpdatePopup, setShowUpdatePopup] = useState(false);
  const [newStaffName, setNewStaffName] = useState({
    name: '',
    vacationEntitlement: '',
    vacationTaken: '',
    vacationPlanned: '',
    sickDays: '',
    rtDays: '',
    plannedRtDays: '',
    takenRtDays: '',
    sickDaysDates: [],
    vacationDaysDates: [],
    rtDaysDates: []
  });

  const navigate = useNavigate();

  const handleNavigate = () => {
    navigate(`/workflowstaff/${selectedStaff}`);
  };

  const handleSelectChange = (event) => {
    setSelectedStaff(event.target.value);
    const selected = staffList.find(staff => staff.name === event.target.value);
    if (selected) {
      setNewStaffName(selected);
    }
  };

  const handleShowUpdatePopup = () => {
    if (selectedStaff) {
    setShowUpdatePopup(true);
  }};

  const handleUpdateSave = (updatedData) => {
    const updatedList = staffList.map(staff => 
      staff.name === selectedStaff ? updatedData : staff
    );
    setStaffList(updatedList);
    setShowUpdatePopup(false);
    
    setNewStaffName({
      name: '',
      vacationEntitlement: '',
      vacationTaken: '',
      vacationPlanned: '',
      sickDays: '',
      rtDays: '',
      plannedRtDays: '',
      takenRtDays: '',
      sickDaysDates: [],
    vacationDaysDates: [],
    rtDaysDates: []
    });
  };


  const handleAddStaff = () => {
    const isNameExists = staffList.some(staff => staff.name === newStaffName.name);
    const isDataComplete = newStaffName.name && newStaffName.vacationEntitlement && newStaffName.vacationTaken && newStaffName.vacationPlanned && newStaffName.sickDays && newStaffName.rtDays && newStaffName.plannedRtDays && newStaffName.takenRtDays;
    
    if (!isNameExists && isDataComplete) {
      setStaffList([...staffList, {
        ...newStaffName,
        sickDaysDates: [],
        vacationDaysDates: [],
        rtDaysDates: []
      }]);
      setNewStaffName({
        name: '',
        vacationEntitlement: '',
        vacationTaken: '',
        vacationPlanned: '',
        sickDays: '',
        rtDays: '',
        plannedRtDays: '',
        takenRtDays: '',
        sickDaysDates: [],
    vacationDaysDates: [],
    rtDaysDates: []
      });
    } else {
      
      console.log('Mitarbeitername existiert bereits oder Daten sind unvollständig');
    }
  };

  // const handleUpdateStaff = () => {
  //   const updatedList = staffList.map(staff => 
  //     staff.name === selectedStaff ? newStaffName : staff
  //   );
  //   setStaffList(updatedList);
  //   setSelectedStaff('');
  //   setNewStaffName({
  //     name: '',
  //     vacationEntitlement: '',
  //     vacationTaken: '',
  //     vacationPlanned: '',
  //     sickDays: '',
  //     rtDays: '',
  //     plannedRtDays: '',
  //     takenRtDays: '',
  //     sickDaysDates: [],
  //   vacationDaysDates: [],
  //   rtDaysDates: []
  //   });
  //   setIsEditMode(false);
  // };

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

    <button className="glow-on-hover" onClick={handleNavigate} disabled={!selectedStaff}>Weiter</button>
    
<button className="glow-on-hover" onClick={handleShowUpdatePopup} disabled={!selectedStaff}>
  Aktualisieren
</button>

{showUpdatePopup && (
   <div className={`popup-overlay ${showUpdatePopup ? 'active' : ''}`}>
  <UpdateStaff
    staff={staffList.find(staff => staff.name === selectedStaff)}
    onSave={handleUpdateSave}
    onCancel={() => setShowUpdatePopup(false)}
  />
   </div>
  )}

    <button className="glow-on-hover" onClick={handleDeleteStaff} disabled={!selectedStaff}>Löschen</button>
     
   

      <div className="staffdata">
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

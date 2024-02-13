import React, { useState, useEffect, createContext, useContext } from 'react';

export const StaffContext = createContext();

export const useStaff = () => useContext(StaffContext);

export const StaffProvider = ({ children }) => {
 
  const [staffList, setStaffList] = useState([]);
  const [availableVacationDays, setAvailableVacationDays] = useState(0);
  useEffect(() => {

    const savedStaffList = JSON.parse(localStorage.getItem('staffList')) || [];

   
    const initialStaffList = [
      { name: 'Kunigunde', vacationEntitlement: 30, vacationTaken: 20, vacationPlanned: 23, sickDays: 2, rtDays: 2, plannedRtDays: 2, takenRtDays: 1, sickDaysDates: [], vacationDaysDates: [], rtDaysDates: []},
      { name: 'Hildegard', vacationEntitlement: 30, vacationTaken: 16, vacationPlanned: 20, sickDays: 20, rtDays: 2, plannedRtDays: 1, takenRtDays: 1, sickDaysDates: [], vacationDaysDates: [], rtDaysDates: []},
    ];
    
    const combinedStaffList = [...new Set([...savedStaffList, ...initialStaffList].map(JSON.stringify))].map(JSON.parse);
    setStaffList(combinedStaffList);
  }, []);

  useEffect(() => {
   
    localStorage.setItem('staffList', JSON.stringify(staffList));
  }, [staffList]);


  const updateStaffAndCalendarData = (updatedStaff) => {
   
    const updatedStaffList = staffList.map(staff => {
      if (staff.name === updatedStaff.name) {
        const markedDates = [
          ...updatedStaff.sickDaysDates.map(date => ({ date, type: 'sick' })),
          ...updatedStaff.vacationDaysDates.map(date => ({ date, type: 'vacation' })),
          ...updatedStaff.rtDaysDates.map(date => ({ date, type: 'rt' })),
        ];
        let { vacationEntitlement, vacationTaken, vacationPlanned, sickDays, plannedRtDays, takenRtDays } = updatedStaff;
  
        markedDates.forEach(mark => {
          const markDate = new Date(mark.date);
          const today = new Date();
  
          if (mark.type === 'vacation') {
            if (markDate < today) {
              vacationTaken++;
            } else {
              vacationPlanned++;
            }
          } else if (mark.type === 'sick' && !staff.sickDaysDates.includes(mark.date)) {
            sickDays++;
          } else if (mark.type === 'rt') {
            if (markDate < today) {
              takenRtDays++;
            } else {
              plannedRtDays++;
            }
          }
        });
        return {
          ...staff,
          vacationEntitlement,
          vacationTaken,
          vacationPlanned,
          sickDays,
          plannedRtDays,
          takenRtDays,
          sickDaysDates: markedDates.filter(mark => mark.type === 'sick').map(mark => mark.date),
          vacationDaysDates: markedDates.filter(mark => mark.type === 'vacation').map(mark => mark.date),
          rtDaysDates: markedDates.filter(mark => mark.type === 'rt').map(mark => mark.date),
        };
      }
      return staff;
    });
  
    setStaffList(updatedStaffList);
    localStorage.setItem('staffList', JSON.stringify(updatedStaffList));
  

    const selectedStaff = updatedStaffList.find(staff => staff.name === updatedStaff.name);
    if (selectedStaff) {
      const availableDays = selectedStaff.vacationEntitlement - selectedStaff.vacationTaken - selectedStaff.vacationPlanned;
      setAvailableVacationDays(availableDays > 0 ? availableDays : 0);
    }
  };
  
  const calculateValidVacationDays = (staffName) => {
    const staff = staffList.find(s => s.name === staffName);
    if (staff) {
      return staff.vacationEntitlement - staff.vacationTaken - staff.vacationPlanned;
    }
    return 0; 
  };

  const onSaveUpdatedStaff = (updatedStaff) => { 
    updateStaffAndCalendarData(updatedStaff);
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
      rtDaysDates: [],
    });
  
  };

  return (
    <StaffContext.Provider value={{ staffList, setStaffList, onSaveUpdatedStaff, updateStaffAndCalendarData, calculateValidVacationDays,setAvailableVacationDays }}>
      {children}
    </StaffContext.Provider>
  );
};


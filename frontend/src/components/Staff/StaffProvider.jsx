import React, { useState, useEffect, createContext, useContext } from 'react';

export const StaffContext = createContext();

export const useStaff = () => useContext(StaffContext);

export const StaffProvider = ({ children }) => {
 
  const [staffList, setStaffList] = useState([]);

  useEffect(() => {

    const savedStaffList = JSON.parse(localStorage.getItem('staffList')) || [];

   
    const initialStaffList = [
      { name: 'Kunigunde', vacationEntitlement: 30, vacationTaken: 20, vacationPlanned: 23, sickDays: 2, rtDays: 2, plannedRtDays: 2, takenRtDays: 1 },
      { name: 'Hildegard', vacationEntitlement: 30, vacationTaken: 16, vacationPlanned: 20, sickDays: 20, rtDays: 2, plannedRtDays: 1, takenRtDays: 1 },
    ];
    
    const combinedStaffList = [...new Set([...savedStaffList, ...initialStaffList].map(JSON.stringify))].map(JSON.parse);
    setStaffList(combinedStaffList);
  }, []);

  useEffect(() => {
   
    localStorage.setItem('staffList', JSON.stringify(staffList));
  }, [staffList]);

  return (
    <StaffContext.Provider value={{ staffList, setStaffList }}>
      {children}
    </StaffContext.Provider>
  );
};


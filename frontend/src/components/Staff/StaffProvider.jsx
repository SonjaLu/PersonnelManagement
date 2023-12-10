import React, { useState, useEffect, createContext, useContext } from 'react';


export const StaffContext = createContext();

export const useStaff = () => useContext(StaffContext);

export const StaffProvider = ({ children }) => {
  const [staffList, setStaffList] = useState([]);

  useEffect(() => {
   
    const loadedStaff = [
      
    ];
    setStaffList(loadedStaff);
  }, []);

  return (
    <StaffContext.Provider value={{ staffList, setStaffList }}>
      {children}
    </StaffContext.Provider>
  );
};
